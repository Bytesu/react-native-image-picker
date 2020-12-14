import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from './Button';


import {Form, FormType, Page, toast} from '../../src';

export default function App() {
  const form = useRef();
  const formTestData = [
    {
      label: '姓名', name: 'name',
      value: '苏伟明',
      type: FormType.INPUT,
    },
    {
      label: '邮箱', name: 'email',
      value: 'byte_su@163.com',
      type: FormType.SELECT,
    },
    {
      label: '籍贯', name: 'birth',
      value: '',
      type: FormType.SELECT_FROM_DOWN_PANEL,
      options: [
        {value: '河南', label: '河南'},
        {value: '山西', label: '山西'},
        {value: '陕西', label: '陕西'},
        {value: '陕西1', label: '陕西'},
        {value: '陕西2', label: '陕西'},
        {value: '陕西3', label: '陕西'},
        {value: '陕西4', label: '陕西'},
        {value: '陕西6', label: '陕西'},
        {value: '陕西5', label: '陕西'},
        {value: '陕西7', label: '陕西'},
        {value: '陕西8', label: '陕西'},
        {value: '陕西9', label: '陕西'},
        {value: '陕西10', label: '陕西10'},
        {value: '陕西11', label: '陕西11'},
        {value: '陕西12', label: '陕西12'},
      ],
    },
    {
      label: '选择城市', name: 'city',
      value: '',
      type: FormType.SELECT_FROM_PAGE,
      page:{
        router:'/list',

      }

    },
    [
      {
        label: '性别', name: 'SELECT',
        value: 'byte_su@163.com',
        type: FormType.INPUT,
        // placeholder: '请输入姓名'
      },
      {
        label: '邮箱', name: 'email2',
        type: FormType.INPUT,
        value: 'byte_su@163.com',
      },
    ],
    {
      label: '描述', name: 'desc',
      value: '',
      type: FormType.TEXTAREA,
    },
  ];
  const [formData, setFormData] = useState([...formTestData]);
  return (
    <Page>
      <>
        <Form
          ref={(ref)=>form =ref}
          list={formData}
        ></Form>
        <Button
          onPress={() => {
            toast('success');
            console.log(form.current.submit());
            formTestData[0].value = '';
            setFormData([...formTestData.slice(0, 1)]);
          }}
          title="提交1212"></Button>
        <Button
          onPress={() => {
            console.log(form.submit());
            formTestData[0].value = '123123';
            setFormData([...formTestData]);
          }}
          title="RESET"></Button>
      </>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    marginVertical: 24,
    marginHorizontal: 24,
  },
  image: {
    marginVertical: 24,
    alignItems: 'center',
  },
});
