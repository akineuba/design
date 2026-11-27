"""Crop the 2x captures and export them as WebP for the site (light and dark).

usage: python3 export.py <captureDir> <siteAssetsScreensDir>
Crop boxes are in CSS pixels of the 1440x900 capture; marker positions in index.html are
percentages of these crops, so keep the two in step.
"""
import os, sys
from PIL import Image

JOBS = {
    'hero-wbiz-dashboard':      ('wbiz-dashboard',     None,                  1600),
    'hero-crm-dashboard':       ('crm-dashboard',      None,                  1600),
    'how-wbiz-invoice':         ('wbiz-invoice',       (290, 220, 1410, 900), 1000),
    'guide-wbiz-requisition':   ('wbiz-requisition',   (900, 170, 1440, 550), 800),
    'guide-crm-dashboard':      ('crm-dashboard',      (217, 40, 1440, 900),  800),
    'guide-wbiz-workspace':     ('wbiz-workspace',     (264, 64, 1440, 890),  800),
    'guide-crm-create-company': ('crm-create-company', (978, 20, 1440, 345),  800),
}

src, out = sys.argv[1], sys.argv[2]
for name, (capture, box, width) in JOBS.items():
    for suffix in ('', '-dark'):
        im = Image.open(os.path.join(src, capture + suffix + '.png')).convert('RGB')
        if box:
            im = im.crop(tuple(v * 2 for v in box))
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        path = os.path.join(out, name + suffix + '.webp')
        im.save(path, 'WEBP', quality=86, method=6)
        print(f'{name + suffix:34} {im.size}  {os.path.getsize(path) // 1024} KB')
