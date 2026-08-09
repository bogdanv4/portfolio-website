# Project screenshots

Drop screenshots here to have them show up as the background of the
"browser window" mock in the Projects section. Files are matched by
filename, and any of `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif` will be
picked up automatically — **the extension must be lowercase** (the
production build runs on Linux, which is case-sensitive; Windows will
match `.PNG` locally but the file silently won't ship).

| Project | Expected filename |
|---|---|
| Finance Tracker | `finance-tracker.*` |
| Air Pollution Tracker | `air-pollution-tracker.*` |
| Angular Web Shop | `angular-web-shop.*` |
| Agencija Kozic | `agencija-kozic.*` |

## Spec

- **Aspect ratio:** 16:9 (the window frame is `aspect-ratio: 16/9` and
  crops with `object-fit: cover`, so other ratios will just crop rather
  than distort — but matching the ratio looks best). The current shots
  are ~2.08 wide, so roughly 7% is cropped off each side.
- **Recommended size:** ~1600×900px.
- **Format:** `.webp` — the current files were converted from PNG at
  quality 90, which cut them from 1141 KB to 239 KB total (-79%).
- **Budget:** ≤300 KB each.

If a file for a project is missing, that slot just falls back to its
existing gradient background — nothing breaks.

## Re-encoding a new screenshot

There's no image tooling in this repo. To convert a PNG without adding a
dependency, install `sharp` outside the project and run it from there:

```sh
npm install sharp --prefix /tmp/imgtools
node --input-type=module -e "
import sharp from '/tmp/imgtools/node_modules/sharp/lib/index.js';
await sharp('in.png').removeAlpha().webp({ quality: 90, effort: 6 }).toFile('out.webp');
"
```
