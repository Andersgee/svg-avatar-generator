import React, { useEffect, useState } from "react";
import { generator, randomParams, randomFill } from "lib/generator";
//import Test from "public/test.svg";

function svgObjectUrl(svg: string) {
  return URL.createObjectURL(
    new Blob([svg], {
      type: "image/svg+xml",
    })
  );
}

export default function Avatar() {
  const [url, setUrl] = useState("");

  const [fill, setFill] = useState(randomFill());
  const [params, setParams] = useState(randomParams());
  const [svgString, setSvgstring] = useState(() => generator(params, fill));

  useEffect(() => {
    const objectUrl = svgObjectUrl(svgString);
    setUrl(objectUrl);
  }, [svgString]);

  useEffect(() => {
    setSvgstring(generator(params, fill));
  }, [params, fill]);

  const getface = () => {
    setParams(randomParams());
  };

  const getcolor = () => {
    setFill(randomFill());
  };

  return (
    <div>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img src={url} alt="avatar" />
      </div>
      <button onClick={getface}>new shape</button>
      <button onClick={getcolor}>new color</button>
    </div>
  );
}
