import {Image, Modal,TextInput, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

/**
 * 列表搜索框
 * @param {*} props
 */
export function SearchBarCustom(props) {
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

/**
 *
 * 列表筛选框
 * @param {
 * datas:[
    {
        label:'所有状态',
        items:[
    {name:'所有状态',val:''},
    {name:'进行中',val:'ongo'},
        ]
    },
    {
        label:'所有时间',
        items:[
    {name:'所有',val:''},
    {name:'最近一周',val:'lastest week'},
        ]
    }
        ]
 * onFilter:(filter)=>{
        console.log(filter);
    }
 *} props
 */
export function InlineFilter(props) {
  let [filter, setFilter] = useState({
    show: false,
    label: '', //标签名称
    name: '', //字段名称
    query: props.query || { //当前过滤条件
    },
    items: [],
  });
  useEffect(() => {
    console.log(props.query.statusLabel);
    setFilter(Object.assign({}, filter, {query: {statusLabel: props.query.statusLabel}}));
  }, [props.query.statusLabel]);
  console.log(props.getData());
  return (
    <View
      style={{
        height: 40,
        zIndex: 999,
        overflow: 'visible',
        position: 'relative',
        top: 0, bottom: 0, left: 0, right: 0,
        backgroundColor: '#eee',
      }}>
      <View
        style={{
          backgroundColor: '#FFF',
          padding: 15,
          paddingTop: 0,
          paddingBottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
        onPress={(e) => {

        }}
      >
        {props.datas.map((item, index) => {
          var label = (!!filter.query && !!filter.query[item.name + 'Label']) ? filter.query[item.name + 'Label'] : item.label;
          // console.log(label);
          return (
            <>
              <InlineFilterLabelItem
                key1={index}
                label={label}
                onPress={() => {
                  setFilter({
                    show: item.label == filter.label ? !filter.show : true,
                    label: item.label,
                    name: item.name,
                    items: item.items,
                    query: filter.query || {},
                  });
                }}></InlineFilterLabelItem>
              {
                props.datas.length - 1 > index ? <Text
                  style={{
                    fontSize: 12,
                    color: '#ddd',
                    marginTop: 10,
                    marginRight: 10,
                  }}>
                  |
                </Text> : null
              }
            </>
          );
        })}
      </View>
      <Modal
        style={{
          position: 'relative',
          top: props.getData().top,
          // top: props.top||100,
        }}
        transparent={true}
        onRequestClose={() => {
          setFilter(Object.assign({}, filter, {show: false}));
        }}
        hardwareAccelerated={true}
        presentationStyle={'overFullScreen'}
        animationType="fade"
        statusBarTranslucent={false}
        visible={filter.show}
      >
        <View
          style={{
            backgroundColor: '#FFF',
            padding: 15,
            paddingTop: 0,
            position: 'relative',
            top: props.getData().top - StatusBar.currentHeight,
            borderWidth: 0,
            paddingBottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          {props.datas.map((item, index) => {
            return (
              <>
                <InlineFilterLabelItem
                  key={index}
                  label={
                    (!!filter.query && !!filter.query[item.name + 'Label']) ? filter.query[item.name + 'Label'] : item.label}
                  onPress={() => {
                    setFilter({
                      show: item.label == filter.label ? !filter.show : true,
                      label: item.label,
                      name: item.name,
                      items: item.items,
                      query: filter.query || {},
                    });
                  }}></InlineFilterLabelItem>
                {
                  props.datas.length - 1 > index ? <Text
                    style={{
                      fontSize: 12,
                      color: '#ddd',
                      marginRight: 10,
                    }}>
                    |
                  </Text> : null
                }
              </>
            );
          })}
        </View>
        <View
          style={{
            borderTopWidth: 0.5,
            borderColor: '#eee',
            position: 'relative',
            top: props.getData().top - StatusBar.currentHeight,
            right: 0,
            left: 0,
            bottom: 0,
            paddingBottom: 0,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View
            style={styles.downPopPanel}
          >
            {
              filter.items.map((item, index) => {
                return <InlineFilterItem
                  key1={index}
                  label={item.label}
                  onPress={() => {
                    let queryItem = {};//
                    queryItem[filter.name] = item.val;//用户设置新的查询想
                    queryItem[filter.name + 'Label'] = item.label;//
                    let query = Object.assign({}, filter.query || {}, queryItem);
                    setFilter(
                      Object.assign({}, filter, filter.query, {
                        show: false,
                        query: query,
                      }),
                    );
                    props.onFilter(query);

                  }}></InlineFilterItem>;
              })
            }
          </View>
          <TouchableOpacity
            style={styles.downPopShadow}
            activeOpacity={0.6}
            onPress={() => {
              setFilter(Object.assign({}, filter, {show: false}));
            }}
          ></TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

function InlineFilterItem(props) {
  return (
    <TouchableOpacity
      style={styles.inlineFilterItem}
      activeOpacity={0.6}
      key={props.key1}
      onPress={() => {
        props.onPress && props.onPress(props.label);
      }}>
      <Text
        style={{color: '#444', padding: 10, paddingBottom: 10}}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

/**
 * 筛选标签
 * @param {label} props
 */
function InlineFilterLabelItem(props) {
  return (
    <TouchableOpacity
      style={styles.inlineFilterLabelItem}
      key={props.key1}
      onPress={props.onPress}
      activeOpacity={0.6}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={{color: '#777'}}>{props.label}</Text>
        <Image
          source={require('../assets/images/project/path.png')}
          style={{
            marginLeft: 10,
            height: 12,
            width: 12,
            borderColor: '#CCCCCC',
            borderRadius: 2,
            marginRight: 10,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
