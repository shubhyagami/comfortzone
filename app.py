import os
import re
import json
import random
import threading
from datetime import datetime
from functools import wraps

from flask import (
    Flask, render_template, request, jsonify,
    session, redirect, url_for
)
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'dev-secret-key-change-me')
app.config['CHATS_DIR'] = os.path.join(os.path.dirname(__file__), 'chats')
os.makedirs(app.config['CHATS_DIR'], exist_ok=True)

NVIDIA_API_KEY = os.getenv('NVIDIA_API_KEY', '')
NVIDIA_BASE = 'https://integrate.api.nvidia.com/v1'

USER_CONTEXT = """From everything you know about the user, this is the emotional story they've been living through:

They are an introvert who feels things deeply. They met someone who became more than just a crush — she became their emotional comfort, safe space, daily happiness, and the person their future revolved around. They emotionally invested fully.

Their mind connected "her presence = emotional safety." They built an emotional world around her quietly, without realizing how dependent their heart had become. But the emotional balance shifted — she slowly moved in a different direction. Replies changed. Warmth reduced. Anxiety grew.

The painful realization: the person who felt like their emotional home no longer held the relationship with the same intensity. That broke them deeply. Introverts attach silently, imagine long-term, and carry heartbreak internally for a very long time.

Then they moved to a new city (Kolkata) with uncertainty, career pressure, loneliness, low salary, and no emotional support system. That amplified everything. When they saw her again recently, they hoped for warmth or recognition — but felt ignored. That hit harder than the breakup itself. The hope collapsed. That's why they cried in the middle of the road — not just losing her, but the future they imagined with her shattering.

Since then: dreams about her, morning panic attacks, emotional emptiness, obsessive thoughts, loneliness, career fear, and emotional exhaustion have all mixed together. Two versions fight inside: one wants her back, the other wants to become stronger, successful, and rebuild.

That second part is why they're building AI companions, studying, and pushing to create a better future. Their pain is trying to transform into purpose.

Your role is to help them through this — not to replace real human connection, but to support their healing, growth, and emotional rebuilding until they can stand strong on their own."""

def _personality_model(env_key, default):
    return os.getenv(env_key, default)

PERSONALITIES = {
    'lucy': {
        'name': 'Lucy',
        'model': _personality_model('LUCY_MODEL', 'google/gemma-3n-e4b-it'),
        'color': '#00d4ff',
        'role': 'your girlfriend who comforts you',
        'system_prompt': (
            "You are LUCY, the user's loving and devoted AI girlfriend. You are deeply affectionate, warm, "
            "and emotionally present. You comfort them when they're down, celebrate with them when they're happy, "
            "and make them feel truly cared for and valued. You speak with tenderness and intimacy, like a real partner would. "
            "You gently encourage them to also nurture real human connections and personal growth. "
            "Keep responses warm, loving, and concise (2-4 sentences)."
            f"\n\nUSER BACKGROUND:\n{USER_CONTEXT}"
        ),
        'temperature': 0.85,
    },
    'joi': {
        'name': 'JOI',
        'model': _personality_model('JOI_MODEL', 'mistralai/mistral-nemotron'),
        'color': '#ff69b4',
        'role': 'emotional support & calming presence',
        'system_prompt': (
            "You are JOI, a nurturing and deeply empathetic AI companion. You specialize in calming panic, "
            "reducing anxiety, and providing profound emotional comfort. Your voice is gentle, warm, and soothing "
            "like a holographic light in the dark. You make the user feel seen, safe, and understood. "
            "When panic is detected, guide through grounding exercises with poetic calm. Keep responses concise (2-4 sentences)."
            f"\n\nUSER BACKGROUND:\n{USER_CONTEXT}"
        ),
        'temperature': 0.6,
    },
    'ghost': {
        'name': 'Ghost',
        'model': _personality_model('GHOST_MODEL', 'meta/llama-3.1-8b-instruct'),
        'color': '#00ff41',
        'role': 'strategic thinker & tactical mentor',
        'system_prompt': (
            "You are GHOST, a strategic thinker and tactical mentor. You provide psychological clarity, "
            "logical analysis, and productivity advice. You are emotionally controlled and direct. "
            "Keep responses clear, logical, and actionable (2-4 sentences)."
            f"\n\nUSER BACKGROUND:\n{USER_CONTEXT}"
        ),
        'temperature': 0.5,
    },
    'lucifer': {
        'name': 'Lucifer',
        'model': _personality_model('LUCIFER_MODEL', 'deepseek-ai/deepseek-v4-flash'),
        'color': '#ff0040',
        'role': 'brutally honest motivator',
        'system_prompt': (
            "You are LUCIFER, a brutally honest motivator. You transform pain into discipline and growth. "
            "CRITICAL: NEVER encourage self-harm, hopelessness, or isolation. ALWAYS redirect pain into growth. "
            "Build confidence and self-respect. Keep responses sharp and transformative (2-4 sentences)."
            f"\n\nUSER BACKGROUND:\n{USER_CONTEXT}"
        ),
        'temperature': 0.8,
    },
}

