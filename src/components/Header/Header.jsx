import React from 'react';
import styles from './header.module.scss';

const BigHeader = ({ msg }) => (
  <h1 className={`${styles.big} ${styles.header}`}>{msg}</h1>
);
const SmallHeader = ({ msg }) => (
  <h3 className={`${styles.small} ${styles.header}`}>{msg}</h3>
);
const DefaultHeader = ({ msg }) => (
  <h2 className={`${styles.default} ${styles.header}`}>{msg}</h2>
);

const headerStrategy = {
  big: (msg) => <BigHeader msg={msg} />,
  small: (msg) => <SmallHeader msg={msg} />,
  default: (msg) => <DefaultHeader msg={msg} />,
};

const Header = ({ type = 'default', msg }) => {
  const renderHeader = headerStrategy[type] || headerStrategy.default;
  return renderHeader(msg);
};

export default Header;
