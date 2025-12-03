// app/(tabs)/prevencao/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function PrevencaoLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="forms1" options={{ title: 'Prevenção - Etapa 1' }} />
      <Stack.Screen name="forms2" options={{ title: 'Prevenção - Etapa 2' }} />
      <Stack.Screen name="forms3" options={{ title: 'Prevenção - Etapa 3' }} />
      <Stack.Screen name="forms4" options={{ title: 'Prevenção - Etapa 4' }} />
      <Stack.Screen name="forms5" options={{ title: 'Prevenção - Etapa 5' }} />
    </Stack>
  );
}