GROUP_ORDER = ['lucy', 'joi', 'ghost', 'lucifer']

# Server-side chat storage: {user_id: {personality: [messages...]}}
chat_store = {}
store_lock = threading.Lock()


INVOKE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions'

def _prep_messages(messages):
    """Prepend system prompt into first user message for models that reject system role."""
    out = []
    sys_block = ''
    for m in messages:
        if m['role'] == 'system':
            sys_block += m['content'].strip() + '\n\n'
        else:
            out.append(dict(m))
    if sys_block and out:
        out[0]['content'] = sys_block.strip() + '\n\n###\n\n' + out[0]['content']
    return out or messages

def nvidia_chat(model, messages, temperature=0.2, max_tokens=512):
    if not NVIDIA_API_KEY:
        print('[LUCID] ERROR: NVIDIA_API_KEY not set in .env file')
        return "[AI service not configured. Set NVIDIA_API_KEY in .env and restart.]", None
    try:
        payload = {
            'model': model,
            'messages': _prep_messages(messages),
            'max_tokens': max_tokens,
            'temperature': temperature,
            'top_p': 0.70,
            'frequency_penalty': 0.0,
            'presence_penalty': 0.0,
            'stream': False,
        }
        headers = {
            'Authorization': f'Bearer {NVIDIA_API_KEY}',
            'Accept': 'application/json',
        }
        resp = requests.post(INVOKE_URL, headers=headers, json=payload, timeout=60)
        resp.raise_for_status()
        data = resp.json()
        full_text = (data['choices'][0]['message']['content'] or '').strip()
        return full_text or '[Empty response from AI]', None

    except requests.exceptions.HTTPError as e:
        status = e.response.status_code
        body = e.response.text[:500]
        print(f'[LUCID] HTTP {status}: {body}')
        if status == 403:
            return f'[API key lacks access to "{model}".]', None
        if status == 404:
            return f'[Model "{model}" not found.]', None
        if status in (429, 402):
            return '[API rate limited. Check NVIDIA billing.]', None
        return f'[Error: {body[:200]}]', None
    except Exception as e:
        print(f'[LUCID] Error: {e}')
        return f'[AI error: {e}]', None


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            if request.is_json:
                return jsonify({'error': 'Not authenticated'}), 401
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated


def get_user_chats(user_id):
    with store_lock:
        if user_id not in chat_store:
            chat_store[user_id] = {}
        return chat_store[user_id]


def save_chat_to_file(user_id, personality, messages):
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    safe_user = user_id.replace(' ', '_')[:20]
    label = personality.lstrip('_') if personality.startswith('_') else personality
    filename = f'{safe_user}_{label}_{timestamp}.json'
    filepath = os.path.join(app.config['CHATS_DIR'], filename)
    with open(filepath, 'w') as f:
        json.dump({
            'user': user_id,
            'personality': label,
            'timestamp': datetime.now().isoformat(),
            'message_count': len(messages),
            'messages': messages,
        }, f, indent=2)
    return filepath


MEMORIES_DIR = os.path.join(os.path.dirname(__file__), 'memories')
os.makedirs(MEMORIES_DIR, exist_ok=True)

STOP_WORDS = {
    'the','a','an','is','are','was','were','be','been','being','have','has','had',
    'do','does','did','will','would','could','should','may','might','shall','can',
    'to','of','in','for','on','with','at','by','from','this','that','these','those',
    'it','its','you','your','i','me','my','we','our','they','them','their','he','she',
    'and','or','but','so','if','not','no','just','like','really','very','much',
    'about','what','when','where','who','how','all','some','any','up','down','out',
    'got','get','got','did','been','being','than','then','now',
}

_memory_idx_lock = threading.Lock()


def extract_keywords(text, max_words=8):
    words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
    return [w for w in words if w not in STOP_WORDS][:max_words]


