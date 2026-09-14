/* ==========================================================================
   FLOWSOLVE PROXY — Cloudflare Worker
   Thin, transparent proxy: the browser sends the SAME {contents,
   generationConfig} body it used to send straight to Gemini, this Worker
   just attaches the real API key (kept server-side, in a Worker Secret,
   never shipped to the browser) and forwards the call. No visitor ever
   needs their own key.
   ========================================================================== */

export default {
  async fetch(request, env) {
    // ALLOWED_ORIGINS is a comma-separated list, set as a plain Worker
    // environment Variable (not a Secret) — e.g. "https://asuir.org,https://www.asuir.org".
    // Set it to "*" temporarily while testing if you like, then lock it
    // down once the real domain is confirmed.
    const allowedOrigins = (env.ALLOWED_ORIGINS || 'https://asuir.org').split(',').map(s => s.trim());
    const origin = request.headers.get('Origin') || '';
    const originAllowed = allowedOrigins.includes(origin) || allowedOrigins.includes('*');

    const corsHeaders = {
      'Access-Control-Allow-Origin': originAllowed ? (allowedOrigins.includes('*') ? '*' : origin) : 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (!originAllowed) {
      return new Response(JSON.stringify({ error: 'ORIGIN_NOT_ALLOWED' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'BAD_JSON_BODY' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // GEMINI_API_KEY must be set as a Worker SECRET (Settings -> Variables
    // and Secrets -> Add -> Secret), never as a plain Variable, so it is
    // never readable from outside the Worker.
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'SERVER_NOT_CONFIGURED' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    let geminiRes;
    try {
      geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'UPSTREAM_UNREACHABLE', detail: String(e) }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const text = await geminiRes.text();
    return new Response(text, {
      status: geminiRes.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};