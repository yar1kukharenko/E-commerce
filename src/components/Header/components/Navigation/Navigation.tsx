import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import Text from '@components/Text';

import styles from './Navigation.module.scss';

export type NavigationProps = {
  isOpen?: boolean;
};

const Navigation: React.FC<NavigationProps> = ({ isOpen = false }) => (
  <nav className={classNames(styles.nav, isOpen && styles.nav_active)}>
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
    <Link className={styles.link} to="/generatepdf">
      <Text color="accent" view="p-18">
        Generate PDF
      </Text>
    </Link>
  </nav>
);

export default Navigation;