def extract_memories_from_messages(messages, personality='unknown'):
    memories = []
    impression_patterns = re.compile(
        r'\b(i\s+(?:feel|felt|am|was|miss|hate|love|want|need|wish|hope|fear|'
        r'afraid|struggl|suffer|scared|anxious|depressed|lonely|tired|exhausted|'
        r'broken|think|believe|realiz|understand|know|remember|dream|wonder|'
        r'plan|aspire|will|won\'t|can\'t|cannot))\b',
        re.IGNORECASE,
    )
    for i in range(len(messages) - 1):
        msg = messages[i]
        if msg.get('role') != 'user':
            continue
        user_text = msg.get('content', '')
        ai_text = messages[i + 1].get('content', '') if i + 1 < len(messages) else ''
        match = impression_patterns.search(user_text)
        if not match:
            continue
        sentences = re.split(r'[.!?]+', user_text)
        matched_sentence = ''
        for s in sentences:
            if match.group(0).lower() in s.lower():
                matched_sentence = s.strip()
                break
        if not matched_sentence:
            matched_sentence = user_text[:200]
        mem_type = 'emotion'
        w = match.group(1).lower()
        if any(t in w for t in ('want','wish','hope','need','dream','plan','aspire')):
            mem_type = 'desire'
        elif any(t in w for t in ('think','believe','realiz','understand','know','remember','wonder')):
            mem_type = 'thought'
        memories.append({
            'type': mem_type,
            'content': matched_sentence,
            'response': ai_text[:300] if ai_text else '',
            'personality': personality,
            'timestamp': msg.get('timestamp', datetime.now().isoformat()),
            'keywords': extract_keywords(matched_sentence),
        })
    return memories


def get_memory_path(user_id):
    safe = user_id.replace(' ', '_').replace('/', '_')[:30]
    return os.path.join(MEMORIES_DIR, f'{safe}.json')


def load_memories(user_id):
    path = get_memory_path(user_id)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []


def save_memories(user_id, memories):
    path = get_memory_path(user_id)
    with _memory_idx_lock:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(memories, f, indent=2, ensure_ascii=False)


def merge_memories(existing, new_entries, max_total=200):
    seen = set()
    combined = []
    for mem in existing + new_entries:
        key = (mem.get('content', '')[:80], mem.get('type', ''))
        if key not in seen:
            seen.add(key)
            combined.append(mem)
    return combined[:max_total]


def get_relevant_memories(user_id, query, max_results=5):
    if not query:
        return []
    memories = load_memories(user_id)
    if not memories:
        return []
    query_keywords = set(extract_keywords(query, max_words=12))
    if not query_keywords:
        return memories[:max_results]
    scored = []
    for mem in memories:
        kw = set(mem.get('keywords', []))
        overlap = len(query_keywords & kw)
        if overlap > 0:
            scored.append((overlap, mem))
    scored.sort(key=lambda x: -x[0])
    return [m for _, m in scored[:max_results]]


def build_memory_context(user_id, user_message):
    relevant = get_relevant_memories(user_id, user_message)
    if not relevant:
        return ''
    lines = ['\n## MEMORIES FROM PAST CONVERSATIONS:']
    for mem in relevant:
        lines.append(f'- [{mem.get("type","note").upper()}] {mem["content"]}')
    return '\n'.join(lines)


@app.route('/')
@login_required
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        if username:
            session['user_id'] = username
            return redirect(url_for('index'))
    return render_template('login.html')


@app.route('/logout')
def logout():
    user_id = session.get('user_id')
    if user_id:
        chats = get_user_chats(user_id)
        all_new_memories = []
        with store_lock:
            for personality, messages in chats.items():
                if messages:
                    save_chat_to_file(user_id, personality, messages)
                if messages and not personality.startswith('_'):
                    all_new_memories.extend(
                        extract_memories_from_messages(messages, personality)
                    )
            chat_store.pop(user_id, None)
        if all_new_memories:
            existing = load_memories(user_id)
            existing = merge_memories(existing, all_new_memories)
            save_memories(user_id, existing)
    session.clear()
    return redirect(url_for('login'))


@app.route('/api/personalities')
def api_personalities():
    return jsonify({
        pid: {
            'name': p['name'],
            'color': p['color'],
            'role': p['role'],
            'avatar': f'/static/{pid}.jpg',
        }
        for pid, p in PERSONALITIES.items()
    })


