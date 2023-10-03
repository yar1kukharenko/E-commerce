import * as React from 'react';
import { Link } from 'react-router-dom';

import Text from '@components/Text';

import styles from './Navigation.module.scss';

const Navigation = () => (
  <nav className={styles.nav}>
    <Link className={styles.link} to="/">
      <Text color="accent" view="p-18">
        Products
      </Text>
    </Link>
    <Link className={styles.link} to="/categories">
      <Text color="accent" view="p-18">
        Categories
      </Text>
    </Link>
    <Link className={styles.link} to="/aboutus">
      <Text color="accent" view="p-18">
        About us
      </Text>
    </Link>
  </nav>
);

export default Navigation;