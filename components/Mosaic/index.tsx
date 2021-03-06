import React from "react";
import styles from "./mosaic.module.css";
import Avatar from "./Avatar";

const N = 12 * 10;
const a = Array.from({ length: N }, (_, i) => i);

export default function Mosaic() {
  return (
    <div className={styles.container}>
      <div className={styles.mosaic}>
        {a.map((v) => (
          <Avatar key={v} />
        ))}
      </div>
    </div>
  );
}
