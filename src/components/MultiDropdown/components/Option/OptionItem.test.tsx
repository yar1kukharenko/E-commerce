import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import OptionItem from './OptionItem';
import React from 'react';
import styles from '@components/MultiDropdown/MultiDropdown.module.scss';

describe('OptionItem component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(
      <OptionItem key="test" onClick={() => {}}>
        Test Option
      </OptionItem>,
    );
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.dropdown__option);
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <OptionItem key="test" className={customClass} onClick={() => {}}>
        Test Option
      </OptionItem>,
    );
    const button = container.querySelector('button');
    expect(button).toHaveClass(customClass);
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <OptionItem key="test" onClick={() => {}}>
        Test Option
      </OptionItem>,
    );
    expect(getByText('Test Option')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <OptionItem key="test" onClick={handleClick}>
        Test Option
      </OptionItem>,
    );
    const button = getByText('Test Option');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
