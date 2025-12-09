import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location'; // Importa a biblioteca de localização
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

const primaryColor = '#550D08';
const cardBackgroundColor = '#FFFFFF';
const { width, height } = Dimensions.get('window');

// Posição padrão (Fallback, se o GPS falhar)
const DEFAULT_REGION = {
    latitude: -8.0578,
    longitude: -34.8824,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

// Dados de Legenda
const MAP_LEGEND = [
    { icon: 'location-sharp', color: '#1E90FF', label: 'Minha localização' },
    { icon: 'water-sharp', color: '#B30000', label: 'Ocorrências' },
    { icon: 'truck-sharp', color: '#333333', label: 'Viaturas' },
];

// Marcadores de Teste Simulado (Mantenha para visualização)
const SIMULATED_MARKERS = [
    { id: 1, type: 'Ocorrências', coords: { latitude: -8.055, longitude: -34.880 }, color: '#B30000', title: 'Incêndio na R. Aurora' },
    { id: 2, type: 'Viaturas', coords: { latitude: -8.065, longitude: -34.890 }, color: '#333333', title: 'VTR ABT-10 em deslocamento' },
];

// Componente para um item da Legenda
const LegendItem: React.FC<{ icon: string; color: string; label: string }> = ({ icon, color, label }) => (
    <View style={styles.legendItem}>
        <Ionicons name={icon as any} size={14} color={color} style={{ marginRight: 5 }} />
        <Text style={styles.legendLabel}>{label}</Text>
    </View>
);

export default function MapaScreen() {
    const [location, setLocation] = useState(null); // Armazenará a localização real do usuário
    const [region, setRegion] = useState(DEFAULT_REGION); // Região atual do mapa

    useEffect(() => {
        (async () => {
            // 1. Solicita permissão de localização
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão Negada', 'A permissão de acesso à localização é necessária para exibir sua posição no mapa.');
                return;
            }

            // 2. Obtém a localização atual
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            
            // 3. Centraliza o mapa na localização obtida
            setRegion({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.04, // Zoom ajustado
                longitudeDelta: 0.04, // Zoom ajustado
            });
        })();
    }, []);

    // Constrói o marcador da localização do usuário
    const userMarker = location ? [{
        id: 0, 
        type: 'Localizacao', 
        coords: { latitude: location.coords.latitude, longitude: location.coords.longitude }, 
        color: '#1E90FF', 
        title: 'Você está aqui' 
    }] : [];

    // Junta todos os marcadores
    const allMarkers = [...userMarker, ...SIMULATED_MARKERS];


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.pageHeader}>
                <Text style={styles.pageTitle}>Geolocalização</Text>
            </View>
            
            <View style={styles.mapContainer}>
                
                <MapView
                    style={StyleSheet.absoluteFillObject}
                    provider={PROVIDER_DEFAULT} 
                    initialRegion={region}
                    // Quando a região inicial é definida por state, use region/onRegionChange para controle
                    region={region}
                    onRegionChangeComplete={setRegion}
                    showsUserLocation={true} 
                >
                    {/* Renderiza todos os Marcadores (incluindo o do usuário) */}
                    {allMarkers.map((marker) => (
                        // Não renderizamos um Marker separado se showsUserLocation=true, 
                        // exceto se quisermos um ícone customizado. Aqui, vamos depender de showsUserLocation
                        // para o usuário, mas manteremos o array completo para referências futuras.
                        (marker.type !== 'Localizacao') && (
                            <Marker
                                key={marker.id}
                                coordinate={marker.coords}
                                title={marker.title}
                                pinColor={marker.color}
                            >
                                <View style={{ padding: 5 }}>
                                    <Ionicons 
                                        name={marker.type === 'Ocorrências' ? 'water-sharp' : 'truck-sharp'} 
                                        size={24} 
                                        color={marker.color} 
                                    />
                                </View>
                            </Marker>
                        )
                    ))}
                </MapView>

                {/* A Legenda Flutuante (Overlay) */}
                <View style={styles.legendCard}>
                    {MAP_LEGEND.map((item, index) => (
                        <LegendItem key={index} {...item} />
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: cardBackgroundColor,
    },
    pageHeader: {
        paddingHorizontal: 15,
        paddingTop: 10,
        marginBottom: 10,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    mapContainer: {
        flex: 1,
        marginHorizontal: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        position: 'relative',
        overflow: 'hidden',
    },
    legendCard: {
        position: 'absolute',
        bottom: 15, 
        right: 15,
        backgroundColor: cardBackgroundColor,
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,
        zIndex: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3,
    },
    legendLabel: {
        fontSize: 12,
        color: '#333',
    }
});