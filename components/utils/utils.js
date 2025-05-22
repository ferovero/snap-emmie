
export async function fetchGeo(ip) {
    let result = { city: "", country: "", code: "", flag: "" };
    // console.log("🌍 Fetching geo...");
    try {
        const res = await fetch(
            "https://ipwho.is/?ip=" + ip
            , {
                cache: "no-store"
            });
        const data = await res.json();
        const city = data.city || "";
        const country = data.country || "";
        const code = data.country_code || "";
        const flag = code
            ? Array.from(code.toUpperCase())
                .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
                .join("")
            : "";
        result = { city, country, code, flag };
    } catch {
        try {
            const res = await fetch(
                `https://api.ipgeolocation.io/ipgeo?apiKey=5076f56f239a41b5bdb0d1a4ab911ebb&ip=${ip}`,
                {
                    cache: "no-store"
                }
            );
            const data = await res.json();
            const city = data.city || "";
            const country = data.country_name || "";
            const code = data.country_code2 || "";
            const flag = code
                ? Array.from(code.toUpperCase())
                    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
                    .join("")
                : "";
            result = { city, country, code, flag };
        } catch (e) {
            console.warn("❌ Geo selhalo:", e);
        }
    }
    // console.log("🌍 Geo:", result);
    return result;
}

export async function updateSnapchatLink(fullUrl) {
    let result = "";
    console.log("🔗 Fetching Snapchat fullUrl link :: ", fullUrl);
    try {
        const res = await fetch(`${fullUrl}/api/rotate-snapchat`, { method: "POST", cache: "no-store" });
        const data = await res.json();
        if (data.account) {
            // const el = document.getElementById("snapchat-link");
            // if (el) {
            //     el.setAttribute("href", `https://www.snapchat.com/add/${data.account}`);
            //     console.log(`🔗 Nastaven účet: ${data.account}`);
            // }
            result = data;
        }
    } catch (e) {
        console.error("Chyba rotate-snapchat:", e);
    }
    return result;
}
