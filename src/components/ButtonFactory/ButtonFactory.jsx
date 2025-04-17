import React from 'react';
import styles from './buttonFactory.module.scss';

export default function ButtonFactory({
  type = 'default',
  size = 'normal',
  onClick,
  children,
}) {
  const typeClass = styles[type] || styles.default;
  const sizeClass = styles[size] || styles.normal;

  return (
    <button
      className={`${styles.button} ${typeClass} ${sizeClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
