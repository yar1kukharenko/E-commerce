import * as React from 'react';

import Header from '@components/Header';
import Text from '@components/Text';
import TextBlock from '@components/TextBlock';

import styles from './AboutUsPage.module.scss';

const AboutUsPage = () => (
  <>
    <Header />
    <div className="container">
      <TextBlock title="About Us" subtitle="A little history about our company." />
      <div className={styles.text}>
        <div className={styles.textBlock}>
          <Text view="p-20" tag="h2" className={styles.subheading} weight="bold">
            Company History
          </Text>
          <Text view="p-16" className={styles.p}>
            Founded in&nbsp;2000, our&nbsp;store started with a&nbsp;small selection of&nbsp;home goods. Since then, we
            have expanded significantly and&nbsp;now offer a wide range of&nbsp;products from electronics
            to&nbsp;clothing.
          </Text>
        </div>
        <div className={styles.textBlock}>
          <Text view="p-20" tag="h2" className={styles.subheading} weight="bold">
            Mission
          </Text>
          <Text view="p-16" className={styles.p}>
            We strive to&nbsp;offer top quality items at&nbsp;affordable prices so that everyone can enjoy comfort and
            style in&nbsp;their&nbsp;home.
          </Text>
        </div>
        <div className={styles.textBlock}>
          <Text view="p-20" tag="h2" className={styles.subheading} weight="bold">
            Products or Services
          </Text>
          <Text view="p-16" className={styles.p}>
            We offer eco-friendly home goods including furniture, linens and kitchenware.
          </Text>
        </div>
        <address className={styles.textBlock}>
          <Text view="p-20" tag="h2" className={styles.subheading} weight="bold">
            Contacts
          </Text>
          <Text view="p-16" className={styles.p}>
            Address: 10 Lenina str.
          </Text>
          <Text view="p-16" className={styles.p}>
            Phone: <a href="tel:+79001234567">+7 900 123-45-67</a>
          </Text>
          <Text view="p-16" className={styles.p}>
            E-mail: <a href="mailto:info@yourstore.com">info@yourstore.com</a>
          </Text>
        </address>
      </div>
    </div>
  </>
);

export default AboutUsPage;
