import { fetch } from "undici";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { accounts, key } from "@/constant";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});


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
    // const clicks = Number(await redis.get("emmieGraySnapClickCount")) || 0;
    // const index = Number(await redis.get("emmieGraySnapCurrentIndex")) || 0;
    // // const savedAccounts = await redis.get("activeAccounts");
    // const savedAccounts = await redis.get("emmieGraySnapActiveAccounts");
    const previousModelData = await redis.hgetall(key);
    // console.log("Previous Model Data :: ", previousModelData);
    const clicks = Number(previousModelData?.clicks) || 0;
    const index = Number(previousModelData?.index) || 0;
    const savedAccounts = previousModelData?.activeAccounts ? previousModelData.activeAccounts : [];
    const activeAccounts = savedAccounts ? savedAccounts : [];

    // console.log("Current Index :: ", index);
    // let activeAccounts = await getActiveAccounts();
    // activeAccounts = activeAccounts ? activeAccounts : [];
    return NextResponse.json({
        debug: true,
        clicks,
        index,
        accounts: previousModelData.accounts,
        activeAccount: previousModelData.activeAccount || null,
        totalActive: activeAccounts.length,
        activeAccounts: previousModelData.activeAccounts
    });
}

// ✅ POST handler
export async function POST() {
    // checking active accounts
    const activeAccounts = await getActiveAccounts();
    const updatedAccounts = accounts.map((account) => {
        if (activeAccounts.includes(account)) {
            return { status: "active", account };
        } else {
            return { status: "inactive", account };
        }
    })
    if (activeAccounts.length === 0) {
        return NextResponse.json({ error: "No active accounts found" }, { status: 500 });
    }
    const previousModelData = await redis.hgetall(key);
    // console.log("Previous Active Accounts :: ", previousModelData);
    // const previous = await redis.get("emmieGraySnapActiveAccounts");
    const prevList = previousModelData?.activeAccounts ? previousModelData?.activeAccounts : [];
    let clicks = Number(previousModelData?.clicks) || 0;
    let index = Number(previousModelData?.index) || 0;

    // let clicks = Number(await redis.get("emmieGraySnapClickCount")) || 0;
    // let index = Number(await redis.get("emmieGraySnapCurrentIndex")) || 0;

    // console.log(JSON.stringify(prevList) !== JSON.stringify(activeAccounts));
    if (JSON.stringify(prevList) !== JSON.stringify(activeAccounts)) {
        // await redis.set("activeAccounts", JSON.stringify(activeAccounts));
        // await redis.hset("emmieGraySnapActiveAccounts", JSON.stringify(activeAccounts));
        await redis.hset(key, {
            activeAccounts: activeAccounts,
            activeAccount: activeAccounts[0],
            clicks: 0,
            index: 0,
            accounts: updatedAccounts
        });
        index = 0;
        clicks = 0;
    }

    clicks++;

    if (clicks >= 50) {
        index = (index + 1) % activeAccounts.length;
        clicks = 0;
    }
    await redis.hset(key, {
        clicks: clicks,
        index: index,
        accounts: updatedAccounts,
        activeAccounts: activeAccounts,
        activeAccount: activeAccounts[index],
    });
    // await redis.set("emmieGraySnapClickCount", clicks);
    // await redis.set("emmieGraySnapCurrentIndex", index);

    return NextResponse.json({
        accounts: updatedAccounts,
        clicks,
        index,
        totalActive: activeAccounts.length,
        activeAccounts: activeAccounts,
        activeAccount: activeAccounts[index],
    });
}
