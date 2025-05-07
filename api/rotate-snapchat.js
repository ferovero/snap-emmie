import { fetch } from "undici";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  console.log("✅ API spuštěno");

  // 📌 DEBUG INFO pro GET požadavek (z prohlížeče)
if (req.method === "GET") {
  const clicks = Number(await redis.get("clickCount")) || 0;
  const index = Number(await redis.get("currentIndex")) || 0;

  const accounts = [
    "jjrsweert",
    "rossiekk",
    "singh-raja",
    "jakebsweet",
  ];

const activeAccounts = await Promise.all(
  accounts.map(async (username) => {
    try {
      const res = await fetch(`https://www.snapchat.com/add/${username}`);
      const html = await res.text();
      if (html.includes("snapcode") || html.includes("Add me on Snapchat")) {
        return username;
      }
    } catch {}
    return null;
  })
);

const filteredAccounts = activeAccounts.filter(Boolean);

  const currentAccount = filteredAccounts[index] || null;

  return res.status(200).json({
    debug: true,
    clicks,
    index,
    account: currentAccount,
    totalActive: activeAccounts.length,
    activeAccounts
  });
}

  if (req.method !== "POST") {
    console.warn("❌ Špatná metoda:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const accounts = [
    "jjrsweert",
    "rossiekk",
    "singh-raja",
    "jakebsweet",
  ];

  const activeAccounts = [];

  for (const username of accounts) {
    try {
      const response = await fetch(`https://www.snapchat.com/add/${username}`);
      const html = await response.text();
      if (html.includes("snapcode") || html.includes("Add me on Snapchat")) {
        activeAccounts.push(username);
      }
    } catch (err) {
      console.error(`⚠️ Chyba při kontrole účtu ${username}:`, err.message);
      continue;
    }
  }

  console.log("🔁 Aktivní účty:", activeAccounts);

  if (activeAccounts.length === 0) {
    console.error("❌ Žádné aktivní účty!");
    return res.status(500).json({ error: "No active accounts found" });
  }

  const clicksKey = "clickCount";
  const indexKey = "currentIndex";

  try {
    let clicks = Number(await redis.get(clicksKey)) || 0;
    let index = Number(await redis.get(indexKey)) || 0;

    clicks++;

    if (clicks >= 50) {
      index = (index + 1) % activeAccounts.length;
      clicks = 0;
      await redis.set(indexKey, index);
    }

    await redis.set(clicksKey, clicks);

    console.log("✅ Vrací účet:", activeAccounts[index]);

    return res.status(200).json({
      account: activeAccounts[index],
      clicks,
      index,
      totalActive: activeAccounts.length,
    });
  } catch (err) {
    console.error("❌ Chyba při práci s Redis:", err.message);
    return res.status(500).json({ error: "Redis error" });
  }
}
