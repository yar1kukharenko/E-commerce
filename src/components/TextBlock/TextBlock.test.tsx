import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import TextBlock from './TextBlock';
import React from 'react';
import Text from '@components/Text';
import styles from './TextBlock.module.scss';

describe('TextBlock component', () => {
  it('renders title and subtitle correctly', () => {
    const title = 'Test Title';
    const subtitle = 'Test Subtitle';
    const { getByText } = render(<TextBlock title={title} subtitle={subtitle} />);

    const titleElement = getByText(title);
    const subtitleElement = getByText(subtitle);

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it('applies correct classes to title and subtitle', () => {
    const title = 'Test Title';
    const subtitle = 'Test Subtitle';
    const { container } = render(<TextBlock title={title} subtitle={subtitle} />);

    const titleElement = container.querySelector(`.${styles.title}`);
    const subtitleElement = container.querySelector(`.${styles.subtitle}`);

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it('passes correct props to Text components', () => {
    const title = 'Test Title';
    const subtitle = 'Test Subtitle';
    const { getByText } = render(<TextBlock title={title} subtitle={subtitle} />);

    const titleElement = getByText(title);
    const subtitleElement = getByText(subtitle);

    expect(titleElement).toHaveClass(styles.title);
    expect(titleElement.tagName.toLowerCase()).toBe('p'); // Assuming Text renders as <p> by default
    expect(subtitleElement).toHaveClass(styles.subtitle);
    expect(subtitleElement.tagName.toLowerCase()).toBe('p'); // Assuming Text renders as <p> by default
  });
});
