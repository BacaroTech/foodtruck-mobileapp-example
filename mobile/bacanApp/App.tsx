/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { BacaCore } from 'src/core/BacaCore';
import { BacarotruckNavigation } from 'src/core/BacarotruckNavigation';

function App(): React.JSX.Element {

  return (
    <BacaCore>
      <BacarotruckNavigation />
    </BacaCore>
  );
}

export default App;
