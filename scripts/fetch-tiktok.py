"""Fetch TikTok thumbnails + captions via oEmbed, save webp into assets/works/.

Prints a JSON array of {client, videoId, url, title, image} for wiring into
works.component.ts. Run from repo root: python3 scripts/fetch-tiktok.py
"""

import json
import os
import subprocess
import urllib.request

LINKS = [
    ("anura", "https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7638225630567370001"),
    ("anura", "https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7644789948570176784"),
    ("anura", "https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7635280138158050561"),
    ("anura", "https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7645390704717335809"),
    ("anura", "https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7639598783642275088"),
    ("anura", "https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7638896408325557505"),
    ("anura", "https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7636036511401577729"),
]

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"


def get(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


out = []
for client, url in LINKS:
    vid = url.rstrip("/").split("/")[-1].split("?")[0]
    rec = {"client": client, "videoId": vid, "url": url, "title": None, "image": None}
    try:
        meta = json.loads(get("https://www.tiktok.com/oembed?url=" + url))
        rec["title"] = (meta.get("title") or "").strip()
        thumb = meta.get("thumbnail_url")
        if thumb:
            os.makedirs(f"src/assets/works/{client}", exist_ok=True)
            raw = f"/tmp/{client}-{vid}.jpg"
            with open(raw, "wb") as f:
                f.write(get(thumb, {"User-Agent": UA, "Referer": "https://www.tiktok.com/"}))
            webp = f"src/assets/works/{client}/{vid}.webp"
            subprocess.run(["cwebp", "-q", "82", raw, "-o", webp], capture_output=True, check=True)
            rec["image"] = f"assets/works/{client}/{vid}.webp"
    except Exception as e:  # noqa: BLE001
        rec["error"] = str(e)
    out.append(rec)

print(json.dumps(out, indent=2, ensure_ascii=False))