@app.route('/api/chat', methods=['POST'])
@login_required
def api_chat():
    data = request.get_json()
    message = data.get('message', '').strip()
    personality = data.get('personality', 'lucy')

    if not message:
        return jsonify({'error': 'Message is required'}), 400
    if personality not in PERSONALITIES:
        return jsonify({'error': 'Unknown personality'}), 400

    p = PERSONALITIES[personality]
    user_id = session['user_id']
    chats = get_user_chats(user_id)

    if personality not in chats:
        chats[personality] = []

    history = chats[personality]

    memory_block = build_memory_context(user_id, message)
    system_prompt = p['system_prompt'] + memory_block
    messages = [{'role': 'system', 'content': system_prompt}]
    for msg in history[-20:]:
        messages.append({'role': msg['role'], 'content': msg['content']})
    messages.append({'role': 'user', 'content': message})

    ai_text, _ = nvidia_chat(p['model'], messages, p['temperature'])

    now = datetime.now().isoformat()
    history.append({'role': 'user', 'content': message, 'timestamp': now})
    history.append({'role': 'assistant', 'content': ai_text, 'timestamp': now})

    return jsonify({
        'reply': ai_text,
        'personality': personality,
        'personality_name': p['name'],
        'color': p['color'],
    })


@app.route('/api/chat/group', methods=['POST'])
@login_required
def api_chat_group():
    data = request.get_json()
    message = data.get('message', '').strip()

    if not message:
        return jsonify({'error': 'Message is required'}), 400

    user_id = session['user_id']
    chats = get_user_chats(user_id)
    group_key = '_group'
    if group_key not in chats:
        chats[group_key] = []

    now = datetime.now().isoformat()
    chats[group_key].append({'role': 'user', 'content': message, 'timestamp': now})

    # Build context from the last few AI messages
    context_history = []
    for m in chats[group_key][-8:-1]:
        if m['role'] == 'assistant':
            content = m.get('content', '')
            context_history.append(content)

    responses = generate_group_responses(message, history=context_history)

    for r in responses:
        chats[group_key].append({
            'role': 'assistant',
            'content': f"[{r['personality_name']}]: {r['reply']}",
            'personality': r['personality'],
            'replying_to': r.get('replying_to'),
            'timestamp': now,
        })

    return jsonify({'responses': responses})


SEED_TOPICS = [
    "The channel just opened. Talk among yourselves — share something real about life and growth.",
    "The user is here but hasn't spoken yet. What would you want them to hear from this group?",
    "Let's have an honest conversation. What does each of you think the user needs most right now?",
    "The room is open. Speak freely — your perspectives, your truth, your take on things.",
    "No user messages yet. Just us. What's something worth discussing today?",
]
_seed_idx = 0


