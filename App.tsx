/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {HotUpdater, useHotUpdaterStore} from '@hot-updater/react-native';
import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import {version} from './package.json';
import {APP_ENV_UPDATE_SERVER_URI} from '@env';

function App(): React.JSX.Element {
  const [bundleId, setBundleId] = useState<string | null>(null);

  useEffect(() => {
    const bundleId = HotUpdater.getBundleId();
    setBundleId(bundleId);
  }, []);

  const {progress} = useHotUpdaterStore();

  return (
    <SafeAreaView>
      <Text>Testing new version</Text>
      <Text>Babel {HotUpdater.getBundleId()}</Text>
      <Text
        style={{
          marginVertical: 20,
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Hot Updater 0
      </Text>

      <Text
        style={{
          marginVertical: 20,
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Version: v{version}
      </Text>

      <Text
        style={{
          marginVertical: 20,
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Update {Math.round(progress * 100)}%
      </Text>
      <Text
        style={{
          marginVertical: 20,
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        BundleId: {bundleId}
      </Text>

      <Header />

      <Button title="Reload" onPress={() => HotUpdater.reload()} />
      <Button
        title="HotUpdater.runUpdateProcess()"
        onPress={() =>
          HotUpdater.runUpdateProcess({
            source: APP_ENV_UPDATE_SERVER_URI,
          }).then(status => {
            console.log('Update process completed', JSON.stringify(status));
          })
        }
      />
    </SafeAreaView>
  );
}

export default HotUpdater.wrap({
  source: APP_ENV_UPDATE_SERVER_URI,
  fallbackComponent: ({progress, status}) => (
    <View
      style={{
        flex: 1,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
        {status === 'UPDATING' ? 'Updating...' : 'Checking for Update...'}
      </Text>
      {progress > 0 ? (
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          {Math.round(progress * 100)}%
        </Text>
      ) : null}
    </View>
  ),
})(App);
