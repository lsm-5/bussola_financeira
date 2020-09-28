import React from 'react';
import {View} from 'react-native';
import {AdMobBanner} from 'react-native-admob';
import Config from 'react-native-config';
import * as Sentry from '@sentry/react-native';

// import { Container } from './styles';

const BannerAdmob: React.FC = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        paddingTop: 5,
      }}>
      <AdMobBanner
        adSize="banner"
        adUnitID={Config.ADMOB_BANNER_ID}
        setTestDeviceIDAsync
        servePersonalizedAds
        onAdFailedToLoad={(error) => Sentry.captureException(error)}
      />
    </View>
  );
};

export default BannerAdmob;
