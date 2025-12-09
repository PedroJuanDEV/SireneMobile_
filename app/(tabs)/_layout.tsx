import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const primaryColor = '#550D08';

interface TabBarButtonProps {
    onPress: () => void;
}

const CentralPlusButton: React.FC<TabBarButtonProps> = ({ onPress }) => (
    <TouchableOpacity style={styles.plusButtonContainer} onPress={onPress}>
        <View style={styles.plusButton}>
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
                tabBarItemStyle: { paddingVertical: 5 }, 
            }}
        >
            {/* Telas Visíveis na Tab Bar */}
            <Tabs.Screen
                name="Inicial" 
                options={{
                    title: 'Início',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={focused ? primaryColor : '#888'} />
                    ),
                }}
            />

            <Tabs.Screen
                name="Ocorrencias"
                options={{
                    title: 'Ocorrências',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={24} color={focused ? primaryColor : '#888'} />
                    ),
                }}
            />

            <Tabs.Screen
                name="Novo"
                options={{
                    title: 'Novo',
                    tabBarButton: (props) => <CentralPlusButton {...props} />,
                }}
            />
            
            <Tabs.Screen
                name="Mapa"
                options={{
                    title: 'Mapa',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? 'location' : 'location-outline'} size={24} color={focused ? primaryColor : '#888'} />
                    ),
                }}
            />

            <Tabs.Screen
                name="Perfil"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={focused ? primaryColor : '#888'} />
                    ),
                }}
            />

            {/* ROTAS DE FORMULÁRIO OCULTAS (Stacks) */}
            
            {/* 1. Pré-Hospitalar */}
            <Tabs.Screen
                name="FormPreHospitalar"
                options={{
                    href: null,
                    headerShown: false,
                }}
            />

            {/* 2. Incêndio */}
            <Tabs.Screen
                name="Incendio"
                options={{
                    href: null, 
                    headerShown: false,
                }}
            />
            
            {/* 3. Salvamento */}
            <Tabs.Screen
                name="salvamento"
                options={{
                    href: null, 
                    headerShown: false,
                }}
            />
            
            {/* 4. Produtos Perigosos */}
            <Tabs.Screen
                name="perigosos"
                options={{
                    href: null, 
                    headerShown: false,
                }}
            />
            
            {/* 5. Prevenção */}
            <Tabs.Screen
                name="prevencao"
                options={{
                    href: null,
                    headerShown: false,
                }}
            /> {/* <-- CHAVE DE FECHAMENTO CORRIGIDA AQUI */}

            {/* 6. Básico */}
            <Tabs.Screen
                name="Basico" // <-- Usando minúsculas conforme sua pasta
                options={{
                    href: null,
                    headerShown: false,
                }}
            />

        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 70, 
        borderTopWidth: 0,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 8,
    },
    plusButtonContainer: {
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
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: primaryColor,
        borderWidth: 2,
        shadowColor: primaryColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
    },
});