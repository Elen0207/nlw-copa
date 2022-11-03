import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Center, Text } from 'native-base';
import { THEME } from '../styles/theme';


export function Signin() {
  return (
    <NativeBaseProvider theme={THEME}>
      <Center flex={1} bgColor="gray.900">
        <Text color="white" fontSize={20}>
          Estou criando meu primeiro App amor 🥰
        </Text>
        <Text color="white" fontSize={20}>
          Page Signin!
        </Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  );
}