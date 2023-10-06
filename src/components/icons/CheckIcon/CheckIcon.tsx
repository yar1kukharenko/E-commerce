import * as React from 'react';

import Icon, { IconProps } from '@components/icons/Icon';

const CheckIcon: React.FC<IconProps> = (props) => (
  <Icon {...props} viewBox="0 0 24 24">
    <path id="vector" d="M4 11.6129L9.87755 18L20 7" stroke="currentColor" strokeWidth="2" />
  </Icon>
);

export default CheckIcon;
