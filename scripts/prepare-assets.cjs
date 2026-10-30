// Builds web-ready copies of the kit assets into /public. Source files in RECURSOS are never modified.
const sharp = require('sharp');
const path = require('path');
const KIT = path.join(__dirname, '..', 'RECURSOS', 'Kingdom_Racing_Opus55_Localhost4000_Kit', '06_ASSETS');
const OUT = path.join(__dirname, '..', 'public');

const photos = {
  '01_IndyCar_En_Pista': 'track-pack',
  '02_Ovalo_Con_Publico': 'oval-crowd',
  '03_IndyCar_En_Boxes': 'pit-lane',
  '04_Compartiendo_La_Biblia': 'sharing-the-word',
  '05_Oracion_En_Comunidad': 'prayer-circle',
  '06_Comunidad_En_El_Paddock': 'paddock-community',
  '07_IndyCar_Visto_Desde_Atras': 'chase-sunset',
  '08_Pista_Amplia': 'front-straight',
  '09_IndyCar_Detalle_De_Carrera': 'car-detail',
  '10_Publico_En_Las_Gradas': 'grandstands',
};

async function run() {
  for (const [src, name] of Object.entries(photos)) {
    await sharp(path.join(KIT, 'photos', `${src}.png`)).jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(OUT, 'images', `${name}.jpg`));
  }

  // Official logo: keep the original pixels, only trim and produce a light-wordmark variant for dark surfaces.
  const logo = sharp(path.join(KIT, 'logo', 'kingdom-racing-logo-preview.png')).ensureAlpha();
  const { data, info } = await logo.raw().toBuffer({ resolveWithObject: true });
  const color = Buffer.from(data);
  const light = Buffer.from(data);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a0 = data[i + 3];
    if (a0 === 0) continue;
    const isRed = r > 110 && r - Math.max(g, b) > 50;
    if (isRed) continue;
    // Neutral pixels: white background becomes transparent, the black wordmark keeps its shape.
    const ink = Math.round(((255 - Math.min(r, g, b)) / 255) * a0);
    color[i] = 0; color[i + 1] = 0; color[i + 2] = 0; color[i + 3] = ink;
    light[i] = 255; light[i + 1] = 255; light[i + 2] = 255; light[i + 3] = ink;
  }
  const raw = { raw: { width: info.width, height: info.height, channels: 4 } };
  await sharp(color, raw).trim().png().toFile(path.join(OUT, 'brand', 'kingdom-racing-logo.png'));
  await sharp(light, raw).trim().png().toFile(path.join(OUT, 'brand', 'kingdom-racing-logo-light.png'));
  await sharp(color, raw).trim().resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png().toFile(path.join(OUT, 'brand', 'icon-512.png'));
  console.log('assets ready');
}
run();
