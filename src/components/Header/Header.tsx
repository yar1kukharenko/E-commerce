import * as React from 'react';
import { Link } from 'react-router-dom';

import Logo from '@components/Header/components/Logo';
import Navigation from '@components/Header/components/Navigation';
import BagIcon from '@components/icons/BagIcon';
import MenuIcon from '@components/icons/MenuIcon/MenuIcon';

import styles from './Header.module.scss';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  const toggleMenu = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  return (
    <div className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>
      <Navigation isOpen={isOpen} />
      <div className={styles.button_wrapper}>
        <Link to="/basket">
          <BagIcon width={30} height={30} />
        </Link>
        <MenuIcon onClick={toggleMenu} className={styles.menuIcon} width={30} height={30} isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Header;
