import React from 'react';
import Link from 'umi/link';
import styles from './index.css';

export default function () {
  return (
    <div className={styles.normal}>
      111111111
      <div className={styles.welcome}/>
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <Link to='/test'>go to /test</Link>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            Getting Started
          </a>
        </li>
        <li><Link to="/animated-transitions">/animated-transitions</Link></li>
      </ul>
    </div>
  );
}
