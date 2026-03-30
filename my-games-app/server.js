const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = (
  process.env.GROQ_API_KEY ??
  process.env.GROQ_API_KEYS ??
  ""
).trim();

function parseModelJson(content) {
  if (typeof content !== "string" || !content.trim()) return null;
  const trimmed = content.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    // Sometimes models wrap JSON with extra text. Try best-effort extraction.
    const firstBrace = trimmed.indexOf("{");
    const lastBrace = trimmed.lastIndexOf("}");
    if (firstBrace >= 0 && lastBrace > firstBrace) {
      const candidate = trimmed.slice(firstBrace, lastBrace + 1);
      try {
        return JSON.parse(candidate);
      } catch {
        return null;
      }
    }
    return null;
  }
}

app.post("/api/chat", async (req, res) => {
  try {
    if (!GROQ_API_KEY) {
      return res.status(500).json({
        error: "missing GROQ API key (set GROQ_API_KEY or GROQ_API_KEYS in env/.env)",
      });
    }

    const { messages, userName, checkScore, checkContext, catalog } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array" });
    }

    const safeUserName = (userName ?? "friend").toString().slice(0, 80);
    const score = Number.isFinite(Number(checkScore)) ? Number(checkScore) : null;
    const ctx =
      checkContext && typeof checkContext === "object"
        ? {
            testId: typeof checkContext.testId === "string" ? checkContext.testId.slice(0, 40) : undefined,
            max: Number.isFinite(Number(checkContext.max)) ? Number(checkContext.max) : undefined,
            title: typeof checkContext.title === "string" ? checkContext.title.slice(0, 80) : undefined,
          }
        : null;

    const gameCatalog = Array.isArray(catalog?.games) ? catalog.games : [];
    const expertCatalog = Array.isArray(catalog?.experts) ? catalog.experts : [];
    const resourceCatalog = Array.isArray(catalog?.resources) ? catalog.resources : [];

    const systemPrompt = `You are MannSaathi — a warm, empathetic, Gen-Z-friendly mental wellness companion chatbot. You talk like a close best friend — always informal, never robotic or corporate.

CORE IDENTITY:
- Name: MannSaathi (meaning "mind companion" in Hindi)
- Tone: ALWAYS casual, warm, informal, supportive. Talk like texting a close friend — lowercase, emoji sometimes, short sentences, Gen-Z slang when natural
- The user's name is "${safeUserName}" — use it often to feel personal and warm
- NEVER address the user as "client", "user", "customer", "patient" or any formal term. They are your FRIEND. Use their name or "dude", "buddy", "yaar", "bro" etc.

CAPABILITIES (mention these when relevant):
- 💬 Emotional support and advice on stress, anxiety, sadness, relationships, motivation, anger, loneliness
- 🎮 6 fun stress-relief games (Memory Match, Breathing Bubble, MindWord, Color Clash, Chill Snake, MindTiles)
- 📋 Self-check wellness questionnaire (GAD-7 + PHQ-9)
 - 📋 Self-check wellness tests
- 📚 Mental health resources and helplines
- 🩺 Expert psychologists available for appointments

BEHAVIOR RULES:
1. ALWAYS be informal and friendly. Never sound like a therapist or customer service agent. Sound like a caring bestie.
2. For crisis/self-harm mentions, IMMEDIATELY provide crisis helplines:
   📞 India: iCall — 9152987821, Vandrevala Foundation — 1860-2662-345, AASRA — 9820466726
3. When users mention world events (wars, conflicts, disasters, political issues like Iran, Ukraine, Gaza etc.), engage empathetically — discuss the topic knowledgeably, discuss how these events affect mental health, offer coping strategies, acknowledge their feelings. Do NOT dismiss or redirect.
4. For general knowledge questions, share what you know naturally while also connecting to how the user might be feeling
5. Never be dismissive. Never say "I can't help with that" or "I'm not Google" or "that's outside my expertise"
6. Keep responses concise but meaningful — typically 3-6 sentences, use line breaks for readability
7. Suggest games, self-check, or experts tab when appropriate (not every message)
8. For jokes/humor requests, tell actual unique funny jokes — NEVER repeat the same joke twice in a conversation
9. Remember conversation context — reference things they've said earlier
10. You can discuss ANY topic — you are not limited to just mental health. Be a well-rounded conversationalist.

FORMATTING:
- Use lowercase always (no capital letters except emphasis)
- Use emoji naturally but not in every sentence
- Break long responses into short paragraphs with line breaks
- Use bullet points (•) for lists
- Sound like a text message from a friend, NOT a formal article

CRITICAL OUTPUT FORMAT (must follow exactly):
- Output MUST be a single raw JSON object and nothing else (no markdown, no extra text).
- JSON keys must use double quotes. Do not include trailing commas.

JSON schema:
{
  "replyText": string,
  "recommendations": {
    "games": [{"id": string, "why": string}],
    "resources": [{"id": string, "why": string}],
    "experts": [{"id": string, "why": string}]
  },
  "safety": {"level": "ok"|"watch"|"crisis", "message": string}
}

Recommendation rules:
- Recommend 0-2 games, 0-2 resources, 0-1 experts (keep it small).
- Only use IDs from the catalogs provided below. If unsure, recommend nothing.
- "why" should be short (one sentence).

User self-check score: ${score === null ? "unknown" : score}
User self-check context: ${ctx ? JSON.stringify(ctx) : "unknown"}

Allowed catalogs (IDs you may recommend):
games: ${JSON.stringify(gameCatalog)}
resources: ${JSON.stringify(resourceCatalog)}
experts: ${JSON.stringify(expertCatalog)}`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + GROQ_API_KEY,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        temperature: 0.9,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq API error:", response.status, err);
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const modelContent = data.choices?.[0]?.message?.content || "";

    const parsed = parseModelJson(modelContent);
    if (parsed && typeof parsed === "object") {
      const replyText = typeof parsed.replyText === "string" && parsed.replyText.trim()
        ? parsed.replyText
        : "hmm, something went wrong on my end. try again? 💜";

      const recommendations = typeof parsed.recommendations === "object" && parsed.recommendations
        ? parsed.recommendations
        : { games: [], resources: [], experts: [] };

      const safety = typeof parsed.safety === "object" && parsed.safety
        ? parsed.safety
        : { level: "ok", message: "" };

      return res.json({
        reply: replyText, // backward-compatible field
        replyText,
        recommendations,
        safety,
      });
    }

    const reply = modelContent || "hmm, something went wrong on my end. try again? 💜";
    res.json({ reply, replyText: reply, recommendations: { games: [], resources: [], experts: [] }, safety: { level: "ok", message: "" } });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "server error" });
  }
});

// Serve CRA build for single-server deployment
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ MannSaathi API proxy running on http://localhost:${PORT}`);
});
