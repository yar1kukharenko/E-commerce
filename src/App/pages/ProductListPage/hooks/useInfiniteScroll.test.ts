import { renderHook } from '@testing-library/react-hooks';
import { useInfiniteScroll } from './useInfiniteScroll';
import { vi } from 'vitest';

describe('useInfiniteScroll', () => {
  let callback: jest.Mock;

  beforeEach(() => {
    // @ts-ignore
    callback = vi.fn();
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 800,
    });
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      value: 0,
    });
    Object.defineProperty(document.documentElement, 'offsetHeight', {
      writable: true,
      value: 2000,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('calls the callback when scrolled to the bottom and hasNextPage is true', () => {
    renderHook(() => useInfiniteScroll(callback, true));

    document.documentElement.scrollTop = 1500;
    window.dispatchEvent(new Event('scroll'));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call the callback when scrolled to the bottom and hasNextPage is false', () => {
    renderHook(() => useInfiniteScroll(callback, false));

    document.documentElement.scrollTop = 1500;
    window.dispatchEvent(new Event('scroll'));

    expect(callback).not.toHaveBeenCalled();
  });

  it('removes the scroll event listener on cleanup', () => {
    const { unmount } = renderHook(() => useInfiniteScroll(callback, true));

    unmount();

    document.documentElement.scrollTop = 1500;
    window.dispatchEvent(new Event('scroll'));

    expect(callback).not.toHaveBeenCalled();
  });
});
