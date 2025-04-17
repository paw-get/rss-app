import React from 'react';
import styles from './loader.module.scss';

export default function Loader({ msg }) {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      {msg && <p>{msg}, please wait a sec.</p>}
    </div>
  );
}
