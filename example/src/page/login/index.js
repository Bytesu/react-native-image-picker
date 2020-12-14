import React, {useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {_Btn, Form, FormType} from '../../../../src';
// import { useNavigation } from '@react-navigation/native';


export default function Page(props) {
  const {navigation} = props;
  const formRef = useRef();
  const formTestData = [
    {
      label: '用户名',
      name: 'name',
      type: FormType.INPUT,
      required: true,
    },
    {
      label: '密码',
      name: 'password',
      type: FormType.PWD,
      required: true,
    },
  ];
  const [formData, setFormData] = useState([...formTestData]);
  return <View
    style={{padding: 10}}
  >
    <Text>Login</Text>
    <Form
      ref={formRef}
      list={formData}
    ></Form>
    <_Btn
      title="1231230222"
      onPress={() => {
        // debugger;
        const form = formRef.current.submit();
        // toast()
        debugger;
        navigation.navigate('Home');
      }}
    ></_Btn>
  </View>;
}
