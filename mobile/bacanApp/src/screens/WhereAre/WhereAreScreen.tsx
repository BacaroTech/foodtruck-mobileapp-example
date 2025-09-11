import * as React from 'react';

import {
  Text,
  View,
} from 'react-native';
import { BaseScreen } from 'src/components';
import { useCommonData } from 'src/context';
import GeneralStyle from 'src/utils/GeneralStyle';
import tw from 'twrnc';

const InternalWhereAreScreen = () => {
  const { whereWeekView } = useCommonData();

  return (
    <View style={[tw`p-5 flex flex-col w-full`]}>
      {whereWeekView.map((place) => {
        return (
          <View key={place.day}>
            <Text style={[tw`text-center text-4xl mt-5 capitalize`, GeneralStyle.title]}>{place.day}</Text>
            {
              place.where.map(w => {
                return (
                  <View>
                    <Text style={[tw`text-center text-3xl mt-2 capitalize`, GeneralStyle.text]}>{w.address}</Text>
                    <Text style={[tw`text-center text-3xl mt-2 capitalize`, GeneralStyle.text]}>{w.rangeTime}</Text>
                  </View>
                );
              })
            }

          </View>
        );
      })}
    </View>
  );
};
const WhereAreScreen = (prop: any) => {
  return <BaseScreen subtitle={'Dove siamo'}>
    <InternalWhereAreScreen {...prop} />
  </BaseScreen>;
};
export { WhereAreScreen };
