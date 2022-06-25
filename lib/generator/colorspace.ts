export type Triplet = [x: number, y: number, z: number];

function mul(M: number[], v: Triplet): Triplet {
  const x = v[0];
  const y = v[1];
  const z = v[2];
  return [
    M[0] * x + M[3] * y + M[6] * z,
    M[1] * x + M[4] * y + M[7] * z,
    M[2] * x + M[5] * y + M[8] * z,
  ];
}

export function srgb2xyz(srgb: Triplet) {
  const M = [
    0.4124564, 0.2126729, 0.0193339, 0.3575761, 0.7151522, 0.119192, 0.1804375,
    0.072175, 0.9503041,
  ];
  return mul(M, srgb);
}

function xyz2Yxy(xyz: Triplet): Triplet {
  return [
    xyz[1],
    xyz[0] / (xyz[0] + xyz[1] + xyz[2]),
    xyz[1] / (xyz[0] + xyz[1] + xyz[2]),
  ];
}

function Yxy2xyz(Yxy: Triplet): Triplet {
  return [
    (Yxy[0] * Yxy[1]) / Yxy[2],
    Yxy[0],
    (Yxy[0] * (1.0 - Yxy[1] - Yxy[2])) / Yxy[2],
  ];
}

function gammacompress(u: number) {
  return u <= 0.0031308 ? 12.92 * u : Math.pow(1.055 * u, 0.4166667) - 0.055;
}

// gammacorrection (can also simply use pow(color, 2.2))
function gammaexpand(u: number) {
  return u <= 0.04045 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4);
}

// rgb - srgb
function srgb2rgb(srgb: Triplet): Triplet {
  return [gammaexpand(srgb[0]), gammaexpand(srgb[1]), gammaexpand(srgb[2])];
}

function rgb2srgb(rgb: Triplet): Triplet {
  return [gammacompress(rgb[0]), gammacompress(rgb[1]), gammacompress(rgb[2])];
}

export function rgb2Yxy(rgb: Triplet): Triplet {
  return xyz2Yxy(srgb2xyz(rgb2srgb(rgb)));
}

function rgb2xy(rgb: Triplet) {
  const Yxy = rgb2Yxy(rgb);
  return [Yxy[1], Yxy[2]];
}

function xyz2srgb(xyz: Triplet) {
  const M = [
    3.2404542, -0.969266, 0.0556434, -1.5371385, 1.8760108, -0.2040259,
    -0.4985314, 0.041556, 1.0572252,
  ];
  return mul(M, xyz);
}

export function Yxy2srgb(Yxy: Triplet): Triplet {
  return xyz2srgb(Yxy2xyz(Yxy));
}

export function Yxy2rgb(Yxy: Triplet): Triplet {
  return srgb2rgb(xyz2srgb(Yxy2xyz(Yxy)));
}

/*
const a: Triplet = [Math.random(), Math.random(), Math.random()];
console.log(rgb2xy(a));
*/
