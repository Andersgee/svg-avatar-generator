import Matercolor from "matercolors";

const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);
const rand = (a: number, b: number) => a + Math.random() * (b - a);

export function generator() {
  const c = new Matercolor(randomColor());
  //console.log(c);
  const x = 10;
  const p: Face = {
    headFill: c["200"],
    eyeFill: c["A1900"],
    eyebrowFill: c["A1700"],
    mouthFill: c["A1400"],
    eyebrowX: rand(-x, x),
    eyebrowX2: rand(-x, x),
    eyeX: rand(-x, x),
    jawX: rand(-x, x),
    cheekboneX: rand(-x, x),
    chinX: rand(-x, x),
    headRadius: rand(-x, x),
  };
  return face(p);
}

interface Face {
  headRadius: number;
  eyeX: number;
  eyebrowX: number;
  eyebrowX2: number;
  cheekboneX: number;
  chinX: number;
  jawX: number;
  eyeFill: string;
  headFill: string;
  eyebrowFill: string;
  mouthFill: string;
}

const face = (p: Face) => {
  return `
<svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
<rect fill="#09042A" x="0" y="0" width="100%" height="100%"/> 
<g transform="translate(160,120)">
  <!-- head -->
  <path fill="${p.headFill}"
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
  <path fill="${p.eyeFill}"
  d="M ${20 + p.eyeX} 40
  a 50 50 0 0 1 50 0
  a 120 120 0 0 1 -50 0
  " />

  <!-- other eye -->
  <path fill="${p.eyeFill}" transform="scale(-1,1)"
  d="M ${20 + p.eyeX} 40
  a 50 50 0 0 1 50 0
  a 120 120 0 0 1 -50 0
  " />

  <!-- eye brow -->
  <path fill="none" stroke="${p.eyebrowFill}" stroke-width="5"
  d="M ${20 + p.eyebrowX} 20
  L ${60 + p.eyebrowX2} 10
  L 70 20
  " />

  <!-- other eye brow -->
  <path fill="none" stroke="${
    p.eyebrowFill
  }" stroke-width="5" transform="scale(-1,1)"
  d="M ${20 + p.eyebrowX} 20
  L ${60 + p.eyebrowX2} 10
  L 70 20
  " />

  <!-- nose -->
  <path fill="none" stroke="${p.mouthFill}" stroke-width="2"
  d="M 0 100
  m -5 -5
  a 6 6 0 0 0 10 0
  m -5 0
  a 15 15 0 0 0 20 -2
  m -20 2
  a 15 15 0 0 1 -20 -2
  " />

  <!-- mouth -->
  <path fill="none" stroke="${p.mouthFill}" stroke-width="2"
  d="M 0 130
  m -30 0
  a 70 70 0 0 0 60 0
  a 100 100 0 0 0 -25 -5
  l -5 2
  l -5 -2
  a 100 100 0 0 0 -25 5
  l 60 0

  "
  />
</g>

</svg>
`;
};
