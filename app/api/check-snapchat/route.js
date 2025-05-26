import { accounts, key } from "@/constant";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
export async function GET(req, res) {
    const updatedAccounts = [];
    let previousData = await redis.hgetall(key);
    for (const account of accounts) {
        try {
            const response = await fetch(`https://www.snapchat.com/add/${account}`);
            const html = await response.text();

            if (html.includes('snapcode') || html.includes('Add me on Snapchat')) {
                updatedAccounts.push({
                    status: "active",
                    account
                });
            } else {
                updatedAccounts.push({
                    status: "inactive",
                    account
                });
            }
        } catch (e) {
            continue;
        }
    }
    const activeAccounts = updatedAccounts.filter(account => account.status == "active").map(account => account.account);
    // console.log("Accounts ==> ", updatedAccounts);
    // console.log("Active Accounts ==> ", activeAccounts);
    await redis.hset(key, {
        ...previousData,
        activeAccounts
    })
    if (activeAccounts.length === 0) {
        return NextResponse.json({ error: 'No active accounts' }, { status: 404 });
    }
    return NextResponse.json({ accounts: updatedAccounts, activeAccount: previousData.activeAccounts[previousData.index] });
}