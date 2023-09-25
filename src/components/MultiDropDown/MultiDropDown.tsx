import classNames from 'classnames';
import * as React from 'react';

import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import Input from 'components/Input';
import Text from 'components/Text';

import styles from './MultiDropDown.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropDownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};
const MultiDropDown: React.FC<MultiDropDownProps> = ({ className, getTitle, options, disabled, onChange, value }) => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [filter, setFilter] = React.useState('');

  const selectedSet = React.useMemo(() => new Set(value), [value]);

  const filteredOptions = React.useMemo(
    () => options.filter((o) => o.value.toLowerCase().includes(filter.toLowerCase())),
    [options, filter],
  );

  const onClickDropdown = React.useCallback(() => {
    if (disabled) {
      return;
    }

    setIsOpen(true);
    setIsTyping(true);
  }, [disabled]);

  const onClickOption = (selectedOption: Option) => {
    if (disabled) {
      return;
    }
    setIsTyping(false);
    if (value.some((o) => o.key === selectedOption.key)) {
      onChange(value.filter((o) => o.key !== selectedOption.key));
      return;
    }
    onChange([...value, selectedOption]);
  };

  React.useEffect(() => {
    const onDocumentClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Element)) {
        setIsOpen(false);
        setIsTyping(false);
        setFilter('');
      }
    };
    document.addEventListener('click', onDocumentClick);
    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);
  React.useEffect(() => {
    if (disabled) {
      setIsOpen(false);
      setIsTyping(false);
      setFilter('');
    }
  }, [disabled]);
  const title = React.useMemo(() => getTitle(value), [getTitle, value]);

  const inputValue = React.useMemo(() => {
    if (!isOpen) {
      if (value.length === 0) {
        return '';
      }

      return title;
    }
    if (isTyping) {
      return filter;
    }
    return '';
  }, [isOpen, isTyping, value.length, title, filter]);

  return (
    <div
      className={classNames(
        styles.dropdown,
        disabled && styles.dropdown_disabled,
        isOpen && styles.dropdown_open,
        className,
      )}
      ref={rootRef}
    >
      <Input
        className={styles.dropdown__input}
        value={inputValue}
        onClick={onClickDropdown}
        placeholder={title}
        onChange={setFilter}
        afterSlot={<ArrowDownIcon color="secondary" width={24} height={24} />}
      />
      {isOpen && (
        <div className={styles.dropdown__options}>
          {filteredOptions.map((o) => (
            <button
              type="button"
              onClick={() => onClickOption(o)}
              key={o.key}
              className={classNames(styles.dropdown__option, selectedSet.has(o) && styles.dropdown__option_selected)}
            >
              <Text view="p-16">{o.value}</Text>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropDown;