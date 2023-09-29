import * as React from 'react';

import Logo from '@components/Header/components/Logo';
import Navigation from '@components/Header/components/Navigation';

import styles from './Header.module.scss';

const Header = () => (
  <div className={styles.header}>
    <Logo />
    <Navigation />
  </div>
);

export default Header;
