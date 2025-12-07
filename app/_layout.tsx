// app/_layout.tsx

import { Stack } from "expo-router";
import React from 'react';
import { FormStoreProvider } from '@/src/context/FormStore';

export default function RootLayout() {
  return (
    <FormStoreProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* 1. GRUPO DE AUTENTICAÇÃO (Onde o App deve começar) */}
        <Stack.Screen
          name="(auth)"
          options={{
            title: 'Autenticação',
            // A primeira rota dentro de (auth) será 'Carregamento'
            initialRouteName: 'Carregamento'
          }}
        />

        {/* 2. GRUPO PRINCIPAL COM TABS (Onde o Login leva) */}
        <Stack.Screen
          name="(tabs)"
          options={{ title: 'Principal' }}
        />
      </Stack>
    </FormStoreProvider>
  );
}