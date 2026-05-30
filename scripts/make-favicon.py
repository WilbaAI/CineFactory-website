"""Build the brand mark tile: red 'tc' on a black rounded square.

Source logo-mark.png is a cropped lockup (mark + clipped text). Extract just
the red mark pixels, then composite them centered on a clean black rounded
square. Output is square, transparent outside the rounding, no white, no text.
Used for both the favicon and the hero mark.
"""

from PIL import Image, ImageDraw

im = Image.open("src/assets/logo-mark.png").convert("RGBA")
W, H = im.size
px = im.load()

mark = Image.new("RGBA", (W, H), (0, 0, 0, 0))
mp = mark.load()
x_limit = int(W * 0.62)  # mark is in the left tile; skip the text column
minx, miny, maxx, maxy = W, H, -1, -1
for y in range(H):
    for x in range(x_limit):
        r, g, b, a = px[x, y]
        if a > 20 and r >= 110 and (r - g) >= 40 and (r - b) >= 40:
            mp[x, y] = (r, g, b, a)
            minx, miny = min(minx, x), min(miny, y)
            maxx, maxy = max(maxx, x), max(maxy, y)

if maxx < 0:
    raise SystemExit("no red mark pixels found")

crop = mark.crop((minx, miny, maxx + 1, maxy + 1))

S = 256
tile = Image.new("RGBA", (S, S), (0, 0, 0, 0))
ImageDraw.Draw(tile).rounded_rectangle([0, 0, S - 1, S - 1], radius=int(S * 0.16), fill=(0, 0, 0, 255))
cw, ch = crop.size
scale = (S * 0.60) / max(cw, ch)
nw, nh = int(cw * scale), int(ch * scale)
on_tile = crop.resize((nw, nh), Image.LANCZOS)
tile.paste(on_tile, ((S - nw) // 2, (S - nh) // 2), on_tile)
tile.save("src/assets/mark.png")
print("mark tile written", (nw, nh))
