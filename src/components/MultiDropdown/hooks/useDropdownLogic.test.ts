import { renderHook, act } from '@testing-library/react-hooks';
import { useDropdownLogic } from './useDropdownLogic';
import DropdownStore, { Option } from '@store/MultiDropdownStore/MultiDropdownStore';

import { vi } from 'vitest';

const mockOptions: Option[] = [
  { key: '1', value: 'Option 1' },
  { key: '2', value: 'Option 2' },
  { key: '3', value: 'Option 3' },
];

const createMockStore = (): DropdownStore => ({
  filter: '',
  isOpen: false,
  isTyping: false,
  // @ts-ignore
  value: '',
  setOpen: vi.fn(),
  setTyping: vi.fn(),
  setFilter: vi.fn(),
  setValue: vi.fn(),
});

describe('useDropdownLogic', () => {
  it('filters options based on dropdownStore filter', () => {
    const store = createMockStore();
    store.filter = '1';

    const { result } = renderHook(() => useDropdownLogic(mockOptions, store));

    expect(result.current.filteredOptions).toEqual([{ key: '1', value: 'Option 1' }]);
  });

  it('calls setOpen and setTyping when onClickDropdown is called', () => {
    const store = createMockStore();

    const { result } = renderHook(() => useDropdownLogic(mockOptions, store));

    act(() => {
      result.current.onClickDropdown();
    });

    expect(store.setOpen).toHaveBeenCalledWith(true);
    expect(store.setTyping).toHaveBeenCalledWith(true);
  });

  it('does nothing when onClickDropdown is called and disabled is true', () => {
    const store = createMockStore();

    const { result } = renderHook(() => useDropdownLogic(mockOptions, store, true));

    act(() => {
      result.current.onClickDropdown();
    });

    expect(store.setOpen).not.toHaveBeenCalled();
    expect(store.setTyping).not.toHaveBeenCalled();
  });
});
