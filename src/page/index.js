import {SafeAreaView, ScrollView, Text,View} from 'react-native';
import React from 'react';

export function Page(props) {
  return <SafeAreaView
    style={{flex: 1,borderWidth: 0}}
    onLayout={(event) => {
      let {x, y, width, height} = event.nativeEvent.layout;
      console.log(x, y, width, height);
    }}
  >
    <ScrollView
      style={{borderWidth: 0}}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          background: '#fff',
        }}
      >
        {props.children}
      </View>
    </ScrollView>
  </SafeAreaView>;
}

export function PanelTitle(props) {
  return <View
    style={{
      backgroundColor:'#ccc',
      paddingBottom: 15,
      paddingTop: 15,
    }}
  >
    <Text
      style={{
        paddingLeft: 20,
        fontSize: 18,
      }}
    >{props.title}</Text>
  </View>;
}
