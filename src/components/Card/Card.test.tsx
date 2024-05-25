import { render, fireEvent } from '@testing-library/react';
import Card from './Card';
import React from 'react';
import { vi } from 'vitest';
import styles from './Card.module.scss';
import { CONFIG } from '@config/config';

describe('Card component', () => {
  const mockTitle = 'Card Title';
  const mockSubtitle = 'Card Subtitle';
  const mockImage = 'https://via.placeholder.com/150';
  const mockImageBroken = 'https://via.placeholder.com/broken';
  const mockCaptionSlot = <div>Caption Slot</div>;
  const mockContentSlot = <div>Content Slot</div>;
  const mockActionSlot = <div>Action Slot</div>;

  it('renders correctly with default props', () => {
    const { container, getByText } = render(<Card title={mockTitle} subtitle={mockSubtitle} images={[mockImage]} />);
    const titleElement = getByText(mockTitle);
    const subtitleElement = getByText(mockSubtitle);
    const imgElement = container.querySelector('img');

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockImage);
    expect(container.querySelector(`.${styles.card}`)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <Card title={mockTitle} subtitle={mockSubtitle} images={[mockImage]} className={customClass} />,
    );
    expect(container.querySelector(`.${customClass}`)).toBeInTheDocument();
  });

  it('renders caption slot correctly', () => {
    const { getByText } = render(
      <Card title={mockTitle} subtitle={mockSubtitle} images={[mockImage]} captionSlot={mockCaptionSlot} />,
    );
    expect(getByText('Caption Slot')).toBeInTheDocument();
  });

  it('renders content slot correctly', () => {
    const { getByText } = render(
      <Card title={mockTitle} subtitle={mockSubtitle} images={[mockImage]} contentSlot={mockContentSlot} />,
    );
    expect(getByText('Content Slot')).toBeInTheDocument();
  });

  it('renders action slot correctly', () => {
    const { getByText } = render(
      <Card title={mockTitle} subtitle={mockSubtitle} images={[mockImage]} actionSlot={mockActionSlot} />,
    );
    expect(getByText('Action Slot')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <Card title={mockTitle} subtitle={mockSubtitle} images={[mockImage]} onClick={handleClick} />,
    );
    const cardElement = getByRole('button');
    fireEvent.click(cardElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick handler when Enter key is pressed', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <Card title={mockTitle} subtitle={mockSubtitle} images={[mockImage]} onClick={handleClick} />,
    );
    const cardElement = getByRole('button');
    fireEvent.keyPress(cardElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders placeholder image on image error', () => {
    const { container } = render(<Card title={mockTitle} subtitle={mockSubtitle} images={[mockImageBroken]} />);
    const imgElement = container.querySelector('img');
    // @ts-ignore
    fireEvent.error(imgElement);
    expect(imgElement).toHaveAttribute('src', CONFIG.PLACEHOLDERIMAGE);
  });
});
