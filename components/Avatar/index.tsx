import React, { useEffect, useState } from "react";
//import Kek from "public/15.svg";
import { generator } from "lib/generator";

function svgObjectUrl(svg: string) {
  return URL.createObjectURL(
    new Blob([svg], {
      type: "image/svg+xml",
    })
  );
}

export default function Avatar() {
  const svgString = generator();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const objectUrl = svgObjectUrl(svgString);
    setUrl(objectUrl);
  }, [svgString]);

  return (
    <div>
      <div>{svgString}</div>
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img src={url} alt="some svg" />
    </div>
  );
}
