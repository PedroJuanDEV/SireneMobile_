import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const primaryColor = '#550D08';

// Componente customizado para o botão central grande
const CentralPlusButton: React.FC<any> = () => (
  <TouchableOpacity style={styles.plusButtonContainer}>
    <View style={styles.plusButton}>
      {/* Ícone de '+' na cor primária (Marrom) */}
      <AntDesign name="plus" size={30} color={primaryColor} /> 
    </View>
  </TouchableOpacity>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarShowLabel: false, 
        tabBarStyle: styles.tabBar,
        // Adiciona um padding inferior para respeitar a área segura e acomodar o botão flutuante
        tabBarItemStyle: { paddingVertical: 5 }, 
      }}
    >
      {/* 1. Início / Home */}
      <Tabs.Screen
        name="Inicial" 
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={focused ? primaryColor : '#888'} />
          ),
        }}
      />

      {/* 2. Ocorrências (Documento) */}
      <Tabs.Screen
        name="Ocorrencias"
        options={{
          title: 'Ocorrências',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={24} color={focused ? primaryColor : '#888'} />
          ),
        }}
      />

      {/* 3. Botão Central (Oculto, usando tabBarButton customizado) */}
      <Tabs.Screen
        name="Novo"
        options={{
          title: 'Novo',
          tabBarButton: (props) => <CentralPlusButton {...props} />,
        }}
      />
      
      {/* 4. Localização / Mapa */}
      <Tabs.Screen
        name="Mapa"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'location' : 'location-outline'} size={24} color={focused ? primaryColor : '#888'} />
          ),
        }}
      />

      {/* 5. Perfil / Usuário */}
      <Tabs.Screen
        name="Perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={focused ? primaryColor : '#888'} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    // 🎯 Altura ligeiramente maior para acomodar o arredondamento
    height: 70, 
    borderTopWidth: 0,
    backgroundColor: '#FFF',
    
    // Arredondamento nas laterais superiores
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    
    // Sombra para dar o efeito de "cartão flutuante" (pode variar entre iOS/Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  plusButtonContainer: {
    // 🎯 Movimenta o botão mais para cima para centralizar no recorte arredondado
    top: -25, 
    justifyContent: 'center',
    alignItems: 'center',
    width: 70, 
    height: 70,
  },
  plusButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF', // Fundo branco do círculo
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: primaryColor,
    borderWidth: 2, // Borda marrom
    // 🎯 Sombra do botão (mais forte que a sombra da Tab Bar)
    shadowColor: primaryColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
});