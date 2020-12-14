import 'react';
import {View} from 'react-native';
import React from 'react';
import {_FormType} from './const';
import {_Picker, _SelectInput, _SelectInputFromPage, _TextInput} from './base-com';
import {toast} from '../toast/'
export {
  _FormType as FormType,
};
/**
 *
 * @returns {*}
 * @constructor
 */
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    let normalizeData = this.normalizeList(props.list || []);
    this.state = normalizeData;
  }

  componentDidMount() {

  }

  UNSAFE_componentWillReceiveProps(next, old) {//pre 父组件新属性
    const state = this.state;
    if (next.list && state.list && (JSON.stringify(next.list) != JSON.stringify(state.list))) { //列表数据变化
      let normalizeData = this.normalizeList(next.list || []);
      this.setState(normalizeData);
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //     debugger;
  //     if (props.list && state.list && (JSON.stringify(props.list) != JSON.stringify(state.list))) { //列表数据变化
  //         debugger;
  //         let normalizeData = this.normalizeList(props.list || []);
  //         return normalizeData;
  //     } else {
  //         return null;
  //     }
  //     // return null;
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //
  // }
  //
  // componentDidUpdate(prevProps, prevState) {
  // }

  normalizeItem(item, fieldObj: Object) {
    const self = this;
    item.change = function(v) {
      if (v) {
        const state = self.state, fieldArr = self.state.fieldArr;
        self.setState(Object.assign({}, state, {fieldArr: Object.assign({}, fieldArr, v)}));
      }
    };
    if (!item.placeholder) item.placeholder = '请输入' + item.label;
    item[fieldObj.name] = item.value || '';//
  }

  normalizeList(list) {
    const self = this, fieldObj = {};//初始值缓存
    list.map(item => {
      if (item instanceof Array) { //
        item.map(ele => self.normalizeItem(ele, fieldObj));
      } else {
        self.normalizeItem(item, fieldObj);
      }
    });
    return {
      list,
      fieldObj,
    };
  }

  componentWillUnmount() {

  }

  validator() {//validator item
    // this;
    const {fieldObj} = this.state, errorObj = {};
    this.list.forEach(item => {
      if (item.required && !!(fieldObj[item.name] + '')) { //
        errorObj[item.name] = item.placehoder;
      }
    });
    return errorObj;
  }


  submit() {
    const errorObj = this.validator();
    debugger;
    if (!!Object.keys(errorObj).length) {
      // toast("12313");
      toast(Object.values(errorObj).join(','));
      return;
    }

    return this.state.fieldObj || {};
  }

  genCom(item) {
    //
    if (item.type == _FormType.SELECT_FROM_PAGE) return <_SelectInputFromPage {...item}></_SelectInputFromPage>;
    if (item.type == _FormType.SELECT_FROM_DOWN_PANEL) return <_SelectInput {...item}></_SelectInput>;
    if (item.type == _FormType.SELECT) return <_Picker {...item}></_Picker>;
    if (item.type == _FormType.PWD) item.secureTextEntry = true;
    return <_TextInput {...item}></_TextInput>;
  }

  render() {
    const self = this;
    return <View
      style={{
        width: '100%',
        paddingVertical: 20,
      }}
    >
      {
        this.state.list.map((item, index) => {
          if (item instanceof Array) {
            return <View
              style={{paddingBottom: 10}}
              key={index}>{item.map(ele => {
              self.genCom(ele);
            })}</View>;
          }
          item.key = item.index = index;
          return <View
            style={{paddingBottom: 10}}
            key={index}>{self.genCom(item)}</View>;
        })
      }
    </View>;
  }
}



