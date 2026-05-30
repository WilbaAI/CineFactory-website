"""Trim the transparent padding off the supplied TCF lockup and import it."""

from PIL import Image

SRC = "/Users/janith/Downloads/TCF Logo White strokw 2.PNG"
im = Image.open(SRC).convert("RGBA")
bbox = im.getbbox()  # tight box around all non-transparent pixels (incl. white text)
crop = im.crop(bbox)

# Scale to a sensible asset height (4x the ~44px nav display for retina crispness).
target_h = 176
w, h = crop.size
crop = crop.resize((round(w * target_h / h), target_h), Image.LANCZOS)
crop.save("src/assets/logo-full.png")

# Dark-bg preview so the white wordmark is visible when checking.
preview = Image.new("RGBA", crop.size, (10, 9, 9, 255))
preview.alpha_composite(crop)
preview.convert("RGB").save("/tmp/logo-preview.png")

print("source", bbox, "-> asset", crop.size)
