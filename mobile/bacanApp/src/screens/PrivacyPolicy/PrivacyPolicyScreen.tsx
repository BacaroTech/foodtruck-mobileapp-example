import React from 'react';

import { WebView } from 'react-native-webview';

const PrivacyPolicyScreen = () => {

    return (
        <WebView source={{ uri: 'https://app.bacarotruckfoodapp.ovh/bacarotruck/privacy' }} />
    );
};

export { PrivacyPolicyScreen };
