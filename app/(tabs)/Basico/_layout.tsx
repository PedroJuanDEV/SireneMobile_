// app/(tabs)/basico/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function BasicoLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="forms1" options={{ title: 'Básico - Etapa 1' }} />
      <Stack.Screen name="forms2" options={{ title: 'Básico - Etapa 2' }} />
      <Stack.Screen name="forms3" options={{ title: 'Básico - Etapa 3' }} />
      <Stack.Screen name="forms4" options={{ title: 'Básico - Etapa 4' }} />
      <Stack.Screen name="forms5" options={{ title: 'Básico - Etapa 5' }} />
    </Stack>
  );
}