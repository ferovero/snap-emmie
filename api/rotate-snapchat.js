import { fetch } from "undici";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const accounts = ["jjrsweert", "rossiekk", "singh-raja", "jakebsweet"];

async function getActiveAccounts() {
  const results = await Promise.all(
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
  return results.filter(Boolean);
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const clicks = Number(await redis.get("clickCount")) || 0;
    const index = Number(await redis.get("currentIndex")) || 0;
    const savedAccounts = await redis.get("activeAccounts");
    const activeAccounts = savedAccounts ? JSON.parse(savedAccounts) : [];

    return res.status(200).json({
      debug: true,
      clicks,
      index,
      account: activeAccounts[index] || null,
      totalActive: activeAccounts.length,
      activeAccounts
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const activeAccounts = await getActiveAccounts();

  if (activeAccounts.length === 0) {
    return res.status(500).json({ error: "No active accounts found" });
  }

  const previous = await redis.get("activeAccounts");
  const prevList = previous ? JSON.parse(previous) : [];

  let clicks = Number(await redis.get("clickCount")) || 0;
  let index = Number(await redis.get("currentIndex")) || 0;

  // Pokud se seznam změnil, resetuj index
  if (JSON.stringify(prevList) !== JSON.stringify(activeAccounts)) {
    await redis.set("activeAccounts", JSON.stringify(activeAccounts));
    index = 0;
    clicks = 0;
  }

  clicks++;

  if (clicks >= 50) {
    index = (index + 1) % activeAccounts.length;
    clicks = 0;
  }

  await redis.set("clickCount", clicks);
  await redis.set("currentIndex", index);

  return res.status(200).json({
    account: activeAccounts[index],
    clicks,
    index,
    totalActive: activeAccounts.length,
  });
}
