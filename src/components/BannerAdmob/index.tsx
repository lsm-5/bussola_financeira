import React from 'react';
import {AdMobBanner} from 'react-native-admob';
import Config from 'react-native-config';
import * as Sentry from '@sentry/react-native';

import {Container} from './styles';

const BannerAdmob: React.FC = () => {
  return (
    <Container>
      <AdMobBanner
        adSize="banner"
        adUnitID={Config.ADMOB_BANNER_ID}
        setTestDeviceIDAsync
        servePersonalizedAds
        onAdFailedToLoad={(error: string) => Sentry.captureException(error)}
      />
    </Container>
  );
};

export default BannerAdmob;
