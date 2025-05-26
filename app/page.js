import SnapChatButtonClickRotation from "@/components/SnapChatButtonClickRotation";
import { fetchGeo, updateSnapchatLink } from "@/components/utils/utils";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
    const headersList = headers();
    const ip =
        headersList.get("x-forwarded-for")?.split(",")[0] ||
        "0.0.0.0";
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const host = headersList.get("host"); // e.g., your-app.vercel.app
    const fullUrl = `${protocol}://${host}`;
    console.log("🔗 Base fullUrl URL :: ", fullUrl);
    console.log("🌍 Fetching geo...");

    const geo = await fetchGeo(ip);
    const updatedSnapchatRotation = await updateSnapchatLink(fullUrl);
    console.log("updatedSnapchatRotation :: ", updatedSnapchatRotation);
    return (
        <main>
            <div className="w-box cyipvbi c1xeui1q czmyur c7eym0q c1ue03rr">
                <div className="w-box cro90au chzrggh c7cc2bz cnxa9gv cix9mad">
                    <img
                        alt=""
                        src="/assets/adrian-infernus-GLf7bAwCdYg-unsplash_7MwisksO2l7AB6eunlQvj.jpg"
                        className="w-image carjqp0 clscpyb cbsykgd cghbf65 c7b19sd"
                        sizes="(min-width: 1280px) 50vw, 100vw"
                        srcSet="
            /assets/adrian-infernus-GLf7bAwCdYg-unsplash_7MwisksO2l7AB6eunlQvj.jpg  384w,
            /assets/adrian-infernus-GLf7bAwCdYg-unsplash_7MwisksO2l7AB6eunlQvj.jpg  640w,
            /assets/adrian-infernus-GLf7bAwCdYg-unsplash_7MwisksO2l7AB6eunlQvj.jpg  750w,
            /assets/adrian-infernus-GLf7bAwCdYg-unsplash_7MwisksO2l7AB6eunlQvj.jpg  828w,
            /assets/adrian-infernus-GLf7bAwCdYg-unsplash_7MwisksO2l7AB6eunlQvj.jpg 1080w,
            /assets/adrian-infernus-GLf7bAwCdYg-unsplash_7MwisksO2l7AB6eunlQvj.jpg 1200w,
            /assets/adrian-infernus-GLf7bAwCdYg-unsplash_7MwisksO2l7AB6eunlQvj.jpg 1920w,
            /assets/adrian-infernus-GLf7bAwCdYg-unsplash_7MwisksO2l7AB6eunlQvj.jpg 2048w,
            /assets/adrian-infernus-GLf7bAwCdYg-unsplash_7MwisksO2l7AB6eunlQvj.jpg 3840w
          "
                        decoding="async"
                        loading="lazy"
                    />
                </div>
                <div
                    className="w-box ch52f6l cxnwabk ct3llrj cpfea1d c1tg7kyf c1yp33pv cl6onog c1mykqmw c1j34mkn cbb649g c1l9zozb c13aupyd ch0smcm c1rj9zhw cosd95r c2tdt1j c1ue03rr c1ccx8za c1v31wlf"
                >
                    <div className="w-box cpfea1d c1j34mkn cbb649g cyah3ou cmfw54z">
                        <div
                            className="w-box c2qv4r3 c1rgto2x c1hhqkfx c1ug851f c1eoaov8 cinhzvn c1i0f0jo c1vbxcsq c13aupyd"
                        >
                            <img
                                alt=""
                                width="600"
                                height="600"
                                src="/assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png"
                                className="w-image carjqp0 clscpyb cven7yl"
                                sizes="100vw"
                                srcSet="
                /assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png   16w,
                /assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png   32w,
                /assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png   48w,
                /assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png   64w,
                /assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png   96w,
                /assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png  128w,
                /assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png  256w,
                /assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png  384w,
                /assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png  640w,
                /assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png  750w,
                /assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png  828w,
                /assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png 1080w,
                /assets/Screenshot_2025-04-25_at_19.58.48_xww2U5s5ewMvDZBqqR8JD_3201q--K1xayDsuUWYzBR.png 1200w
              "
                                decoding="async"
                                loading="lazy"
                            />
                        </div>
                        <div className="w-box cpfea1d c1559qbf cbb649g c1l9zozb cltrnrx cidhgp8">
                            <div className="w-box c1u38zco c1iapu3e">
                                <h1 className="w-heading cabr08a c1fpwhyl c131ga1t c7nknhz czowava">
                                    Emmie Grey
                                </h1>
                            </div>
                            <div
                                className="w-text cuj013g c1tgvtap c1nfxh2l c1lfke00 c194qkbo c1cfs4en czowava c11pzes6 cwc2sj9 cj5g4ef"
                            >
                                🟢 Online Now
                            </div>
                        </div>
                        <div className="w-box cpfea1d c10i6s3m csc1n6w c10lgpb0 c73prjs">
                            <div className="w-text czowava">Personal trainer in</div>
                            <span data-ws-tag="span" id="city" className="w-text czowava">{geo.city}{geo.flag}</span>{","}
                            <div className="w-text czowava">Dubai 🇦🇪 and Ealing 🇬🇧</div>
                            <div className="w-text czowava">
                                I&#x27;m obsessed with hugs, travel and fittness 💪🏝️❤️.
                            </div>
                        </div>
                    </div>
                    <div className="w-box cn6qthi cyah3ou cmfw54z cpfea1d c1j34mkn">
                        <Link
                            id="snapchat-link"
                            className="w-link carjqp0 c1hhqkfx c1ug851f c1eoaov8 cinhzvn c11jcwdk c1c3pl87 ca2i7zn c1eh6794 czmyur c1qqq93e cpfea1d cbb649g c1l9zozb c1559qbf c193ox4 c1gnp4fx c1iwnuf5 co27vbx cp86yl0 c1p0htba c1ccx8za c1v31wlf"
                            href={`https://www.snapchat.com/add/${updatedSnapchatRotation?.activeAccount}`}
                        ><img
                                alt=""
                                width="30"
                                height="40"
                                src="/assets/snapchat-logo_d4KiDFGpEZ4-3hgSCY1gj.png"
                                className="w-image"
                                sizes="100vw"
                                srcSet="
                /assets/snapchat-logo_d4KiDFGpEZ4-3hgSCY1gj.png 16w,
                /assets/snapchat-logo_d4KiDFGpEZ4-3hgSCY1gj.png 32w,
                /assets/snapchat-logo_d4KiDFGpEZ4-3hgSCY1gj.png 48w,
                /assets/snapchat-logo_d4KiDFGpEZ4-3hgSCY1gj.png 64w
              "
                                decoding="async"
                                loading="lazy"
                            />
                            <div className="w-text czowava c11pzes6 c13g2dnw">My Snapchat</div></Link>
                    </div>
                </div>
            </div>
            <SnapChatButtonClickRotation />
        </main >
    );
}

// export const revalidate = 1000;
