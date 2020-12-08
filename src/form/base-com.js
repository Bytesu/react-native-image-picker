import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  Picker,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconConstant, IconCustom} from '../icon/';
import React, {useState} from 'react';
import _ from 'lodash';
import styles, {colors} from '../style';

/**
 * input com
 * @param props
 * @returns {*}
 * @private
 */
export function _TextInput(props) {
  let item = props;
  const handleChangeDebounce = _.debounce(props.change || function(v) {
  }, 500, {'maxWait': 1000});

  return <TextInput
    onEndEditing={(e) => {
    }}
    onFocus={(e) => {
    }}
    onSelectionChange={(e) => {
    }}
    onSubmitEditing={(e) => {
    }}
    onTextInput={(e) => {
    }}
    onContentSizeChange={(e) => {
    }}
    onKeyPress={(e) => {
    }}
    onChangeText={(v) => {
      handleChangeDebounce({
        [item.name]: v,
      });
    }}
    clearButtonMode='never'//清除
    secureTextEntry={false}
    placeholder={item.placeholder || ''}
    defaultValue={item.value || ''}
    style={{
      // width: 150,
      height: 40,
      backgroundColor: '#fff',
      borderRadius: 2,
      borderColor: '#eee',
      borderWidth: 1,
      padding: 10,
    }}
    key={item.name}
  ></TextInput>;
}

export function _Title(props) {
  return <View style={{flex: 1}}>
    <Text
      style={{color: '#333', fontSize: 14, fontWeight: 'bold'}}
    >{props.children}</Text>
  </View>;
}

export function _Btn(props) {
  return <Button
    {...props}
    activeOpacity={0.5}
  >
  </Button>;
}

export function _TouchableHighlight(props) {
  return <TouchableHighlight
    {...props}
    activeOpacity={0.6}
    underlayColor={colors.itemActiveColor}
    style={[{
      //backgroundColor: colors.itemActiveColor,
    }, props.style || {}]}
  >
    <>{props.children}</>
  </TouchableHighlight>;
}

export function _TouchableOpacity(props) {
  return <TouchableOpacity
    activeOpacity={0.6}
    style={{padding: 0}}
    {...props}
  ></TouchableOpacity>;
}

export function _BtnBlock(props) {
  return <TouchableOpacity
    activeOpacity={0.6}
    onPress={() => {
      props.onPress && props.onPress();
    }}
    style={[styles.buttonView, {
      flex: 1,
      zIndex: 1,
      marginTop: 0,
      height: 50,
      lineHeight: 50,
      backgroundColor: 'rgb(243, 243, 243)',
      paddingHorizontal: 0,
      borderRadius: 0,
      padding: 0,
    }, props.style || {}]}>
    <Text style={{
      color: props.color || '#333',
      fontSize: 16,
    }}>{props.children}</Text>
  </TouchableOpacity>;
}

/**
 *  搜索框
 * @returns {*}
 * @private
 */
export function _Search(props) {
  return <View>
    <_TextInput placeholder="请输入"></_TextInput>
  </View>;
}

export function _SelectInput(props) {
  let fieldItem = props;
  const handleChangeDebounce = _.debounce(props.change || function(v) {
  }, 500, {'maxWait': 1000});
  const [dialog, setDialog] = useState({show: false, selected: fieldItem.value || ''});
  const [height, setHeight] = useState(0);
  return <View
    key={props.index}
  >
    <Modal
      transparent={true}
      animationType="fade"
      visible={dialog.show}
      onRequestClose={() => {
        setDialog({
          show: false,
        });
      }}
    >
      <View
        style={[styles.modalBox, {}]}
        onLayout={(event) => {
          let {x, y, width, height} = event.nativeEvent.layout;
          setHeight(height);
        }}
      >
        {height == 0 ? <_Loading/> : <View
        >
          <View
            style={{
              top: height - 500,
              bottom: 0,
              width: '100%',
              boxShadow: '0px 1px 4px 0pd #333',
              height: 500,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              backgroundColor: '#fff',
              display: 'flex',
            }}>
            <View
              style={{
                backgroundColor: '#eee',
                padding: 20,
                paddingVertical: 13,
                display: 'flex',
                flexDirection: 'row',
              }}>
              <_Title>请选择</_Title>
              <_Btn title="取消" onPress={() => {
                setDialog(Object.assign({}, dialog, {
                  show: false,
                }));
              }}></_Btn>
            </View>
            <FlatList
              data={(fieldItem.options || [])}
              refreshing={false}
              onRefresh={() => {

              }}
              ListEmptyComponent={<_Loading></_Loading>}
              ListFooterComponent={<View>
                <Text>没有更多了</Text>
              </View>}
              // ListHeaderComponent={<_Search/>}
              onEndReached={() => {
                console.log('onEndReached');
              }}
              keyExtractor={(item, index) => item.value}
              renderItem={({item}) => {
                return <_TouchableHighlight
                  // key={item.value}
                  onPress={() => {
                    setDialog(Object.assign({}, dialog, {show: false, selected: item.value || item.label}));
                    handleChangeDebounce({[fieldItem.name]: item.value || item.label});
                  }}
                  style={[styles.flexRow, styles.radioItem]}
                >
                  <View
                    style={[styles.flex1]}
                  >
                    <Text>{item.label || item.value || '未设置label或value'}</Text>
                  </View>
                  <IconCustom
                    onPress={() => {
                      setDialog(Object.assign({}, dialog, {show: false, selected: item.value || item.label}));
                      handleChangeDebounce({[fieldItem.name]: item.value || item.label});
                    }}
                    name={IconConstant.CIRCLE_CHECK}
                    color={dialog.selected == item.value ? 'red' : '#999'}></IconCustom>
                </_TouchableHighlight>;
              }}
              style={{
                flex: 1,
                backgroundColor: '#fff',
                padding: 15,
                borderWidth: 1,
                borderColor: '#eee',
                borderTopWidth: 0.5,
              }}>
              {/*{*/}
              {/*  (item.options || []).map(ele => {*/}
              {/*    return ;*/}
              {/*  })*/}
              {/*}*/}
            </FlatList>
          </View>
        </View>}
      </View>
    </Modal>
    <_BtnBlock
      style={{
        alignItems: 'flex-start',
        paddingLeft: 5,
        textAlign: 'left',
      }}
      onPress={() => {
        setDialog(Object.assign({}, dialog, {show: true}));
      }}
    >{dialog.selected || ('选择' + fieldItem.label)}
    </_BtnBlock>
  </View>;
}

/**
 * loading com
 * @returns {*}
 * @private
 */
export function _Loading() {
  return <ActivityIndicator size="small" color="#00ff00"/>;
}

export function _Picker() {
  return <Picker
    // key={item._key}
    // selectedValue={selectedValue}
    style={{
      height: 50, width: 150,
      background: '#fff',
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
    }}
    // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
  >
    <Picker.Item label="Java" value="java"/>
    <Picker.Item label="JavaScript" value="js"/>
  </Picker>;
}
