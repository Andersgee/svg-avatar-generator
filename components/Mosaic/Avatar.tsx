import React, { useEffect, useMemo, useState } from "react";
import { randomAvatarSvgString } from "lib/generator";

function svgObjectUrl(svg: string) {
  return URL.createObjectURL(
    new Blob([svg], {
      type: "image/svg+xml",
    })
  );
}

export default function Avatar() {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(svgObjectUrl(randomAvatarSvgString())), []);

  /* eslint-disable-next-line @next/next/no-img-element*/
  return <img src={url} alt="" />;
}
