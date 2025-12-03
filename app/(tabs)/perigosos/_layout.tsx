// app/(tabs)/perigosos/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function PerigososLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="forms1" options={{ title: 'Perigosos - Etapa 1' }} />
      <Stack.Screen name="forms2" options={{ title: 'Perigosos - Etapa 2' }} />
      <Stack.Screen name="forms3" options={{ title: 'Perigosos - Etapa 3' }} />
      <Stack.Screen name="forms4" options={{ title: 'Perigosos - Etapa 4' }} />
      <Stack.Screen name="forms5" options={{ title: 'Perigosos - Etapa 5' }} />
    </Stack>
  );
}