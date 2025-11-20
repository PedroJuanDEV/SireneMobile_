// app/(auth)/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Listamos as telas dentro do grupo (auth) */}
      <Stack.Screen name="Carregamento" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="RecuperarSenha1" />
      <Stack.Screen name="RecuperarSenha2" />
    </Stack>
  );
}