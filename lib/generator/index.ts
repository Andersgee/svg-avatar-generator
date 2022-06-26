import { rgb2Yxy, Yxy2rgb, Triplet } from "./colorspace";

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const randIntbool = () => (Math.random() > 0.5 ? 1 : 0);

const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(x, b));

interface Params {
  headRadius: number;
  eyeX: number;
  eyebrowX: number;
  eyebrowX2: number;
  eyebrowY: number;
  cheekboneX: number;
  chinX: number;
  jawX: number;
  noseY: number;
  mouthY: number;
  mouthW: number;
  eyeIsOpen: number;
  eyeBrowLiftR: number;
  eyeBrowLiftL: number;
  eyeSize: number;
}

export function randomParams(x = 5) {
  const p: Params = {
    eyebrowX: rand(-x, x),
    eyebrowX2: rand(-x, x),
    eyebrowY: rand(-x, x),
    eyeX: rand(-x, x),
    jawX: rand(-x, x),
    cheekboneX: rand(-x, x),
    chinX: rand(-x, x) * 2,
    headRadius: rand(-x, x),
    noseY: rand(-x, x) * 0.5,
    mouthY: rand(-x, x) * 0.5,
    mouthW: rand(-x, x) * 2,
    eyeIsOpen: randIntbool(),
    eyeBrowLiftR: rand(-4, 4),
    eyeBrowLiftL: rand(-4, 4),
    eyeSize: rand(-5, 5),
  };
  return p;
}

const to255 = (x: number) => clamp(Math.floor(x * 255), 0, 255);

export function hexFromRgb(rgb: Triplet) {
  const comp = (c: number) => {
    const hex = Math.floor(c).toString(16);
    return hex.length == 1 ? `0${hex}` : hex;
  };
  const hex =
    "#" + comp(to255(rgb[0])) + comp(to255(rgb[1])) + comp(to255(rgb[2]));
  return hex;
}

const Yxy2Hex = (Yxy: Triplet) => hexFromRgb(Yxy2rgb(Yxy));

const mix = (a: Triplet, b: Triplet, t: number): Triplet => [
  a[0] * (1 - t) + b[0] * t,
  a[1] * (1 - t) + b[1] * t,
  a[2] * (1 - t) + b[2] * t,
];

const colormix = (a: Triplet, b: Triplet, t: number): Triplet => [
  0.5,
  a[1] * (1 - t) + b[1] * t,
  a[2] * (1 - t) + b[2] * t,
];

export function randomFill() {
  const r0 = rand(0.1, 1);
  const g0 = rand(0.1, 1);
  const b0 = rand(0.1, 1);

  const r1 = rand(0.1, 1);
  const g1 = rand(0.1, 1);
  const b1 = rand(0.1, 1);

  const A = rgb2Yxy([r0, g0, b0]);
  const B = rgb2Yxy([r1, g1, b1]);

  const col1 = mix(A, B, 0.4);
  const col2 = mix(A, B, 0.6);

  col1[0] = 0.7;
  col2[0] = 0.5;
  const light = col1;
  const dark = col2;

  const Yxyscheme = [light, dark];
  const scheme = Yxyscheme.map(Yxy2Hex);

  const f: Fill = {
    headFill: scheme[0],
    eyeFill: scheme[1],
    eyebrowFill: scheme[1],
    mouthFill: scheme[1],
  };
  return f;
}

export function generator(p: Params, f: Fill) {
  return face(p, f);
}

export function randomAvatarSvgString() {
  const p = randomParams();
  const f = randomFill();
  return face(p, f);
}

interface Fill {
  eyeFill: string;
  headFill: string;
  eyebrowFill: string;
  mouthFill: string;
}

//<rect fill="#09042A" x="0" y="0" width="100%" height="100%"/>
const face = (p: Params, f: Fill) => {
  return `
<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">

<g transform="translate(160,120)">
  <!-- head -->
  <path fill="${f.headFill}"
  d="M -${100 + p.headRadius} 0
  a ${100 + p.headRadius} ${100 + p.headRadius} 0 0 1 ${
    2 * (100 + p.headRadius)
  } 0
  L ${82 + p.cheekboneX} 100
  L ${70 + p.jawX} 140
  L ${20 + p.chinX} 180
  L -${20 + p.chinX} 180
  L -${70 + p.jawX} 140
  L -${82 + p.cheekboneX} 100
  " />

  <!-- eye -->
  <path fill="${f.eyeFill}"
  d="M ${20 + p.eyebrowX} 40
  a ${40 + p.eyeSize} ${40 + p.eyeSize} 0 0 1 50 0
  a 120 120 0 0 ${p.eyeIsOpen} -50 0
  " />

  <!-- other eye -->
  <path fill="${f.eyeFill}" transform="scale(-1,1)"
  d="M ${20 + p.eyebrowX} 40
  a ${40 + p.eyeSize} ${40 + p.eyeSize} 0 0 1 50 0
  a 120 120 0 0 ${p.eyeIsOpen} -50 0
  " />

  <!-- eye brow -->
  <path fill="none" stroke="${f.eyebrowFill}" stroke-width="5"
  stroke-linecap="round" stroke-linejoin="bevel"
  d="M ${20 + p.eyebrowX} ${10 + p.eyebrowY + p.eyeIsOpen * 5}
  L ${50 + p.eyebrowX2} ${5 + p.eyebrowY + p.eyeBrowLiftR}
  L 70 ${15 + p.eyebrowY}
  " />

  <!-- other eye brow -->
  <path fill="none" stroke="${
    f.eyebrowFill
  }" stroke-width="5" transform="scale(-1,1)"
  stroke-linecap="round" stroke-linejoin="bevel"
  d="M ${20 + p.eyebrowX} ${10 + p.eyebrowY + p.eyeIsOpen * 5}
  L ${50 + p.eyebrowX2} ${5 + p.eyebrowY + p.eyeBrowLiftL}
  L 70 ${15 + p.eyebrowY}
  " />

  <!-- nose -->
  <path fill="none" stroke="${f.mouthFill}" stroke-width="5"
  d="M 0 ${100 + p.noseY}
  m -5 -5
  a 6 6 0 0 0 10 0
  m -5 0
  a 15 15 0 0 0 20 -2
  m -20 2
  a 15 15 0 0 1 -20 -2
  " />

  <!-- mouth -->
  <!--
  <path fill="none" stroke="${f.mouthFill}" stroke-width="2"
  d="M 0 ${130 + p.mouthY}
  m -30 0
  a 70 70 0 0 0 65 -5
  a 100 100 0 0 0 -30 -5
  l -5 2
  l -5 -2
  a 100 100 0 0 0 -25 10
  a 200 200 0 0 0 65 -5
  "
  />
  -->

  <path fill="${f.mouthFill}" stroke="${f.mouthFill}" stroke-width="5"
  stroke-linejoin="miter"
  d="M 0 ${130 + p.mouthY}
  m -${35 + p.mouthW} 0
  a 70 70 0 0 0 ${70 + 2 * p.mouthW} 0
  a ${100 + p.mouthW} ${100 + p.mouthW} 0 0 0 -${30 + p.mouthW} -3
  l -5 2
  l -5 -2
  a ${100 + p.mouthW} ${100 + p.mouthW} 0 0 0 -${30 + p.mouthW} 3
  a 70 70 0 0 0 ${70 + 2 * p.mouthW} 0
  "
  />

</g>

</svg>
`;
};
