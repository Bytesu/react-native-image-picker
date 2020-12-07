import {ActivityIndicator, Modal, Picker, Text, TextInput, TouchableOpacity, View} from 'react-native';
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

export function _SelectInput(props) {
  let item = props;

  const handleChangeDebounce = _.debounce(props.change || function(v) {
  }, 500, {'maxWait': 1000});
  const [dialog, setDialog] = useState({show: false});
  const shadowOpt = {
    width: 100,
    // height: 100,
    color: '#000',
    border: 2,
    radius: 0,
    opacity: 0.1,
    x: 1,
    y: 1,
    style: {marginTop: 100},
  };
  return <>
    <Modal
      transparent={true}
      animationType="slide"
      visible={dialog.show}
      onRequestClose={() => {
        setDialog({
          show: false,
        });
      }}
    >
      <View style={styles.modalBox}
            onLayout={(event) => {
              let {x, y, width, height} = event.nativeEvent.layout;
              // self.setState(Object.assign({}, self.state, {height: height}));
            }}
      >
        <View
          setting={shadowOpt}
        >
          <View
            style={{
              elevation: 1,
              top: 0,
              bottom: 0,
              width: '100%',
              boxShadow: '0px 1px 4px 0pd #333',
              height: 400 - 100,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              backgroundColor: '#fff',
              display: 'flex',
            }}>
            <View
              style={{
                backgroundColor: '#333',
                padding: 20,
                paddingVertical: 13,
                display: 'flex',
                flexDirection: 'row',
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{color: '#333', fontSize: 14, fontWeight: 'bold'}}
                >请选择</Text>
              </View>
              <TouchableOpacity
                onPress={() => {

                }}
                activeOpacity={0.6}
              >
                <Text
                  style={{color: '#333', fontSize: 14}}
                >取消</Text>
              </TouchableOpacity>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: '#fff',
              paddingLeft: 10,
              paddingRight: 10,
              borderColor: '#eee',
              borderTopWidth: 0.5,
            }}>
              <Text>12313</Text>
            </View>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
              {['取消'].map((item, index) => {
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
                    backgroundColor: index == 0 ? 'rgb(243, 243, 243)' : 'rgb(33, 150, 243)',
                    paddingHorizontal: 0,
                    borderRadius: 0,
                    padding: 0,
                  }]}><Text style={{
                  color: index == 0 ? 'red' : '#FFF',
                  fontSize: 16,
                }}>{item}</Text></TouchableOpacity>;
              })}
            </View>
          </View>
        </View>
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
