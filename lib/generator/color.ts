type RGB = {
  r: number;
  g: number;
  b: number;
};

type HSV = {
  h: number;
  s: number;
  v: number;
};

export function clamp(x: number, min: number, max: number) {
  return Math.max(min, Math.min(x, max));
}

const hexFromHsv = (hsv: HSV) => hexFromRgb(rgbFromHsv(hsv));

export function hexFromRgb(rgb: RGB) {
  const comp = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? `0${hex}` : hex;
  };
  return `#${comp(rgb.r) + comp(rgb.g) + comp(rgb.b)}`;
}

function rgbFromHsv(hsv: HSV): RGB {
  let h = hsv.h,
    s = hsv.s,
    v = hsv.v;

  let r = 0,
    g = 0,
    b = 0;

  let i, f, p, q, t;

  if (s === 0) {
    return {
      r: v,
      g: v,
      b: v,
    };
  }
  h /= 60;
  i = Math.floor(h);
  f = h - i;
  p = v * (1 - s);
  q = v * (1 - s * f);
  t = v * (1 - s * (1 - f));

  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    r: Math.floor(r * 255),
    g: Math.floor(g * 255),
    b: Math.floor(b * 255),
  };
}

export function monochromaticScheme(hsv: HSV) {
  let scheme = [hsv];
  for (let i = 1; i <= 2; i++) {
    const adjusted: HSV = {
      h: hsv.v,
      s: clamp(hsv.s + 0.1 * i, 0, 1),
      v: clamp(hsv.v + 0.1 * i, 0, 1),
    };
    scheme.push(adjusted);
  }
  for (let i = 1; i <= 2; i++) {
    const adjusted: HSV = {
      h: hsv.v,
      s: clamp(hsv.s - 0.1 * i, 0, 1),
      v: clamp(hsv.v - 0.1 * i, 0, 1),
    };
    scheme.unshift(adjusted); //pushfirst
  }
  return scheme.map((c) => hexFromHsv(c));
}
