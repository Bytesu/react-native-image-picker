import {ActivityIndicator, Button, Modal, Picker, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import _ from 'lodash';
import styles from '../style';

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
    // title={props.children}
    // onPress={() => {
    // }}
    activeOpacity={0.5}
  >{props.children}

    {/*<Text*/}
    {/*  style={{color: '#333', fontSize: 14}}*/}
    {/*>{props.children}</Text>*/}
  </Button>;
}

export function _BtnBlock(props) {
  return <TouchableOpacity
    activeOpacity={0.6}
    onPress={() => {

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
    }]}>
    <Text style={{
      color: 'red',
      fontSize: 16,
    }}>{props.children}</Text>
  </TouchableOpacity>;
}

export function _SelectInput(props) {
  let item = props;

  const handleChangeDebounce = _.debounce(props.change || function(v) {
  }, 500, {'maxWait': 1000});
  const [dialog, setDialog] = useState({show: false});
  const [height, setHeight] = useState(0);
  return <>
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
                // console.log()
                setDialog({
                  show: false,
                });
              }}></_Btn>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                paddingLeft: 10,
                paddingRight: 10,
                borderColor: '#eee',
                borderTopWidth: 0.5,
              }}>
              <Text>正文内容</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              {['取消', '确定'].map((item, index) => {
                // item.index = index;
                return <_BtnBlock>{item}</_BtnBlock>;
              })}
            </View>
          </View>
        </View>}

      </View>
    </Modal>
    <TextInput
      onEndEditing={(e) => {
      }}
      onFocus={(e) => {
        setDialog({show: true});
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
    ></TextInput>
  </>;
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
