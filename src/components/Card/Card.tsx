import classNames from 'classnames';
import * as React from 'react';

import Text from '@components/Text';
import { CONFIG } from '@config/config';

import styles from './Card.module.scss';

export type CardProps = {
  className?: string;
  images: string[] | null;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  onClick,
  actionSlot,
  contentSlot,
  captionSlot,
  subtitle,
  title,
  images,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && onClick) {
      onClick(event as unknown as React.MouseEvent<HTMLDivElement>); // Приводим к MouseEvent, так как onClick ожидает MouseEvent
    }
  };

  const [currentImage, setCurrentImage] = React.useState(images && images[0] ? images[0] : CONFIG.PLACEHOLDERIMAGE);
  const handleImageError = () => {
    setCurrentImage(CONFIG.PLACEHOLDERIMAGE);
  };
  // const displayedImage = images && images[0] ? images[0] : CONFIG.PLACEHOLDERIMAGE;
  return (
    <div
      role="button"
      onKeyPress={handleKeyDown}
      tabIndex={0}
      className={classNames(styles.card, className)}
      onClick={onClick}
    >
      <div className={styles.card__header}>
        <img className={styles.img} src={currentImage} onError={handleImageError} alt="card" />
      </div>
      <div className={styles.card__body}>
        {captionSlot && (
          <Text className={styles.card__caption} view="p-14" weight="medium" color="secondary">
            {captionSlot}
          </Text>
        )}
        <Text maxLines={2} tag="h4" view="p-20" weight="bold" color="primary">
          {title}
        </Text>
        <Text maxLines={3} className={styles.card__subtitle} view="p-16" color="secondary">
          {subtitle}
        </Text>
        <div className={styles.card__footer}>
          {contentSlot && (
            <Text view="p-18" weight="bold" className={styles.card__content}>
              {contentSlot}
            </Text>
          )}
          <div className={styles.card__action}>{actionSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
