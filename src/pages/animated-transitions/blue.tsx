import styles from './block.css'
import React from "react";

export default () =>
  (
    <h2
      className={styles.block}
      style={{background: 'blue'}}
    >
      blue
    </h2>
  );
