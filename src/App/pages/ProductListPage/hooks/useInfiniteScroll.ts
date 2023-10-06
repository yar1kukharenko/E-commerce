import { useEffect } from 'react';

type InfiniteScrollCallback = () => void;

export const useInfiniteScroll = (callback: InfiniteScrollCallback, hasNextPage: boolean) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 &&
        hasNextPage
      ) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback, hasNextPage]);
};
