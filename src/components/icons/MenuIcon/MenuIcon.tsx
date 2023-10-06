import * as React from 'react';

import Icon, { IconProps } from '@components/icons/Icon';

type MenuIconProps = IconProps & {
  isOpen?: boolean;
};

const MenuIcon: React.FC<MenuIconProps> = ({ isOpen = false, ...props }) => (
    <Icon {...props} viewBox="0 0 64 64">
      {isOpen ? (
        <path
          data-name="layer1"
          d="M53.122 48.88L36.243 32l16.878-16.878a3 3 0 0 0-4.242-4.242L32 27.758l-16.878-16.88a3 3 0 0 0-4.243 4.243l16.878 16.88-16.88 16.88a3 3 0 0 0 4.243 4.241L32 36.243l16.878 16.88a3 3 0 0 0 4.244-4.243z"
          fill="#202020"
        />
      ) : (
        <>
          <path
            data-name="layer2"
            fill="none"
            stroke="#202020"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M14 18h36M14 32h36"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            data-name="layer1"
            fill="none"
            stroke="#202020"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M14 46h36"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </>
      )}
    </Icon>
  );

export default MenuIcon;
