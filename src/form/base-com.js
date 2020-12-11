import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  Picker,
  Pressable,
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
    key={item.name}
    {...props}
    style={[
      {
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 2,
        borderColor: '#eee',
        borderWidth: 1,
        padding: 10,
      },
      props.style || {},
    ]}
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
  return <View
    style={{
      backgroundColor: '#eee',
      padding: 5,
    }}>
    <_TextInput
      returnKeyType="search"
      style={{borderRadius: 5}}
      // caretHidden={true}
      placeholder="请输入搜索内容"
    ></_TextInput>
  </View>;
}

/**
 * 没有更多数据  com
 * @returns {*}
 * @private
 */
export function _NoMoreData() {
  return <View style={{
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  }}>
    <Text style={{textAlign: 'center', color: '#999'}}>没有更多了</Text>
  </View>;
}

export function _SelectInput(props) {
  let fieldItem = props;
  const handleChangeDebounce = _.debounce(props.change || function(v) {
  }, 500, {'maxWait': 1000});
  const [dialog, setDialog] = useState({show: false, selected: fieldItem.value || ''});
  const [height, setHeight] = useState(0);
  const setDialogFn = (param = {show: false}) => {
    setDialog(Object.assign({}, dialog, param));
  };
  const _renderItem = ({item}) => {
    return <_TouchableHighlight
      // key={item.value}
      onPress={() => {
        setDialogFn({show: false, selected: item.value || item.label});
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
          setDialogFn({show: false, selected: item.value || item.label});
          handleChangeDebounce({[fieldItem.name]: item.value || item.label});
        }}
        name={IconConstant.CIRCLE_CHECK}
        color={dialog.selected == item.value ? 'red' : '#999'}></IconCustom>
    </_TouchableHighlight>;
  };
  return <View
    key={props.index}
  >
    <Modal
      transparent={true}
      animationType="fade"
      visible={dialog.show}
      onRequestClose={setDialogFn}
    >
      <Pressable
        style={[styles.modalBox, {}]}
        onPress={setDialogFn}
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
              <_Btn
                title="取消"
                onPress={setDialogFn}
              ></_Btn>
            </View>
            <FlatList
              data={(fieldItem.options || [])}
              refreshing={false}
              onRefresh={() => {
              }}
              ListEmptyComponent={<_Loading></_Loading>}
              ListFooterComponent={<_NoMoreData/>}
              onEndReached={() => {
              }}
              keyExtractor={(item, index) => item.value}
              renderItem={_renderItem}
            >
            </FlatList>
          </View>
        </View>}
      </Pressable>
    </Modal>
    <_BtnBlock
      style={{
        alignItems: 'flex-start',
        paddingLeft: 5,
        textAlign: 'left',
      }}
      onPress={() => {
        setDialogFn({show: true});
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

/**
 * header
 * @param props
 * @returns {*}
 * @private
 */
export function _Header(props) {
  return <View
    {...props}
    style={[
      {
        backgroundColor: '#a0a0a0',
        padding: 20,
        paddingVertical: 15,
        display: 'flex',
        // height: 50,
        flexDirection: 'row',
      }, props.style || {}]}>
    <_Title>{props.children}</_Title>
  </View>;
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
