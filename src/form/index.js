import 'react';
import {View} from 'react-native';
import React from 'react';
import {_FormType} from './const'
import {_Picker, _TextInput} from './baseCom'
import {ImagesView} from '../img-viewer';
import {VideoPicker} from '../video';
export {
    _FormType as FormType
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

    normalizeItem(item) {
        const self = this;
        item.change = function (v) {
            if (v) {
                const state = self.state, fieldArr = self.state.fieldArr
                self.setState(Object.assign({}, state, {fieldArr: Object.assign({}, fieldArr, v)}));
            }
        }
        if (!item.placeholder) item.placeholder = '请输入' + item.label;
    }

    normalizeList(list) {
        const self = this, fieldArr = {};//初始值缓存
        list.map(item => {
            if (item instanceof Array) { //
                item.map(ele => self.normalizeItem(ele))
            } else {
                self.normalizeItem(item)
            }
        })
        return {
            list,
            fieldArr,
        };
    }

    componentWillUnmount() {

    }

    validator() {//validator item
        this
    }


    submit() {
        this.validator();
        return this.state.fieldArr || {}
    }

    genCom(item) {
        if (item.type == _FormType.SELECT) return <_Picker {...item}></_Picker>
        return <_TextInput {...item}></_TextInput>
    }


    render() {
        const self = this;
        return <View
            style={{width: '100%', padding: 10}}
        >
            <VideoPicker list={[]}></VideoPicker>
            {/*<ImagesView*/}
            {/*  list={[*/}
            {/*      'http://c-ssl.duitang.com/uploads/blog/202011/13/20201113135615_b0cac.jpg',*/}
            {/*      'http://c-ssl.duitang.com/uploads/blog/202011/13/20201113135615_b0cac.jpg',*/}
            {/*      'http://c-ssl.duitang.com/uploads/blog/202011/13/20201113135615_b0cac.jpg',*/}
            {/*      'http://c-ssl.duitang.com/uploads/blog/202011/13/20201113135615_b0cac.jpg',*/}
            {/*      'http://c-ssl.duitang.com/uploads/blog/202011/13/20201113135615_b0cac.jpg'*/}
            {/*  ]}></ImagesView>*/}
            {
                this.state.list.map((item, index) => {
                    if (item instanceof Array) {
                        return <View key={index}>{item.map(ele => {
                            self.genCom(ele)
                        })}</View>
                    }
                    item.key = index;
                    return self.genCom(item)
                })
            }
        </View>;
    }
}



