export async function onRequest(context) {
  try {
    const { request, env } = context;

    if (request.method !== "POST") {
      return new Response("OK", { status: 200 });
    }

    if (!env || !env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "API key missing" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || !body.message) {
      return new Response(
        JSON.stringify({ error: "Invalid body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: body.message }
        ]
      })
    });

    const data = await res.json();

    return new Response(
      JSON.stringify({ reply: data.choices?.[0]?.message?.content || "No reply" }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    // ⛑️ PALING PENTING: jangan biarkan crash
    return new Response(
      JSON.stringify({ error: "Function crash", detail: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
