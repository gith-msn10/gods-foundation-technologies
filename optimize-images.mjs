import sharp from "sharp";
import { readdirSync } from "fs";
import { join, parse } from "path";

const dir = "src/assets/products"; // change to your products folder
for (const file of readdirSync(dir)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const { name } = parse(file);
  await sharp(join(dir, file))
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(join(dir, `${name}.webp`));
  console.log("done:", file);
}