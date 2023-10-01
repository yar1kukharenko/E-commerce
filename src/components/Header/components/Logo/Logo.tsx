import * as React from 'react';

import Lalasia from '@assets/images/Lalasia.svg';
import shortLogo from '@assets/images/ShortLogo.svg';

import styles from './Logo.module.scss';

const Logo = () => (
  <div className={styles.logo}>
    <img src={shortLogo} alt="Short Logo" />
    <img src={Lalasia} alt="Lalasia" />
  </div>
);

export default Logo;
