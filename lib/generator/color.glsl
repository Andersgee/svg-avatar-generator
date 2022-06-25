// gammacorrection (can also simply use pow(color, 2.2))
float gammaexpand(float u) {
  return (u <= 0.04045) ? u / 12.92 : pow((u + 0.055) / 1.055, 2.4);
}
float gammacompress(float u) {
  return (u <= 0.0031308) ? 12.92 * u : pow(1.055 * u, 0.4166667) - 0.055;
}

// rgb - srgb
vec3 srgb2rgb(vec3 srgb) {
  return vec3(gammaexpand(srgb.x), gammaexpand(srgb.y), gammaexpand(srgb.z));
}
vec3 rgb2srgb(vec3 rgb) {
  return vec3(gammacompress(rgb.x), gammacompress(rgb.y), gammacompress(rgb.z));
}

// xyz - srgb
vec3 xyz2srgb(vec3 xyz) {
  return mat3(3.2404542, -0.9692660, 0.0556434, -1.5371385, 1.8760108,
              -0.2040259, -0.4985314, 0.0415560, 1.0572252) *
         xyz;
}
vec3 srgb2xyz(vec3 srgb) {
  return mat3(0.4124564, 0.2126729, 0.0193339, 0.3575761, 0.7151522, 0.1191920,
              0.1804375, 0.0721750, 0.9503041) *
         srgb;
}

// xyz - Yxy
vec3 xyz2Yxy(vec3 xyz) {
  return vec3(xyz.y, xyz.x / (xyz.x + xyz.y + xyz.z),
              xyz.y / (xyz.x + xyz.y + xyz.z));
}
vec3 Yxy2xyz(vec3 Yxy) {
  return vec3(Yxy.x * Yxy.y / Yxy.z, Yxy.x,
              Yxy.x * (1.0 - Yxy.y - Yxy.z) / Yxy.z);
}

// color space conversions go via the standard xyz color space
vec3 Yxy2srgb(vec3 Yxy) { return xyz2srgb(Yxy2xyz(Yxy)); }

vec3 rgb2Yxy(vec3 rgb) { return xyz2Yxy(srgb2xyz(rgb2srgb(rgb))); }
vec2 rgb2xy(vec3 rgb) { return rgb2Yxy(rgb).yz; }

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  float t = uv.x;
  vec3 rgbcol1 = vec3(0.05, 0.01, 0.0);
  vec3 rgbcol2 = vec3(0.4, 0.9, 0.3);

  // mix colors with specified brightness
  float brightness = 0.5;
  vec3 col = vec3(brightness, mix(rgb2xy(rgbcol1), rgb2xy(rgbcol2), t));
  fragColor = vec4(Yxy2srgb(col), 1.0);

  // mix colors
  // col = mix(rgbcol1, rgbcol2, t);
  // fragColor = vec4(col,1.0); //simple
  // fragColor = vec4(rgb2srgb(col),1.0); //gamma corrected
}
