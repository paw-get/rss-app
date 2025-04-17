import React from 'react';
import styles from './zeroState.module.scss';

export default function ZeroState({ msg }) {
  return (
    <div className={styles.zeroStateContainer}>
      <div className={styles.content}>{msg}</div>
    </div>
  );
}
