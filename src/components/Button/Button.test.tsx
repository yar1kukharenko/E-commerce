import { render, fireEvent } from '@testing-library/react';
import Button from './Button';
import React from 'react';
import { vi } from 'vitest';
import styles from './Button.module.scss';

describe('Button component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Button>Click me</Button>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.button);
    expect(button).not.toBeDisabled();
    expect(container.querySelector(`.${styles.button__loader}`)).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(<Button className={customClass}>Click me</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass(customClass);
  });

  it('renders loader when loading is true', () => {
    const { container } = render(<Button loading>Click me</Button>);
    const loader = container.querySelector(`.${styles.button__loader}`);
    expect(loader).toBeInTheDocument();
  });

  it('disables button when loading is true', () => {
    const { container } = render(<Button loading>Click me</Button>);
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('disables button when disabled is true', () => {
    const { container } = render(<Button disabled>Click me</Button>);
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass(styles.button_disabled);
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders children correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });
});
