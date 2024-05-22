import { render, fireEvent, waitFor } from '@testing-library/react';
import MultiDropDown from './MultiDropdown';
import React from 'react';
import { vi } from 'vitest';
import rootStore from '@store/RootStore';
import { Option } from '@store/MultiDropdownStore/MultiDropdownStore';

vi.mock('@store/RootStore', () => ({
  __esModule: true,
  default: {
    dropdown: {
      isOpen: false,
      isTyping: false,
      filter: '',
      value: [],
      setOpen: vi.fn(),
      setTyping: vi.fn(),
      setFilter: vi.fn(),
      toggleOption: vi.fn(),
      reset: vi.fn(),
    },
  },
}));

const mockOptions: Option[] = [
  { key: '1', value: 'Option 1' },
  { key: '2', value: 'Option 2' },
  { key: '3', value: 'Option 3' },
];

describe('MultiDropDown component', () => {
  const mockOnChange = vi.fn();
  const mockGetTitle = (value: Option[]) => value.map((v) => v.value).join(', ');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { container } = render(
      <MultiDropDown options={mockOptions} value={[]} onChange={mockOnChange} getTitle={mockGetTitle} />,
    );

    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('opens dropdown on input click', async () => {
    const { getByPlaceholderText } = render(
      <MultiDropDown options={mockOptions} value={[]} onChange={mockOnChange} getTitle={mockGetTitle} />,
    );

    const input = getByPlaceholderText('');
    fireEvent.click(input);

    await waitFor(() => {
      expect(rootStore.dropdown.setOpen).toHaveBeenCalledWith(true);
      expect(rootStore.dropdown.setTyping).toHaveBeenCalledWith(true);
    });
  });

  // it('filters options based on input value', async () => {
  //   const { getByPlaceholderText, getByText } = render(
  //     <MultiDropDown options={mockOptions} value={[]} onChange={mockOnChange} getTitle={mockGetTitle} />,
  //   );
  //
  //   const input = getByPlaceholderText('');
  //   fireEvent.click(input);
  //   fireEvent.change(input, { target: { value: '1' } });
  //
  //   await waitFor(() => {
  //     expect(rootStore.dropdown.setFilter).toHaveBeenCalledWith('1');
  //     expect(getByText('Option 1')).toBeInTheDocument();
  //   });
  // });

  // it('selects and deselects options', async () => {
  //   const { getByPlaceholderText, getByText } = render(
  //     <MultiDropDown options={mockOptions} value={[]} onChange={mockOnChange} getTitle={mockGetTitle} />,
  //   );
  //
  //   const input = getByPlaceholderText('');
  //   fireEvent.click(input);
  //
  //   const option1 = await waitFor(() => getByText('Option 1'));
  //   fireEvent.click(option1);
  //
  //   await waitFor(() => {
  //     expect(rootStore.dropdown.toggleOption).toHaveBeenCalledWith({ key: '1', value: 'Option 1' });
  //     expect(mockOnChange).toHaveBeenCalledWith([{ key: '1', value: 'Option 1' }]);
  //   });
  //
  //   fireEvent.click(option1);
  //
  //   await waitFor(() => {
  //     expect(rootStore.dropdown.toggleOption).toHaveBeenCalledWith({ key: '1', value: 'Option 1' });
  //     expect(mockOnChange).toHaveBeenCalledWith([]);
  //   });
  // });

  it('calls reset when clicking outside the dropdown', async () => {
    const { getByPlaceholderText } = render(
      <MultiDropDown options={mockOptions} value={[]} onChange={mockOnChange} getTitle={mockGetTitle} />,
    );

    const input = getByPlaceholderText('');
    fireEvent.click(input);

    fireEvent.mouseDown(document);

    await waitFor(() => {
      expect(rootStore.dropdown.reset).toHaveBeenCalled();
    });
  });
});
