import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from './Button';


import {Form, FormType, Page, toast} from '../../src';

export default function App() {
  const [response, setResponse] = React.useState(null);
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
          ref={form}
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
            console.log(form.current.submit());
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
  response: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
});
