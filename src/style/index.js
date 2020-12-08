import {StyleSheet} from 'react-native';

import colors from './var';

export {colors};

const styles = StyleSheet.create({
  //页面背景
  bg: {
    backgroundColor: colors.pageColor,
  },
  modalBox: { // Loading居中
    flex: 1,
    backgroundColor: 'rgba(4,4,4, 0.57)',
  },
  buttonView: {
    height: 40,
    backgroundColor: 'rgb(33, 150, 243)',
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  //滚动视图背景
  bgScroll: {
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  //默认容器
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f5f5f5',
  },
  //表单面板
  formPanel: {
    backgroundColor: '#FFF',
    padding: 20,
  },
  //居中
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  androidButtonText: {
    color: 'blue',
    fontSize: 20,
  },
  item: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    margin: 8,
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    paddingBottom: 10,
    marginBottom: 10,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  radioItem: {
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    padding: 10,
  },
});
export default styles;
