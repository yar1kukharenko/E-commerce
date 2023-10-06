import classNames from 'classnames';
import * as React from 'react';

import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
  id: string;
};
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, className, onChange, afterSlot, disabled, id, ...props }, ref) => {
    const changeHandler = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange],
    );
    return (
      <label
        htmlFor={id}
        className={classNames(styles.input_wrapper, disabled && styles.input_wrapper_disabled, className)}
      >
        <input
          id="id"
          value={value}
          onChange={changeHandler}
          className={styles.input}
          ref={ref}
          disabled={disabled}
          type="text"
          {...props}
        />
        {!!afterSlot && <div className={styles.input_after}>{afterSlot}</div>}
      </label>
    );
  },
);
Input.displayName = 'Input';
export default Input;
