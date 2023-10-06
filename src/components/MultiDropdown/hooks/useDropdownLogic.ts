import * as React from 'react';

import multiDropdownStore, { Option } from '@store/MultiDropdownStore/MultiDropdownStore';

type UseDropdownLogicReturn = {
  filteredOptions: Option[];
  onClickDropdown: () => void;
};

export const useDropdownLogic = (
  options: Option[],
  dropdownStore: multiDropdownStore,
  disabled: boolean = false,
): UseDropdownLogicReturn => {
  const filteredOptions = options.filter((o) => o.value.toLowerCase().includes(dropdownStore.filter.toLowerCase()));

  const onClickDropdown = React.useCallback(() => {
    if (disabled) {
      return;
    }
    dropdownStore.setOpen(true);
    dropdownStore.setTyping(true);
  }, [disabled, dropdownStore]);

  return {
    filteredOptions,
    onClickDropdown,
  };
};
