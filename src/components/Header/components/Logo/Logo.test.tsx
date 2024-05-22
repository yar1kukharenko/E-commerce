import { render } from '@testing-library/react';
import Logo from './Logo';
import React from 'react';
import styles from './Logo.module.scss';
import shortLogo from '@assets/images/ShortLogo.svg';
import Lalasia from '@assets/images/Lalasia.svg';

describe('Logo component', () => {
  it('renders correctly', () => {
    const { container } = render(<Logo />);
    const logoDiv = container.querySelector(`.${styles.logo}`);
    expect(logoDiv).toBeInTheDocument();
  });

  it('renders short logo image', () => {
    const { getByAltText } = render(<Logo />);
    const shortLogoImg = getByAltText('Short Logo');
    expect(shortLogoImg).toBeInTheDocument();
    expect(shortLogoImg).toHaveAttribute('src', shortLogo);
  });

  it('renders Lalasia logo image', () => {
    const { getByAltText } = render(<Logo />);
    const lalasiaImg = getByAltText('Lalasia');
    expect(lalasiaImg).toBeInTheDocument();
    expect(lalasiaImg).toHaveAttribute('src', Lalasia);
  });
});
