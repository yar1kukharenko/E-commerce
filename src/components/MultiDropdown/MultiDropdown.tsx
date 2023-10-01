import { observer } from 'mobx-react-lite';

import classNames from 'classnames';
import * as React from 'react';

import ArrowDownIcon from '@components/icons/ArrowDownIcon';
import Input from '@components/Input';
import OptionItem from '@components/MultiDropdown/components/Option';
import { useOutsideClick } from '@components/MultiDropdown/hooks/UseOnDocumentClick';
import { Option } from '@store/MultiDropdownStore/MultiDropdownStore';

import DropdownStoreContext from '../../context/DropdownStoreContext';

import { useDropdownLogic, UseSelectedOptions } from './hooks';
import styles from './MultiDropdown.module.scss';

export type MultiDropDownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};
const MultiDropDown: React.FC<MultiDropDownProps> = ({ className, getTitle, options, disabled, onChange, value }) => {
  const dropdownStore = React.useContext(DropdownStoreContext);
  if (!dropdownStore) {
    throw new Error('DropdownStore is not available!');
  }

  const { filteredOptions, onClickDropdown } = useDropdownLogic(options, dropdownStore, disabled);
  const { onClickOption } = UseSelectedOptions(onChange, dropdownStore, disabled);
  const title = React.useMemo(() => getTitle(value), [getTitle, value]);

  const inputValue = React.useMemo(() => {
    if (!dropdownStore.isOpen) {
      return value.length === 0 ? '' : title;
    }
    return dropdownStore.isTyping ? dropdownStore.filter : '';
  }, [dropdownStore.isOpen, dropdownStore.isTyping, value.length, title, dropdownStore.filter]);

  const setFilter = (val: string) => {
    dropdownStore.setFilter(val);
  };

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const selectedSet = React.useMemo(() => new Set(value.map((v) => v.key)), [value]);

  useOutsideClick({
    ref: rootRef,
    onOutsideClick: () => {
      dropdownStore.reset();
    },
  });

  return (
    <div
      className={classNames(
        styles.dropdown,
        disabled && styles.dropdown_disabled,
        dropdownStore.isOpen && styles.dropdown_open,
        className,
      )}
      ref={rootRef}
    >
      <Input
        id="multiDropdown"
        className={styles.dropdown__input}
        value={inputValue}
        onClick={onClickDropdown}
        placeholder={title}
        onChange={setFilter}
        afterSlot={<ArrowDownIcon color="secondary" width={24} height={24} />}
      />
      {dropdownStore.isOpen && (
        <div className={styles.dropdown__options}>
          {filteredOptions.map((o) => (
            <OptionItem
              onClick={() => onClickOption(o)}
              key={o.key}
              className={selectedSet.has(o.key) ? styles.dropdown__option_selected : 'not_selected'}
            >
              {o.value}
            </OptionItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(MultiDropDown);
