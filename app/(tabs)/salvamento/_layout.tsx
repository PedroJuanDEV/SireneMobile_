// app/(tabs)/Salvamento/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function SalvamentoLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="forms1" options={{ title: 'Salvamento - Etapa 1' }} />
      <Stack.Screen name="forms2" options={{ title: 'Salvamento - Etapa 2' }} />
      <Stack.Screen name="forms3" options={{ title: 'Salvamento - Etapa 3' }} />
      <Stack.Screen name="forms4" options={{ title: 'Salvamento - Etapa 4' }} />
      <Stack.Screen name="forms5" options={{ title: 'Salvamento - Etapa 5' }} />
    </Stack>
  );
}