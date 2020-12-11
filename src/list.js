import {FlatList,Animated, Text, View} from 'react-native';
import React from 'react';
import {_Loading, _NoMoreData, _Search, _TouchableHighlight} from './form/base-com';
import styles from './style';

/**
 * 注意
 * 1. 和其他组件套用，需提供设置高度的容器
 */
export class _FlatList extends React.PureComponent {

  state = {
    list: new Array(25).fill(1).map((item, index) => ({label: '河南' + index, value: '1' + index})),
    value: '',
  };

  _renderItem({item}) {
    return <_TouchableHighlight
      style={[
        styles.flexRow,
        styles.radioItem,
        {
          backgroundColor: '#fff',
          paddingTop: 15,
          paddingBottom: 15,
        }]}
    ><Text>{item.label}</Text></_TouchableHighlight>;
  }

  render() {
    const {state, props} = this;
    return <Animated.FlatList
      data={this.state.list}
      refreshing={false}
      scrollEventThrottle={1}
      onRefresh={() => {
      }}
      onScroll={props.onScroll}
      style={{
        flex: 1,
        borderColor: 'red',
        borderWidth: 0,
      }}
      ListHeaderComponent={<_Search></_Search>}
      stickyHeaderIndices={[0]}
      ListHeaderComponentStyle={{
        height: 50,
      }}
      ListEmptyComponent={<_Loading></_Loading>}
      ListFooterComponent={<_NoMoreData/>}
      onEndReached={() => {
      }}
      onEndReachedThreshold={30}
      keyExtractor={(item, index) => item.value}
      renderItem={this._renderItem}
      ItemSeparatorComponent={() => <View
        style={{borderTopWidth: 0.5, borderColor: '#eee', height: 0.5}}><Text></Text></View>}
    >
    </Animated.FlatList>;
  }
}
