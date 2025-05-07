import { fetch } from "undici";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const accounts = [
  "jjrsweert",
  "rossiekk",
  "singh-raja",
  "jakebsweet",
];

// Funkce pro získání aktivních účtů
async function getActiveAccounts() {
  const activeAccounts = [];

  for (const username of accounts) {
    try {
      const response = await fetch(`https://www.snapchat.com/add/${username}`);
      const html = await response.text();
      if (html.includes("snapcode") || html.includes("Add me on Snapchat")) {
        activeAccounts.push(username);
      }
    } catch (err) {
      console.error(`Chyba při kontrole účtu ${username}:`, err.message);
    }
  }

  return activeAccounts;
}

export default async function handler(req, res) {
  console.log("✅ API spuštěno");

  if (req.method === "GET") {
    const clicks = Number(await redis.get("clickCount")) || 0;
    const index = Number(await redis.get("currentIndex")) || 0;
    const activeAccountsJSON = await redis.get("activeAccounts");
    const activeAccounts = activeAccountsJSON ? JSON.parse(activeAccountsJSON) : [];

    const currentAccount = activeAccounts[index] || null;

    return res.status(200).json({
      debug: true,
      clicks,
      index,
      account: currentAccount,
      totalActive: activeAccounts.length,
      activeAccounts,
    });
  }

  if (req.method !== "POST") {
    console.warn("❌ Špatná metoda:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const newActiveAccounts = await getActiveAccounts();

  if (newActiveAccounts.length === 0) {
    console.error("❌ Žádné aktivní účty!");
    return res.status(500).json({ error: "No active accounts found" });
  }

  const clicksKey = "clickCount";
  const indexKey = "currentIndex";

  try {
    const oldActiveAccountsJSON = await redis.get("activeAccounts");
    const oldActiveAccounts = oldActiveAccountsJSON ? JSON.parse(oldActiveAccountsJSON) : [];

    let clicks = Number(await redis.get(clicksKey)) || 0;
    let index = Number(await redis.get(indexKey)) || 0;

    // Pokud se seznam aktivních účtů změnil, aktualizuj ho a resetuj index
    if (JSON.stringify(newActiveAccounts) !== JSON.stringify(oldActiveAccounts)) {
      await redis.set("activeAccounts", JSON.stringify(newActiveAccounts));
      index = 0;
      clicks = 0;
      await redis.set(indexKey, index);
    }

    clicks++;

    if (clicks >= 50) {
      index = (index + 1) % newActiveAccounts.length;
      clicks = 0;
      await redis.set(indexKey, index);
    }

    await redis.set(clicksKey, clicks);

    console.log("✅ Vrací účet:", newActiveAccounts[index]);

    return res.status(200).json({
      account: newActiveAccounts[index],
      clicks,
      index,
      totalActive: newActiveAccounts.length,
    });
  } catch (err) {
    console.error("❌ Chyba při práci s Redis:", err.message);
    return res.status(500).json({ error: "Redis error" });
  }
}
