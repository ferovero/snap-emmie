import { fetch } from "undici";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// const redis = new Redis({
//     url: process.env.UPSTASH_REDIS_REST_URL,
//     token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

const redis = new Redis({
    url: 'https://hardy-drake-15161.upstash.io',
    token: 'ATs5AAIjcDFjMjgyNWI1NmNhYmQ0ZGVmYTAxNWZiNDFlOTMxM2I5YnAxMA',
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
            } catch {
                // ignore error
            }
            return null;
        })
    );
    return results.filter(Boolean);
}

// ✅ GET handler
export async function GET() {
    const clicks = Number(await redis.get("clickCount")) || 0;
    const index = Number(await redis.get("currentIndex")) || 0;
    const savedAccounts = await redis.get("activeAccounts");
    console.log("savedAccounts", savedAccounts);
    const activeAccounts = savedAccounts ? savedAccounts : [];

    return NextResponse.json({
        debug: true,
        clicks,
        index,
        account: activeAccounts[index] || null,
        totalActive: activeAccounts.length,
        activeAccounts,
    });
}

// ✅ POST handler
export async function POST() {
    const activeAccounts = await getActiveAccounts();

    if (activeAccounts.length === 0) {
        return NextResponse.json({ error: "No active accounts found" }, { status: 500 });
    }

    const previous = await redis.get("activeAccounts");
    const prevList = previous ? previous : [];

    let clicks = Number(await redis.get("clickCount")) || 0;
    let index = Number(await redis.get("currentIndex")) || 0;

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

    return NextResponse.json({
        account: activeAccounts[index],
        clicks,
        index,
        totalActive: activeAccounts.length,
    });
}
