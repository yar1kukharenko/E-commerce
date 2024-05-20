import { renderHook, act } from '@testing-library/react-hooks';
import { UseSelectedOptions } from './useSelectedOptions';
import DropdownStore, { Option } from '@store/MultiDropdownStore/MultiDropdownStore';
import { vi } from 'vitest';

describe('UseSelectedOptions', () => {
  let store: DropdownStore;
  let mockOnChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    store = new DropdownStore();
    mockOnChange = vi.fn();
  });

  it('should toggle option and call onChange when not disabled', () => {
    const option: Option = { key: '1', value: 'Option 1' };
    const { result } = renderHook(() => UseSelectedOptions(mockOnChange, store));

    act(() => {
      result.current.onClickOption(option);
    });

    expect(store.value).toEqual([option]);
    expect(mockOnChange).toHaveBeenCalledWith([option]);

    act(() => {
      result.current.onClickOption(option);
    });

    expect(store.value).toEqual([]);
    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it('should not toggle option or call onChange when disabled', () => {
    const option: Option = { key: '1', value: 'Option 1' };
    const { result } = renderHook(() => UseSelectedOptions(mockOnChange, store, true));

    act(() => {
      result.current.onClickOption(option);
    });

    expect(store.value).toEqual([]);
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
