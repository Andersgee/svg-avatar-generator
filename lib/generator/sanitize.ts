import DOMPurify from "dompurify";

export function sanitize(dirty: string) {
  try {
    const str = DOMPurify.sanitize(dirty, {
      USE_PROFILES: { svg: true, svgFilters: true },
      //FORBID_ATTR: ["style"],
      //FORBID_TAGS: ["#text"],
      KEEP_CONTENT: false,
    });

    return str;
  } catch (err) {
    console.log(err);
    return "";
  }
}
