import { useState } from 'react';

export const useSearchLogic = (initialSearch: string) => {
  const [searchValue, setSearchValue] = useState(initialSearch);

  const handleInputChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearch = (callback: (value: string) => void) => {
    callback(searchValue);
  };

  return {
    searchValue,
    handleInputChange,
    handleSearch,
  };
};

