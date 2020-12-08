import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

/**
 * 搜索-选择框
 * @param {*} props
 */
export function SearchSelect(props) {
  let [search, setSearch] = useState('');
  return (
    <View
      onLayout={(event) => {
        props.onLayout && props.onLayout(event);
      }}
      style={{
        backgroundColor: props.bgColor || '#FFF',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingTop: 5,
      }}>
      <View
        style={{
          padding: 5,
          paddingLeft: 10,
          backgroundColor: props.searchColor || '#F5F5F5',
          borderWidth: 0,
          borderRadius: 2,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/*<Image*/}
        {/*  source={require('../assets/images/project/search.png')}></Image>*/}
        <TextInput
          // inlineImageLeft={'../assets/images/project/search.png'}
          inlineImagePadding={1}
          multiline={false}
          onChangeText={(text) => {
            console.log('123123');
            setSearch(text);
          }}
          returnKeyLabel={'搜索'}
          style={{
            width: '100%',
            padding: 0,
            paddingLeft: 10,
            fontSize: 13,
          }}
          returnKeyType={'search'}
          placeholder={props.placeholder || '请输入项目'}
          clearButtonMode="always"
          autoCorrect={false}
          onEndEditing={() => console.log('onEndEditing')}
          onSubmitEditing={(v) => {
            if (props.search) {
              props.search(search);
            }
          }}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
  return (
    <View>
      <Text>SearchBar</Text>
    </View>
    // <SearchBar
    //   containerStyle={{
    //       backgroundColor: '#FFF',
    //       borderTopWidth: 0,
    //       borderBottomWidth: 0,
    //       borderColor: '#FFF',
    //       paddingLeft: 20,
    //       paddingRight: 20,
    //   }}
    //   inputContainerStyle={{
    //       backgroundColor: '#F5F5F5',
    //       borderWidth: 0,
    //   }}
    //   inputStyle={{
    //       color: '#C0C0C0',
    //   }}
    //   // placeholder={props.placeholder}
    //   {...props}
    //   // onChangeText={this.updateSearch}
    //   // value={search}
    // />
  );
}

export default SearchSelect;

