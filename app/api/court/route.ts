import { askAI } from "@/lib/openrouter";
import { judgePrompt, defenderPrompt, attackerPrompt } from "@/lib/prompts";

export async function POST(req: Request) {
  const body = await req.json();
  const { query, followUp } = body;

  try {
    if (followUp) {
      const extra = await askAI(
        `Continue giving more insights for ${followUp} role on: ${query}`
      );

      return Response.json({
        [followUp]: extra
      });
    }

    const [judge, defender, attacker] = await Promise.all([
      askAI(judgePrompt(query)),
      askAI(defenderPrompt(query)),
      askAI(attackerPrompt(query))
    ]);

    return Response.json({ judge, defender, attacker });

  } catch (err) {
    return Response.json({ error: "Error occurred" }, { status: 500 });
  }
}