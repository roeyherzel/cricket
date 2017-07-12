import styles from './styles.scss';

import React from 'react';

export default function Header(props) {
  return (
    <div className={styles.header}>
      <h1>Jiminy Cricket</h1>
      <div>
         {props.children}
      </div>
    </div>
  );
}