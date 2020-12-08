import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import React from 'react';

export function Page(props) {
  return <PageNoScroll>
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
  </PageNoScroll>;
}

/**
 * 非滚动页
 * @param props
 * @returns {*}
 * @constructor
 */
export function PageNoScroll(props) {
  return <SafeAreaView
    {...props}
    style={[
      {flex: 1, borderWidth: 0}, props.style || {},
    ]}
  >
    {props.children}
  </SafeAreaView>;
}

export function PanelTitle(props) {
  return <View
    style={{
      backgroundColor: '#ccc',
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