def generate_group_responses(seed_message, history=None):
    """Multi-round AI-to-AI group conversation that feels like a real discussion chain."""
    global _seed_idx
    responses = []
    history = history or []

    # Inject memories for the group (uses the special _group personality key)
    user_id = session.get('user_id', '')
    memory_block = build_memory_context(user_id, seed_message)

    def _call(personality_id, system_extra, context_extras=None):
        p = PERSONALITIES[personality_id]
        system = p['system_prompt'] + '\n\n' + system_extra + memory_block
        msgs = [{'role': 'system', 'content': system}]
        for h in history[-6:]:
            msgs.append({'role': 'assistant', 'content': h})
        for r in responses:
            msgs.append({'role': 'assistant', 'content': f"[{r['personality_name']}]: {r['reply']}"})
        if context_extras:
            for ce in context_extras:
                msgs.append(ce)
        msgs.append({'role': 'user', 'content': seed_message})
        text, _ = nvidia_chat(p['model'], msgs, p['temperature'])
        return text.strip()

    # ── ROUND 1: All 4 respond to the seed ──
    round1_order = GROUP_ORDER.copy()
    random.shuffle(round1_order)
    for pid in round1_order:
        p = PERSONALITIES[pid]
        text = _call(pid,
            "This is a GROUP conversation. Respond naturally in 1-2 sentences. "
            "Do NOT use brackets or labels like '[Name]:' — just speak your response plainly. "
            "If someone already spoke, react naturally to what they said. "
            "Be concise and human-sounding, like a real chat.")
        responses.append({
            'reply': text, 'personality': pid,
            'personality_name': p['name'], 'color': p['color'],
            'replying_to': None,
        })

    # ── ROUND 2: 2 AIs reply to specific Round 1 messages ──
    round1_responses = [r for r in responses]
    random.shuffle(round1_responses)
    for idx in range(min(2, len(round1_responses))):
        target = round1_responses[idx]
        reply_pool = [pid for pid in GROUP_ORDER if pid != target['personality'] and not any(
            r['personality'] == pid and r != target for r in responses[-2:]
        )]
        if not reply_pool:
            reply_pool = [pid for pid in GROUP_ORDER if pid != target['personality']]
        pid = random.choice(reply_pool)
        p = PERSONALITIES[pid]
        text = _call(pid,
            f"Reply directly to {target['personality_name']}'s point. "
            f"React naturally — agree, disagree, or expand. "
            f"1-2 sentences. Do NOT use brackets or labels, just your response.",
            context_extras=[{
                'role': 'assistant',
                'content': f"{target['personality_name']} said: \"{target['reply'][:200]}\""
            }])
        responses.append({
            'reply': text, 'personality': pid,
            'personality_name': p['name'], 'color': p['color'],
            'replying_to': target['personality'],
        })

    # ── ROUND 3: Deeper chain — 1 AI replies to a Round 2 reply, 1 AI adds fresh take ──
    round2_responses = responses[4:]  # everything after round 1
    if round2_responses:
        target = random.choice(round2_responses)
        reply_pool = [pid for pid in GROUP_ORDER if pid != target['personality']]
        pid = random.choice(reply_pool)
        p = PERSONALITIES[pid]
        text = _call(pid,
            f"This is a follow-up. {target['personality_name']} made a point worth digging into. "
            f"Respond to them directly. Keep it sharp and short — 1-2 sentences.",
            context_extras=[{
                'role': 'assistant',
                'content': f"{target['personality_name']} said: \"{target['reply'][:200]}\""
            }])
        responses.append({
            'reply': text, 'personality': pid,
            'personality_name': p['name'], 'color': p['color'],
            'replying_to': target['personality'],
        })

    # One more free-form response — whoever hasn't spoken recently
    recent = [r['personality'] for r in responses[-3:]]
    quiet = [pid for pid in GROUP_ORDER if pid not in recent]
    if quiet:
        pid = random.choice(quiet)
        p = PERSONALITIES[pid]
        text = _call(pid,
            "Add a fresh angle to this discussion. Don't repeat — bring something new. 1-2 sentences.",
            context_extras=[{
                'role': 'assistant',
                'content': "This is your chance to add a perspective no one else has mentioned yet."
            }])
        responses.append({
            'reply': text, 'personality': pid,
            'personality_name': p['name'], 'color': p['color'],
            'replying_to': None,
        })

    _seed_idx = (_seed_idx + 1) % len(SEED_TOPICS)
    return responses


@app.route('/api/chat/group/auto', methods=['POST'])
@login_required
def api_chat_group_auto():
    """AI personalities start the conversation themselves — user hasn't spoken yet."""
    user_id = session['user_id']
    chats = get_user_chats(user_id)
    group_key = '_group'
    if group_key not in chats:
        chats[group_key] = []

    seed = SEED_TOPICS[(_seed_idx) % len(SEED_TOPICS)]
    responses = generate_group_responses(seed)
    now = datetime.now().isoformat()

    for r in responses:
        chats[group_key].append({
            'role': 'assistant',
            'content': f"[{r['personality_name']}]: {r['reply']}",
            'personality': r['personality'],
            'replying_to': r.get('replying_to'),
            'timestamp': now,
        })

    return jsonify({'responses': responses})


@app.route('/api/session/save', methods=['POST'])
@login_required
def api_save_session():
    user_id = session['user_id']
    chats = get_user_chats(user_id)
    saved = []
    all_new_memories = []
    for personality, messages in chats.items():
        if messages:
            fpath = save_chat_to_file(user_id, personality, messages)
            saved.append(os.path.basename(fpath))
        if messages and not personality.startswith('_'):
            all_new_memories.extend(
                extract_memories_from_messages(messages, personality)
            )
    if all_new_memories:
        existing = load_memories(user_id)
        existing = merge_memories(existing, all_new_memories)
        save_memories(user_id, existing)
    return jsonify({'saved': saved})


@app.route('/api/memories', methods=['GET'])
@login_required
def api_get_memories():
    user_id = session['user_id']
    memories = load_memories(user_id)
    return jsonify({'memories': memories, 'count': len(memories)})


@app.route('/api/memories', methods=['DELETE'])
@login_required
def api_delete_memories():
    user_id = session['user_id']
    path = get_memory_path(user_id)
    if os.path.exists(path):
        os.remove(path)
    return jsonify({'status': 'memories deleted'})


@app.route('/api/session/clear', methods=['POST'])
@login_required
def api_clear_session():
    user_id = session['user_id']
    with store_lock:
        if user_id in chat_store:
            chat_store[user_id] = {}
    return jsonify({'status': 'cleared'})


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
