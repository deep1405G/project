import { useEffect, useRef, useState } from "react";
import { T } from "../../theme/tokens";
import { GAMES } from "../games/catalog";
import { RESOURCES } from "../resources/Resources";
import { EXPERTS } from "../experts/Experts";

const QUICK = [
  { label: "😤 Need to vent", msg: "I just need to vent for a sec" },
  { label: "✨ Hype me up", msg: "I'm feeling low, hype me up" },
  { label: "💆 Calm me down", msg: "I'm really anxious, help me calm down" },
  { label: "😂 Make me laugh", msg: "say something that'll make me laugh" },
  { label: "🎯 Motivate me", msg: "I need motivation to get through today" },
];

export default function Chat({ checkScore, checkContext, user, openGame, setScreen }) {
  const storageKey = `mannsaathi.chat.v1:${user.email || user.name || "anon"}`;
  const [msgs, setMsgs] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch {}
    return [
      {
        role: "assistant",
        content: `hey ${user.name} 👋 i'm MannSaathi — your wellness companion. you can vent, ask for advice, request a game, or just chat. what's up? 🌿`,
      },
    ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEnd = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);
  useEffect(() => {
    try {
      const trimmed = msgs.slice(-30);
      localStorage.setItem(storageKey, JSON.stringify(trimmed));
    } catch {}
  }, [storageKey, msgs]);

  const generateResponse = (text) => {
    const t = text.toLowerCase().trim();
    const w = t.split(/\s+/);
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const has = (...words) => words.some((wd) => t.includes(wd));
    const re = (...patterns) => patterns.some((p) => t.match(p));
    const N = user.name;

    // ── CRISIS / SELF-HARM (always check first) ──
    if (has("suicide", "kill myself", "end it all", "want to die", "self harm", "self-harm", "cutting myself", "no reason to live", "better off dead"))
      return N + ", i'm really glad you told me this. you matter more than you know. ❤️\n\nplease reach out to a crisis helpline right now:\n📞 India: iCall — 9152987821\n📞 Vandrevala Foundation — 1860-2662-345\n📞 AASRA — 9820466726\n\nyou deserve support from a real person. check our Resources 📚 tab too. i'm here with you.";

    // ── GREETINGS ──
    if (re(/^(hi+|hey+|hello+|sup|yo+|hola|namaste|howdy|greetings|good\s*(morning|evening|afternoon|night)|what'?s?\s*up|wassup|hii+)\b/) && w.length <= 5)
      return pick([
        "hey " + N + "! 👋 how's your day going? anything on your mind?",
        "heyyy " + N + "! 🌿 what's the vibe today? deep talks, quick games, or just chilling — i'm here for all of it!",
        "yo " + N + "! 👋 good to see you. what can i do for you today? 😊",
        "hello hello! ✨ welcome! you can vent, play games, do a self-check, or just chat. what sounds good?",
        "hey there " + N + "! 🌟 how are things? fill me in!",
      ]);

    // ── HOW ARE YOU / ABOUT BOT ──
    if (re(/how\s*(are|r)\s*(you|u|ya)/, /you\s*(okay|good|doing|feeling)/, /what about you/, /and you\??/))
      return pick([
        "aww thanks for asking! 😊 i'm just an AI so i don't have feelings, but i'm always ready and happy to help YOU! how are you doing " + N + "?",
        "i appreciate you checking! 💜 as an AI i'm always at 100% — the real question is: how are YOU feeling today?",
        "that's sweet of you " + N + "! 😄 i'm great — powered up and ready to chat. but forget about me — what's going on with you? 🌿",
      ]);

    if (re(/who\s*(are|r)\s*(you|u)/, /what\s*(are|r)\s*(you|u)/, /your\s*name/, /tell\s*me\s*about\s*(yourself|you)/, /what\s*can\s*you\s*do/, /what\s*do\s*you\s*do/))
      return "i'm MannSaathi — your AI wellness companion! 🧠💜\n\nhere's what i can do:\n💬 chat about anything on your mind\n🌿 help with anxiety, stress, sadness, motivation\n🎮 6 fun stress-relief games\n📋 self-check tests (depression, anxiety, stress)\n📚 mental health resources & helplines\n🩺 connect you with expert psychologists\n\njust talk to me like you'd talk to a friend!";

    // ── GAMES ──
    if (re(/\b(game|play|bored|fun|entertain|something\s*to\s*do)\b/))
      return pick([
        "ooh yes let's play! 🎮 here's what we got:\n\n🧠 Memory Match — flip & match emoji pairs\n🌬️ Breathing Bubble — calming 4-7-8 technique\n💬 MindWord — guess the 5-letter word\n🎨 Color Clash — name the ink color fast!\n🐍 Chill Snake — classic snake, zero pressure\n🔢 MindTiles — merge tiles to 2048\n\njust tap any game below or hit the 🎮 Games tab!",
        "i love that energy! 🎮 try Color Clash 🎨 if you want something quick, or Chill Snake 🐍 to zone out. the games are right below — tap any!",
        "gaming time! 🔥 if you're stressed try Breathing Bubble 🌬️. for a brain workout, go Memory Match 🧠 or MindWord 💬. pick your vibe!",
      ]);

    // ── ANXIETY / STRESS / PANIC ──
    if (re(/\b(anxious|anxiety|panic|nervous|worried|worrying|stress|stressed|stressing|overwhelm|tense|tension|restless|uneasy|on\s*edge|cant\s*breathe|can't\s*breathe|freaking\s*out|freak\s*out|scared|fear|phobia|dread)\b/))
      return pick([
        "i see you " + N + ". that anxious feeling is your body trying to protect you, even when it's overdoing it.\n\ntry this grounding exercise:\n1. name 5 things you can see\n2. 4 things you can touch\n3. 3 things you can hear\n\nit really works. also, our Breathing Bubble 🌬️ is built for exactly this. 💙",
        "anxiety is your brain's alarm system going off too loud. it sucks, but it's manageable.\n\nright now: unclench your jaw. drop your shoulders. take one deep breath.\n\nbetter? 🌿 try the Breathing Bubble 🌬️ for guided breathing.",
        N + ", when anxiety hits, try the 5-4-3-2-1 technique:\n\n5 things you see\n4 things you touch\n3 things you hear\n2 things you smell\n1 thing you taste\n\nit pulls your brain back to the present. you're safe. 🌿",
      ]);

    // ── FEELING UNWELL / SICK / BAD (general) ──
    if (re(/\b(unwell|sick|not\s*feeling\s*(well|good|great|okay|ok)|feeling\s*(bad|terrible|awful|horrible|rough|off|weird|strange|low|down|ill|crappy|shitty|trash|numb|meh|blah|icky))\b/, /\b(not\s*(good|well|great|okay|ok|fine))\b/, /i('?m| am)\s*(bad|low|ill|sick|unwell|not\s*(well|ok|okay|good|great|fine))/))
      return pick([
        "i'm sorry you're not feeling well " + N + " 💙 are you feeling physically unwell, or is it more of a mental/emotional thing?\n\neither way, i'm here. if it's physical, please take care — rest, hydrate, see a doctor if needed.\n\nif it's emotional, tell me more. sometimes just talking helps. 🌿",
        "that sucks, " + N + ". 💜 not feeling good is the worst.\n\ntake a moment — what kind of 'unwell'? stressed? sad? physically sick? anxious?\n\nknowing helps me help you better. and if you're not sure, that's okay too — just talk, i'll listen.",
        "i hear you " + N + ". 🌿 when you're not feeling right, everything feels harder.\n\nhere are some things that might help right now:\n• take a few deep breaths (or try Breathing Bubble 🌬️)\n• drink some water\n• step outside for 2 minutes if you can\n\nwant to talk about what's going on? i'm all ears.",
      ]);

    // ── SADNESS / DEPRESSION ──
    if (re(/\b(sad|depressed|depression|hopeless|worthless|empty|crying|cry|cried|lonely|alone|isolated|hate\s*myself|don't\s*care|dont\s*care|give\s*up|giving\s*up|no\s*point|what's\s*the\s*point|miserable|broken|shattered|devastated|heartbroken|grief|grieving|mourning|lost\s*someone|miss\s*(them|him|her|you))\b/))
      return pick([
        N + ", i'm really glad you're talking about this. it takes courage. 💙\n\nyou don't have to fix everything right now. sometimes just getting through the day IS enough.\n\nwant to vent more? i'm here. or try a game for a distraction.",
        "what you're feeling is valid " + N + ". you're not broken, you're human. 🌿\n\ndo one tiny nice thing for yourself right now? even just getting water or looking out a window.\n\nif things feel really dark, check our Resources 📚 tab for crisis helplines. you matter more than you know.",
        "that sounds really tough. 💜 you reached out though, and that says something about your strength.\n\nwanna talk more about it? i'm not going anywhere. literally — i'm AI, i've got nowhere else to be 😊",
        "i wish i could give you a hug right now " + N + ". 💙\n\nsadness is heavy, but you don't have to carry it alone. talk to me, try our Self-Check 📋 for a snapshot of where you're at, or check the Experts 🩺 tab to talk to a real psychologist.\n\nyou're not alone in this.",
      ]);

    // ── MOTIVATION / ENERGY ──
    if (re(/\b(motivation|motivate|motivated|motivating|lazy|unmotivated|can't\s*focus|cant\s*focus|procrastinat|procrastination|procrastinating|stuck|no\s*energy|tired|exhausted|don't\s*want\s*to|dont\s*want\s*to|burnout|burnt\s*out|burned\s*out|no\s*willpower|can't\s*do\s*(this|it|anything)|what's\s*the\s*use|dragging|drained|lethargic|sluggish|get\s*through\s*(today|this|the\s*day)|need\s*(a\s*)?push|keep\s*going)/))
      return pick([
        "okay " + N + ", real talk: motivation is overrated.\n\nthe secret? start SO small it feels stupid. like \"open the book\" not \"study 3 hours.\" momentum builds once you start.\n\nyou don't need motivation. you need a 2-minute start. go. 🔥",
        "some days the battery's at 2%. but you showed up here, which means part of you still wants to push. 🔋\n\npick ONE thing. the smallest version. do just that.\n\nalso, Color Clash 🎨 or MindTiles 🔢 are great 5-minute brain reboots! ⚡",
        "feeling low on fuel doesn't mean you're failing. even machines need recharging! 🔋\n\nit's okay to rest. BUT if you want a push — remember why you started. picture future-you saying thanks.\n\nnow take one tiny step. just one. 💪",
        "hey " + N + ", here's a trick: the \"2-minute rule\"\n\nif something takes less than 2 minutes, do it NOW. if it's bigger, just commit to 2 minutes of it. usually once you start, you keep going.\n\nyour brain resists starting, not doing. trick it! 🧠🔥",
      ]);

    // ── HAPPINESS / GRATITUDE ──
    if (re(/\b(happy|great|amazing|awesome|good\s*day|excited|grateful|thankful|thanks|thank\s*you|love\s*this|love\s*it|wonderful|fantastic|blessed|proud|accomplished|pumped|thrilled|ecstatic|yay|yayyy|woohoo|woo\s*hoo|celebrate)\b/))
      return pick([
        "yesss that energy!! 🎉 i love this for you " + N + "! ride that wave!\n\nwanna keep the vibes going? try Memory Match 🧠 or Color Clash 🎨! ✨",
        "look at you glowing! 🌟 treasure this feeling — maybe write down what made today good so you can revisit it later.\n\nyou're doing better than you think. always. 💜",
        "this made me smile! 😊 soak it in " + N + ".\n\nprotip: your brain remembers negative stuff 3x more than positive, so savoring good moments literally rewires you. science! 🧠✨",
        "LOVE to see it! 🔥 you deserve this " + N + ". 💜\n\ncapture this moment — journal it, screenshot this chat, whatever. when tough days come, this is your evidence that good days exist.",
      ]);

    // ── ANGER / FRUSTRATION ──
    if (re(/\b(angry|furious|mad|pissed|frustrated|hate|ugh+|annoyed|irritated|rage|raging|fuming|livid|triggered|snap|snapped|fed\s*up|sick\s*of|had\s*enough|done\s*with)\b/))
      return pick([
        "i feel that frustration " + N + ". your anger is valid — it means something matters to you.\n\ntry the \"5-5-5\" — will this matter in 5 minutes? 5 hours? 5 days?\n\nneed to blow off steam? Chill Snake 🐍 or Color Clash 🎨 are weirdly therapeutic. or just vent here. 🫂",
        "anger's like a fire alarm — useful signal but you don't want it running forever.\n\ntry this: clench every muscle TIGHT for 5 seconds... then release. that's your nervous system resetting.\n\nnow tell me what happened. 💪",
        "okay " + N + ", let it out. this is a judgment-free zone. 💬\n\nwhen you're ready, try:\n1. splash cold water on your face (triggers dive reflex, calms you down instantly)\n2. box breathing: 4 in, 4 hold, 4 out, 4 hold\n\nbut first — what happened?",
      ]);

    // ── VENTING / BAD DAY ──
    if (re(/\b(vent|need\s*to\s*talk|just\s*listen|hear\s*me\s*out|going\s*through|rough\s*day|bad\s*day|terrible\s*day|worst\s*day|tough\s*day|hard\s*day|horrible\s*day|difficult|struggling|can't\s*take|cant\s*take|falling\s*apart|breaking\s*down|i\s*need\s*help|help\s*me|everything\s*sucks|life\s*sucks|hate\s*everything|hate\s*this|i\s*can't|i\s*cant)\b/))
      return pick([
        "i'm right here " + N + ". no judgment, no fixing — just listening. 👂💜\n\ntell me everything. take your time.",
        "your space, your pace. i'm not going anywhere. let it all out " + N + ". 🌿",
        "rough days are the WORST. but you're here, reaching out — that's already a win.\n\ni'm all ears. what's going on? 💙",
        "hey " + N + ", i'm here and i'm not going anywhere. 💜\n\nthere's no wrong way to vent. type it all out, messy, unfiltered — this is YOUR space. whenever you're ready.",
      ]);

    // ── HUMOR / JOKES ──
    if (re(/\b(joke|funny|laugh|humor|make\s*me\s*laugh|cheer\s*me\s*up|something\s*funny|lol+|lmao|rofl|haha+|hehe+|xd)\b/))
      return pick([
        "why don't scientists trust atoms?\n\n...because they make up everything 😂\n\n*ba dum tss* 🥁 want another? 😄",
        "my therapist says i have trouble letting go of things.\n\ni said \"i know, that's why i'm still holding this conversation\" 😅\n\n...i'll be here all week! 🎭",
        "why did the scarecrow win an award?\n\nbecause he was outstanding in his field 🌾😂\n\nterrible, right? try Color Clash 🎨 — impossible not to smile! 😄",
        "a man walks into a library and asks for books about paranoia.\n\nthe librarian whispers: \"they're right behind you!\" 😂\n\nwant more? or wanna try a game? 🎮",
        "parallel lines have so much in common...\n\nit's a shame they'll never meet. 😢😂\n\n*math joke gang* 🤓 want a better one? 😄",
      ]);

    // ── SLEEP ──
    if (re(/\b(sleep|insomnia|can't\s*sleep|cant\s*sleep|awake|nightmare|restless|up\s*all\s*night|lying\s*awake|tossing|turning|oversleep|oversleeping|drowsy|groggy)\b/))
      return pick([
        "sleep struggles are the worst 🌙\n\ntry tonight:\n• no screens 30 min before bed\n• 4-7-8 breathing (or our Breathing Bubble 🌬️)\n• write down tomorrow's worries to \"let go\"\n\nyour body WANTS to sleep. 💤",
        "can't sleep gang 🌙 try the \"military sleep method\":\n\n1. relax your face muscles completely\n2. drop your shoulders\n3. relax your hands and arms\n4. clear your mind for 10 seconds\n5. imagine lying in a warm dark room\n\nBreathing Bubble 🌬️ is great for this too. the 4-7-8 pattern slows your heart rate. 😴",
        "hey " + N + ", sleep is SO important for mental health. 💤\n\nquick tips:\n• keep a consistent sleep/wake time (even weekends!)\n• cool, dark room\n• no caffeine after 2pm\n• try journaling before bed to dump your thoughts\n\nour Breathing Bubble 🌬️ is basically a sleep button. try it!",
      ]);

    // ── RELATIONSHIPS ──
    if (re(/\b(relationship|breakup|break\s*up|boyfriend|girlfriend|bf|gf|ex\b|partner|dating|heartbreak|ghosted|crush|marriage|divorce|toxic\s*relationship|cheating|cheated|trust\s*issues|commitment|love\s*life|single|rejection|rejected)\b/))
      return pick([
        "relationship stuff hits different 💔 your feelings are completely valid.\n\nwant to talk through it? i'm here with zero judgment. 🌿",
        "matters of the heart are never simple " + N + ". but remember: your worth is NOT defined by someone else's ability to see it.\n\ntell me what's going on. 💙",
        "love and relationships can be the most beautiful AND the most painful things. 💜\n\nwhatever you're going through " + N + ", you're allowed to feel it fully. no rushing, no \"getting over it\" on someone else's timeline.\n\nwhat happened? i'm listening.",
        "hey " + N + ", relationship pain is real pain — your brain literally processes heartbreak like physical injury.\n\nso be gentle with yourself. and talk to me — sometimes an outside perspective (even from an AI) helps. 💙",
      ]);

    // ── ACADEMICS / WORK ──
    if (re(/\b(exam|study|school|college|university|assignment|deadline|work\s*pressure|homework|grades|fail|failed|failing|gpa|marks|result|career|job|interview|internship|placement|semester|lecture|professor|teacher|project|presentation|thesis)\b/))
      return pick([
        "academic pressure is no joke. but grades don't define your intelligence or future. 🌟\n\nbreak tasks into tiny pieces. easiest part first. build momentum.\n\nneed a brain break? MindWord 💬 or Memory Match 🧠 are great between study sessions! 📚",
        "i know that pressure feels crushing " + N + ". but panicking never improved a grade.\n\nwhat specifically is overwhelming you? let's break it down. one step at a time > spiraling. 🔥",
        "hey " + N + ", the Pomodoro Technique works wonders:\n\n🍅 25 min focused work\n☕ 5 min break (try a quick game here!)\n🔁 repeat 4 times, then 15 min break\n\nit tricks your brain into starting. and starting is the hardest part! 💪",
        "i feel you on the academic stress " + N + ". 📚\n\nremember:\n• your grades ≠ your worth\n• comparing yourself to others is a losing game\n• asking for help is smart, not weak\n\nnow what's specifically bugging you? let's tackle it together.",
      ]);

    // ── EXPERTS / PROFESSIONAL HELP ──
    if (re(/\b(expert|therapist|psychologist|counselor|counselling|counseling|doctor|professional|appointment|therapy|psychiatric|psychiatrist|mental\s*health\s*professional|need\s*help|real\s*help)\b/))
      return pick([
        "that's a great step " + N + "! 💜 talking to a professional can make a huge difference.\n\ncheck out our Experts tab 🩺 — we have verified psychologists you can book appointments with directly. it's easy and confidential.",
        "seeking professional help is one of the strongest things you can do. 🌟\n\nhead to the Experts tab 🩺 in the navbar — you'll find psychologist profiles with their specialties, experience, and available slots. book right from there!",
        "absolutely " + N + "! professional support + self-care = 💪\n\nour Experts tab 🩺 has 6 verified psychologists with different specialties — anxiety, depression, relationships, trauma, and more.\n\nyou can book an appointment directly from there. totally confidential.",
      ]);

    // ── EATING / BODY IMAGE ──
    if (re(/\b(eating|food|appetite|no\s*appetite|binge|starving|body\s*image|weight|fat|skinny|ugly|appearance|anorexia|anorexic|bulimia|bulimic|not\s*eating|overeating)/))
      return pick([
        "body and food stuff is really personal and complex " + N + ". 💜 i hear you.\n\nyour relationship with food and your body matters. if you're struggling, talking to a professional can really help — check the Experts tab 🩺.\n\nwant to talk about what's on your mind?",
        "hey " + N + ", whatever you're dealing with around food and body — it's not silly or vain. it's real. 🌿\n\nplease be kind to yourself. and if this is affecting your daily life, consider reaching out to a professional through our Experts tab 🩺. you deserve support.",
      ]);

    // ── SOCIAL / FRIENDS / FAMILY ──
    if (re(/\b(friend|friendship|friends|family|parents|parent|mom|dad|brother|sister|sibling|toxic|bully|bullied|bullying|peer\s*pressure|fitting\s*in|left\s*out|excluded|abandoned|betrayed|fight|argument|conflict)\b/))
      return pick([
        "people stuff is hard " + N + ". whether it's friends, family, or anyone — relationships shape how we feel about ourselves.\n\ntell me what's happening. i'm here to listen without picking sides. 🌿",
        "hey " + N + ", social and family dynamics can be SO draining. your feelings about it are totally valid.\n\nwant to vent? or would you like some practical tips on handling the situation? i'm here either way. 💜",
        "that sounds tough " + N + ". 💙 the people closest to us can sometimes cause the most pain.\n\nbut remember: setting boundaries isn't selfish. it's necessary. tell me more about what's going on?",
      ]);

    // ── CONFIDENT / SELF-ESTEEM ──
    if (re(/\b(confident|confidence|self[\s-]*esteem|self[\s-]*worth|insecure|not\s*good\s*enough|imposter|impostor|don't\s*belong|dont\s*belong|comparison|comparing|inferior|inadequate)\b/))
      return pick([
        "hey " + N + ", the fact that you're aware of it shows self-awareness — and that's a strength. 🌟\n\nhere's truth: nobody has it all figured out. everyone is performing confidence to some degree.\n\nwhat specifically is making you feel this way? let's unpack it.",
        "imposter syndrome / low self-esteem is SO common " + N + ". you're not alone. 💜\n\ntry this: write down 3 things you did well today. even tiny ones. your brain needs evidence that you're capable — give it some!\n\nwant to talk more about this?",
      ]);

    // ── CONVERSATION CONTINUERS ──
    if (re(/^(ok+|okay+|alright|sure+|yeah+|yep|yup|ya|ye|yes|right|got\s*it|i\s*see|hmm+|mm+|oh+|ah+|k+|cool+|nice+|fine+|true|fair\s*enough|makes\s*sense|i\s*understand|understood)$/i) && w.length <= 3)
      return pick([
        "anything else on your mind " + N + "? 😊 i'm here!",
        "cool! 🌿 is there something else you'd like to talk about, or want to try a game?",
        "i'm here whenever you need me! want to chat more, play a game 🎮, or do a self-check 📋?",
        "alright " + N + "! 😊 anything more you want to discuss? or shall we do something fun? 🎮",
      ]);

    // ── WORLD EVENTS / NEWS / DISTRESSING TOPICS ──
    if (re(/\b(war|wars|conflict|bomb|attack|terror|terrorism|terrorist|military|army|troops|missile|nuclear|weapon|peace|refugee|crisis|disaster|earthquake|flood|hurricane|tornado|tsunami|climate\s*change|global\s*warming|pandemic|covid|virus|election|protest|riot|violence|shooting|genocide|famine|drought|political|government|dictator|sanction|invasion|occupation|ceasefire|casualt|death\s*toll|civilian|iran|iraq|ukraine|russia|gaza|palestine|israel|syria|afghanistan|china|taiwan|north\s*korea|yemen|sudan|myanmar|lebanon|pakistan|nato|united\s*nations|hamas|taliban|isis|poverty|hunger|recession|inflation|layoff|unemployment)/))
      return pick([
        "world events like this can be really distressing " + N + ". 💙 it's completely normal to feel anxious, sad, or helpless when you hear about conflicts and suffering around the world.\n\nhere are some healthy ways to cope:\n• limit your news intake — 10-15 min max, then step away\n• talk about how it makes you FEEL (i'm here for that)\n• channel your empathy into small actions — donate, volunteer, spread awareness\n• ground yourself with the 5-4-3-2-1 technique\n\nhow is this affecting you emotionally? let's talk about it. 🌿",
        "i hear you " + N + ". what's happening in the world can feel overwhelming and deeply upsetting. 💜\n\n\"compassion fatigue\" is real — when you absorb too much suffering from the news, it can drain YOUR mental health.\n\nsome tips:\n• it's okay to take breaks from the news\n• feeling helpless is normal — focus on what you CAN control\n• talk about your feelings (you're already doing that! 💪)\n• try a game or breathing exercise when it gets too heavy\n\nwhat specifically is weighing on you? i'm listening. 🌿",
        "that's a heavy topic " + N + ". global events and crises affect our mental health more than we realize. 🌍💙\n\nstudies show that constant exposure to distressing news can increase anxiety, depression, and feelings of helplessness — even if the events aren't directly affecting us.\n\nhere's what helps:\n• be informed, but set boundaries with media consumption\n• focus on your circle of influence — small acts matter\n• process your emotions — journaling, talking, or even our Breathing Bubble 🌬️\n• remember: caring about the world shows you have a good heart\n\nhow are you feeling about all this? let's unpack it. 💜",
        "it's hard to see what's happening in the world and not feel affected " + N + ". 💙 your concern shows genuine empathy — that's a beautiful quality.\n\nbut carrying the weight of the world can be exhausting. here's a balance:\n• stay informed, but protect your peace — set a news time limit\n• connect with others who share your concerns\n• take action where you can, accept what you can't change\n• take care of YOUR mental health so you can keep caring\n\nwant to talk about how this is making you feel? i'm here. 🌿",
      ]);

    // ── GENERAL CURIOSITY / OFF-TOPIC ──
    if (re(/\b(tell\s*me\s*about|what\s*is|who\s*is|where\s*is|when\s*did|how\s*does|explain|define|history|geography|science|math|recipe|code|programming|python|javascript|movie|film|music|song|book|capital\s*of|population|weather|sports|cricket|football|soccer|basketball|anime|manga)/))
      return pick([
        "ooh interesting question " + N + "! 😄 that's a bit outside my wheelhouse — i'm your mental wellness companion, so i'm best with feelings, stress, motivation, and fun games!\n\nbut hey, if something about that topic is affecting how you FEEL, i'm all ears. is there an emotional side to this? 💜",
        "hmm, i might not be the best for that specific question " + N + "! 🧠 my superpowers are:\n💬 emotional support & advice\n🌿 anxiety, stress, sadness help\n🎮 fun stress-relief games\n📋 wellness self-checks\n🩺 expert psychologist connections\n\nbut if something's on your mind emotionally, try me! i might surprise you. 😊",
        "that's a cool topic! unfortunately i'm more of an emotions expert than a knowledge encyclopedia 😅\n\nbut " + N + ", if you're curious about something because it's been on your mind or affecting your mood, let's talk about THAT side of it. sometimes what we search for reflects what we're feeling. 💜\n\nor we could play a game? 🎮",
      ]);

    // ── THANKS / APPRECIATION ──
    if (re(/\b(thanks|thank\s*you|thx|ty|appreciate|helpful|you'?re?\s*(the\s*)?best|you'?re?\s*amazing|you'?re?\s*great|love\s*you|love\s*u|you\s*rock)\b/))
      return pick([
        "aww that means a lot " + N + "! 😊💜 i'm always here whenever you need me. you're the real star! ✨",
        "you're so welcome " + N + "! 🌟 making you feel even a tiny bit better is literally my purpose. come back anytime! 🌿",
        "no YOU'RE amazing! 💜 glad i could help. remember — i'm here 24/7, no judgment, no waiting rooms. 😊",
      ]);

    // ── GOODBYE ──
    if (re(/\b(bye+|goodbye|good\s*night|goodnight|see\s*you|see\s*ya|gotta\s*go|have\s*to\s*go|leaving|talk\s*later|ttyl|brb|later|cya|take\s*care)\b/))
      return pick([
        "take care " + N + "! 💜 remember, i'm here 24/7 whenever you need me. be kind to yourself! 🌿",
        "bye " + N + "! 👋 take it easy. you're doing great, even on the hard days. see you soon! ✨",
        "talk soon " + N + "! 🌙 drink some water, take some deep breaths, and know that you matter. always. 💜",
      ]);

    // ── SMART DEFAULT (conversational, not generic) ──
    const defaults = [
      "hmm, tell me more about that " + N + ". i want to understand what you're going through. 💜\n\nthe more you share, the better i can help. no pressure though!",
      "i hear you " + N + ". 🌿 can you tell me a bit more about what's on your mind? i want to make sure i respond in a way that actually helps.",
      "interesting " + N + "! 💬 i'd love to dig deeper into that. what's making you think about this right now?",
      "i appreciate you sharing that. 💙 help me understand better — what's the main thing bothering you right now? is it stress, sadness, relationships, or something else?",
      "got it " + N + ". 🧠 i'm here for the deep stuff AND the light stuff. want to:\n\n💬 talk more about this\n🎮 play a game\n📋 do a self-check\n🩺 browse our experts\n\nyou lead, i follow!",
      "i see! " + N + ", my strengths are in mental wellness — stress, anxiety, sadness, motivation, relationships, and fun games to unwind. 🌿\n\ntry telling me how you're feeling, or ask for a game or joke! 😊",
      "hey " + N + ", i want to help but i'm not sure i fully understood. 💜 could you rephrase that? or tell me:\n\n• how are you feeling right now?\n• what's been on your mind?\n\ni'm better with emotional/wellness topics!",
    ];
    return pick(defaults);
  };

  const send = async (override) => {
    const text = override || input.trim();
    if (!text || loading) return;
    const um = { role: "user", content: text };
    const upd = [...msgs, um];
    setMsgs(upd);
    setInput("");
    setLoading(true);
    try {
      const catalog = {
        games: GAMES.map((g) => ({ id: g.id, name: g.name, desc: g.desc })),
        resources: RESOURCES.map((r) => ({ id: r.id, title: r.title, tag: r.tag, desc: r.desc })),
        experts: EXPERTS.map((e) => ({ id: String(e.id), name: e.name, specialty: e.specialty })),
      };
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: upd, userName: user.name, checkScore, checkContext, catalog }),
      });
      if (!res.ok) throw new Error("api error");
      const data = await res.json();
      const assistantMsg = {
        role: "assistant",
        content: data.replyText || data.reply || "hmm, something went wrong on my end. try again? 💜",
        recs: data.recommendations || { games: [], resources: [], experts: [] },
        safety: data.safety,
      };
      setMsgs([...upd, assistantMsg]);
    } catch (e) {
      console.error("API failed, using local fallback:", e);
      const delay = 800 + Math.random() * 1200;
      await new Promise((r) => setTimeout(r, delay));
      const reply = generateResponse(text);
      setMsgs([...upd, { role: "assistant", content: reply, recs: { games: [], resources: [], experts: [] } }]);
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 65px)" }}>
      <div style={{ padding: "12px 20px", borderBottom: `1px solid ${T.border}`, background: T.panel, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg,${T.accent},#ec4899)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
            🧠
          </div>
          <div style={{ position: "absolute", bottom: 1, right: 1, width: 9, height: 9, borderRadius: "50%", background: T.green, border: `2px solid ${T.panel}` }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>MannSaathi</div>
          <div style={{ fontSize: 11, color: T.green }}>online · always here</div>
        </div>
        <button
          onClick={() => openGame(null)}
          style={{ padding: "7px 14px", background: `${T.accent}22`, border: `1px solid ${T.accent}55`, borderRadius: 16, color: T.a2, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
          title="Open Games"
        >
          🎮 Games
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 8 }}>
            {m.role === "assistant" && (
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${T.accent},#ec4899)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                🧠
              </div>
            )}
            <div
              style={{
                maxWidth: "74%",
                padding: "11px 15px",
                borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: m.role === "user" ? `linear-gradient(135deg,${T.accent},#7c3aed)` : T.card,
                border: m.role === "user" ? "none" : `1px solid ${T.border}`,
                fontSize: 14,
                lineHeight: 1.7,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: T.text,
              }}
            >
              <div>{m.content}</div>
              {m.role === "assistant" && m.recs &&
                (() => {
                  const games = Array.isArray(m.recs.games) ? m.recs.games : [];
                  const resources = Array.isArray(m.recs.resources) ? m.recs.resources : [];
                  const experts = Array.isArray(m.recs.experts) ? m.recs.experts : [];
                  const hasAny = games.length || resources.length || experts.length;
                  if (!hasAny) return null;

                  const resolveId = (item) => (typeof item === "string" ? item : item?.id);
                  const resolveWhy = (item) => (typeof item === "string" ? "" : item?.why || "");
                  const gameById = Object.fromEntries(GAMES.map((g) => [g.id, g]));
                  const resourceById = Object.fromEntries(RESOURCES.map((r) => [r.id, r]));
                  const expertById = Object.fromEntries(EXPERTS.map((e) => [String(e.id), e]));

                  const pillBtn = {
                    padding: "5px 12px",
                    background: `${T.accent}14`,
                    border: `1px solid ${T.accent}33`,
                    borderRadius: 16,
                    color: T.a2,
                    fontSize: 11,
                    cursor: "pointer",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  };
                  const whyStyle = { fontSize: 11, color: T.muted, marginTop: 4, lineHeight: 1.5 };

                  return (
                    <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px dashed ${T.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ fontSize: 11, color: T.muted, fontWeight: 700 }}>recommended for you</div>

                      {games.length > 0 && (
                        <div>
                          <div style={{ fontSize: 11, color: T.muted, marginBottom: 6 }}>🎮 games</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {games.slice(0, 2).map((gItem, idx) => {
                              const id = resolveId(gItem);
                              const g = gameById[id];
                              if (!g) return null;
                              const why = resolveWhy(gItem);
                              return (
                                <div key={id + ":" + idx} style={{ display: "flex", flexDirection: "column" }}>
                                  <button style={pillBtn} onClick={() => openGame(g.id)}>
                                    {g.icon} {g.name}
                                  </button>
                                  {why && <div style={whyStyle}>{why}</div>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {resources.length > 0 && (
                        <div>
                          <div style={{ fontSize: 11, color: T.muted, marginBottom: 6 }}>📚 resources</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {resources.slice(0, 2).map((rItem, idx) => {
                              const id = resolveId(rItem);
                              const r = resourceById[id];
                              if (!r) return null;
                              const why = resolveWhy(rItem);
                              return (
                                <div key={id + ":" + idx} style={{ display: "flex", flexDirection: "column" }}>
                                  <button style={pillBtn} onClick={() => setScreen?.("resources")}>
                                    {r.icon} {r.title}
                                  </button>
                                  {why && <div style={whyStyle}>{why}</div>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {experts.length > 0 && (
                        <div>
                          <div style={{ fontSize: 11, color: T.muted, marginBottom: 6 }}>🩺 experts</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {experts.slice(0, 1).map((eItem, idx) => {
                              const id = resolveId(eItem);
                              const ex = expertById[id];
                              if (!ex) return null;
                              const why = resolveWhy(eItem);
                              return (
                                <div key={id + ":" + idx} style={{ display: "flex", flexDirection: "column" }}>
                                  <button style={pillBtn} onClick={() => setScreen?.("experts")}>
                                    {ex.avatar} {ex.name}
                                  </button>
                                  {why && <div style={whyStyle}>{why}</div>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
            </div>
            {m.role === "user" && (
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.card, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>
                {user.avatar}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${T.accent},#ec4899)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
              🧠
            </div>
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: "18px 18px 18px 4px", padding: "12px 16px", display: "flex", gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: T.a2, animation: `bop 1s ${i * 0.18}s infinite ease-in-out` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={chatEnd} />
      </div>

      {/* Game quick-launch row */}
      <div style={{ padding: "8px 16px", borderTop: `1px solid ${T.border}22`, display: "flex", gap: 8, overflowX: "auto", flexShrink: 0, scrollbarWidth: "none", alignItems: "center" }}>
        <span style={{ color: T.muted, fontSize: 11, flexShrink: 0 }}>🎮</span>
        {GAMES.map((g) => (
          <button
            key={g.id}
            onClick={() => openGame(g.id)}
            style={{ whiteSpace: "nowrap", padding: "5px 12px", background: `${g.col}18`, border: `1px solid ${g.col}44`, borderRadius: 16, color: g.col, fontSize: 11, cursor: "pointer", flexShrink: 0, fontWeight: 600, transition: "all 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = `${g.col}30`)}
            onMouseLeave={(e) => (e.currentTarget.style.background = `${g.col}18`)}
          >
            {g.icon} {g.name}
          </button>
        ))}
      </div>

      <div style={{ padding: "6px 16px", display: "flex", gap: 8, overflowX: "auto", flexShrink: 0, scrollbarWidth: "none" }}>
        {QUICK.map((q) => (
          <button
            key={q.label}
            onClick={() => send(q.msg)}
            style={{ whiteSpace: "nowrap", padding: "6px 13px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, color: T.muted, fontSize: 12, cursor: "pointer", flexShrink: 0, transition: "all 0.2s" }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = T.accent;
              e.target.style.color = T.text;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = T.border;
              e.target.style.color = T.muted;
            }}
          >
            {q.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "10px 16px 14px", borderTop: `1px solid ${T.border}`, background: T.panel, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", maxWidth: 800, margin: "0 auto" }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="share what's on your mind... 💬"
            rows={1}
            style={{ flex: 1, padding: "11px 16px", background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 22, color: T.text, fontSize: 14, outline: "none", fontFamily: "inherit", resize: "none", lineHeight: 1.5, maxHeight: 100, overflowY: "auto" }}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{ width: 44, height: 44, borderRadius: "50%", background: loading || !input.trim() ? T.border : `linear-gradient(135deg,${T.accent},#ec4899)`, border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}
          >
            🚀
          </button>
        </div>
        <p style={{ textAlign: "center", color: T.muted, fontSize: 11, marginTop: 8 }}>
          MannSaathi is an AI companion. In crisis? Call a local helpline or emergency services.
        </p>
      </div>
    </div>
  );
}
