import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cors from 'cors';

const app = express();
app.use(cors());

const CATEGORIES = {
    'lalin': 'https://pantausemar.semarangkota.go.id/?cctv_category_id=fc3ed271-787c-4191-a7dd-fc84314a9f71',
    'wisata': 'https://pantausemar.semarangkota.go.id/?cctv_category_id=815111a4-2beb-41f0-a44a-d6d11dfc31ca',
    'pemerintah': 'https://pantausemar.semarangkota.go.id/?cctv_category_id=ee2827a7-f7a2-4599-bd22-5bbf4844fa2d',
    'pompa': 'https://pantausemar.semarangkota.go.id/?cctv_category_id=5b5b7e51-3a2e-446f-8fae-50d8e9e7196d'
};

async function findCCTVLink(categoryUrl, keyword) {
    try {
        console.log(`🔍 Mencari '${keyword}' di ${categoryUrl}...`);
        const { data } = await axios.get(categoryUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);

        let foundLink = null;
        $('script').each((i, el) => {
            const scriptContent = $(el).html();
            if (scriptContent && scriptContent.toLowerCase().includes(keyword.toLowerCase())) {
                const match = scriptContent.match(/https:\/\/livepantau.*?\.m3u8/);
                if (match) {
                    foundLink = match[0];
                    return false;
                }
            }
        });

        if (!foundLink) {
             $('a, div, button').each((i, el) => {
                const text = $(el).text();
                if (text.toLowerCase().includes(keyword.toLowerCase())) {
                    const htmlContent = $(el).parent().html(); 
                    const match = htmlContent.match(/https:\/\/livepantau.*?\.m3u8/);
                    if (match) foundLink = match[0];
                }
             });
        }

        return foundLink;

    } catch (error) {
        console.error("❌ Gagal scraping:", error.message);
        return null;
    }
}

app.get('/stream', async (req, res) => {
    const { cat, name } = req.query;

    if (!CATEGORIES[cat]) {
        return res.status(400).send("Kategori salah! Gunakan 'lalin' atau 'wisata'.");
    }

    const realLink = await findCCTVLink(CATEGORIES[cat], name);

    if (realLink) {
        console.log(`✅ Ketemu: ${realLink}`);
        res.redirect(realLink);
    } else {
        res.status(404).send("CCTV tidak ditemukan atau server kota berubah struktur.");
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Proxy Server Jalan di http://localhost:${PORT}`);
});