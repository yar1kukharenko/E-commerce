import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';
import React from 'react';
import styles from './Input.module.scss';

describe('Input component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Input id="test-input" value="" onChange={() => {}} />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(styles.input);
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(<Input id="test-input" value="" onChange={() => {}} className={customClass} />);
    const wrapper = container.querySelector('label');
    expect(wrapper).toHaveClass(customClass);
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    const { getByRole } = render(<Input id="test-input" value="" onChange={handleChange} />);
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledWith('new value');
  });

  it('renders afterSlot correctly', () => {
    const afterSlot = <div>After Slot</div>;
    const { getByText } = render(<Input id="test-input" value="" onChange={() => {}} afterSlot={afterSlot} />);
    expect(getByText('After Slot')).toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    const { getByRole } = render(<Input id="test-input" value="" onChange={() => {}} disabled />);
    const input = getByRole('textbox');
    expect(input).toBeDisabled();
  });
});
