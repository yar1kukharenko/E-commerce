import * as React from 'react';
import { Link } from 'react-router-dom';

import Logo from '@components/Header/components/Logo';
import Navigation from '@components/Header/components/Navigation';
import BagIcon from '@components/icons/BagIcon';

import styles from './Header.module.scss';

const Header = () => (
  <div className={styles.header}>
    <Link to="/">
      <Logo />
    </Link>
    <Navigation />
    <Link to="/basket">
      <BagIcon width={30} height={30} />
    </Link>
  </div>
);

export default Header;
