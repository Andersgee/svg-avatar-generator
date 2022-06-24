import React, { useEffect, useState } from "react";
import { generator } from "lib/generator";

function svgObjectUrl(svg: string) {
  return URL.createObjectURL(
    new Blob([svg], {
      type: "image/svg+xml",
    })
  );
}

export default function Avatar() {
  const [svgString, setSvgstring] = useState(() => generator());
  const [url, setUrl] = useState("");

  useEffect(() => {
    const objectUrl = svgObjectUrl(svgString);
    setUrl(objectUrl);
  }, [svgString]);

  const getface = () => {
    setSvgstring(generator());
  };

  return (
    <div>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img src={url} alt="some svg" />
      </div>
      <button onClick={getface}>get random face</button>
    </div>
  );
}
