import classNames from 'classnames';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowRightIcon from '@components/icons/ArrowRightIcon';
import Text from '@components/Text';

import styles from './BackButton.module.scss';

export type BackButtonProps = {
  className?: string;
};

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleBack();
    }
  };
  return (
    <div
      className={classNames(styles.backButton, className)}
      role="button"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onClick={handleBack}
    >
      <ArrowRightIcon width={32} height={32} />
      <Text view="p-20">Back</Text>
    </div>
  );
};

export default BackButton;