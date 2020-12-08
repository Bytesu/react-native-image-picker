import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from './Button';


import {Page, toast} from '../../src';

export default function App() {
  return (
    <Page>
      <>
        <Button
          onPress={() => {
            toast('success');
          }}
          title="提交1212"></Button>
        <Button
          onPress={() => {
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
