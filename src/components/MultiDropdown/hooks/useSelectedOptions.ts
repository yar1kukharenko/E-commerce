import multiDropdownStore, { Option } from '@store/MultiDropdownStore/MultiDropdownStore';

type UseSelectedOptionsReturn = {
  onClickOption: (selectedOption: Option) => void;
};

export const UseSelectedOptions = (
  onChange: (value: Option[]) => void,
  dropdownStore: multiDropdownStore,
  disabled: boolean = false,
): UseSelectedOptionsReturn => {
  const onClickOption = (selectedOption: Option) => {
    if (disabled) {
      return;
    }
    dropdownStore.toggleOption(selectedOption);
    onChange(dropdownStore.value);
  };

  return {
    onClickOption,
  };
};