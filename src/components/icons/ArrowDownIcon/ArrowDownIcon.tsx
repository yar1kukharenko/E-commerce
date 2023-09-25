import * as React from 'react';

import Icon, { IconProps } from '@components/icons/Icon';

const ArrowDownIcon: React.FC<IconProps> = (props) => (
  <Icon {...props} viewBox="0 0 24 24">
    <path
      id="vector"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
      fill="currentColor"
    />
  </Icon>
);

export default ArrowDownIcon;