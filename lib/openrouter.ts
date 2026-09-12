export async function askAI(prompt: string) {
  console.log("KEY VALUE:", process.env.OPENROUTER_API_KEY);
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("OpenRouter Error:", data);
    throw new Error("API Failed");
  }

  return data.choices[0].message.content;
}