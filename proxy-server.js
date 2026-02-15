import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer-core';

const app = express();
app.use(cors());

// URL Kategori
const CATEGORIES = {
    'lalin': 'https://pantausemar.semarangkota.go.id/?cctv_category_id=fc3ed271-787c-4191-a7dd-fc84314a9f71',
    'wisata': 'https://pantausemar.semarangkota.go.id/?cctv_category_id=815111a4-2beb-41f0-a44a-d6d11dfc31ca'
};

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function getRealLink(categoryUrl, keyword) {
    let browser = null;
    try {
        console.log(`🚀 HYBRID: Mencari marker '${keyword}'...`);
        
        browser = await puppeteer.launch({
            executablePath: CHROME_PATH,
            headless: "new",
            defaultViewport: null,
            args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
        });
        
        const page = await browser.newPage();
        
        // Listener Link .m3u8 (Penyadap Global)
        let foundLink = null;
        await page.setRequestInterception(true);
        page.on('request', req => {
            const url = req.url();
            if (url.includes('.m3u8') && !url.includes('blob:')) {
                console.log("   🎣 DAPAT LINK:", url);
                foundLink = url;
            }
            req.continue();
        });

        // 1. Buka Halaman
        await page.goto(categoryUrl, { waitUntil: 'networkidle2', timeout: 60000 });

        // ============================================================
        // TAHAP 1: KLIK MARKER (HYBRID CHECK)
        // ============================================================
        const xpathMarker = `xpath///*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${keyword.toLowerCase()}')]`;
        
        // Tunggu peta stabil
        await new Promise(r => setTimeout(r, 2000));
        
        try {
            const elements = await page.$$(xpathMarker);
            if (elements.length > 0) {
                console.log(`   📍 Ditemukan ${elements.length} teks label. Memulai operasi HYBRID...`);
                
                // Ambil elemen terakhir (biasanya label yang paling atas)
                let target = elements[elements.length - 1];
                let success = false;

                // LOGIKA DRILL: Klik Teks -> Klik Bapaknya -> Klik Kakeknya
                // Setiap kali klik, kita cek: Apakah MODAL muncul? ATAU Apakah POPUP muncul?
                const clickCandidates = [
                    target, // Level 0: Teks
                    await page.evaluateHandle(el => el.parentElement, target), // Level 1: Parent
                    await page.evaluateHandle(el => el.parentElement?.parentElement, target) // Level 2: Grandparent
                ];

                for (let i = 0; i < clickCandidates.length; i++) {
                    const el = clickCandidates[i];
                    if (!el) continue;

                    console.log(`       👉 Percobaan Klik Level ${i}...`);
                    await page.evaluate(el => el.click(), el);
                    
                    // CEK HASIL KLIK (Tunggu 2 detik)
                    // Kita balapan: Siapa yang muncul duluan? Modal Video atau Tombol Popup?
                    const outcome = await page.evaluate(async () => {
                        // Tunggu sebentar
                        await new Promise(r => setTimeout(r, 1500)); 
                        
                        // Cek Modal Video (Skenario Langsung)
                        if (document.querySelector('.video-wrapper') || document.querySelector('video')) {
                            return 'DIRECT_VIDEO';
                        }
                        // Cek Tombol Popup (Skenario Tombol)
                        if (document.querySelector('.cctv-stream-btn')) {
                            return 'NEED_BUTTON';
                        }
                        return null;
                    });

                    if (outcome === 'DIRECT_VIDEO') {
                        console.log("       ✅ HASIL: Video Langsung Muncul! (Tanpa tombol)");
                        success = true;
                        break; 
                    } else if (outcome === 'NEED_BUTTON') {
                        console.log("       ✅ HASIL: Popup Tombol Muncul. Lanjut klik tombol...");
                        // Klik tombolnya
                        await page.evaluate(() => {
                            const btn = document.querySelector('.cctv-stream-btn');
                            if(btn) btn.click();
                        });
                        // Tunggu modal terbuka
                        await new Promise(r => setTimeout(r, 2000));
                        success = true;
                        break;
                    } else {
                        console.log("       ❌ Tidak ada respon. Coba level berikutnya...");
                    }
                }
            } else {
                console.log("   ⚠️ Marker teks tidak ditemukan.");
            }
        } catch (e) {
            console.log("   ⚠️ Error saat proses hybrid: " + e.message);
        }

        // ============================================================
        // TAHAP 2: URUS VIDEO (AUTO PLAY & RETRY)
        // ============================================================
        // Tahap ini jalan APAPUN hasil Tahap 1 (karena mungkin video sudah terbuka dari sesi sebelumnya)
        console.log("   🏥 Memantau Video Player (Max 15 detik)...");
        
        const startTime = Date.now();
        while (Date.now() - startTime < 15000) {
            if (foundLink) return foundLink;

            // A. CEK TOMBOL RETRY (Jika video error)
            const retryBtn = await page.$('.retry-btn');
            if (retryBtn) {
                const isVisible = await page.evaluate(el => el.offsetParent !== null, retryBtn);
                if (isVisible) {
                    console.log("   🔄 Error 'Gagal memuat stream'. Klik 'Coba Lagi'...");
                    await page.evaluate(el => el.click(), retryBtn);
                    await new Promise(r => setTimeout(r, 2000));
                    continue;
                }
            }

            // B. PAKSA PLAY (INJECT JS)
            try {
                // Cari tag video
                const videoTag = await page.$('video');
                if (videoTag) {
                    await page.evaluate(v => { 
                        if (v.paused) { 
                            console.log("   ▶️ Inject Play command...");
                            v.muted = true; 
                            v.play(); 
                        }
                    }, videoTag);
                } 
                // C. KLIK WRAPPER (Pancingan Terakhir)
                else {
                    const videoWrapper = await page.$('.video-wrapper');
                    if(videoWrapper) {
                        // console.log("   🖱️ Klik .video-wrapper (pancingan)...");
                        await page.evaluate(el => el.click(), videoWrapper);
                    }
                }
            } catch (e) {}

            await new Promise(r => setTimeout(r, 1000));
        }

        return foundLink;

    } catch (error) {
        console.error("🔥 Error Critical:", error.message);
        return null;
    } finally {
        if (browser) await browser.close();
    }
}

app.get('/stream', async (req, res) => {
    const { cat, name } = req.query;
    const cleanName = decodeURIComponent(name); 
    if (!CATEGORIES[cat]) return res.status(400).send("Kategori salah.");

    const link = await getRealLink(CATEGORIES[cat], cleanName);

    if (link) {
        res.redirect(link);
    } else {
        res.status(404).send("Gagal.");
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🤖 Proxy 'HYBRID' Jalan di http://localhost:${PORT}`));