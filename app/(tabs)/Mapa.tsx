import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const primaryColor = '#550D08';
const cardBackgroundColor = '#FFFFFF';
const { width, height } = Dimensions.get('window');

// Dados para a Legenda do Mapa
const MAP_LEGEND = [
  { icon: 'location-sharp', color: primaryColor, label: 'Minha localização' },
  { icon: 'water-sharp', color: '#B30000', label: 'Ocorrências' }, 
  { icon: 'truck-sharp', color: '#333333', label: 'Viaturas' }, 
];

// Componente para um item da Legenda
const LegendItem: React.FC<{ icon: string; color: string; label: string }> = ({ icon, color, label }) => (
  <View style={styles.legendItem}>
    <Ionicons name={icon as any} size={14} color={color} style={{ marginRight: 5 }} />
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);

export default function MapaScreen() {
  return (
    // 🎯 SafeAreaView é o contêiner principal para respeitar as áreas seguras
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Geolocalização</Text>
      </View>
      
      {/* Área que simula o Mapa */}
      <View style={styles.mapContainer}>
        {/* Placeholder para o Mapa */}
        <Text style={styles.mapPlaceholderText}>Mapa Simulado</Text>
        
        {/* A Legenda Flutuante no canto inferior direito */}
        <View style={styles.legendCard}>
          {MAP_LEGEND.map((item, index) => (
            <LegendItem key={index} {...item} />
          ))}
        </View>

        {/* Espaçamento para a Tab Bar */}
        <View style={{ height: 100 }} /> 
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
    backgroundColor: '#F7F5F2', 
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
  mapPlaceholderText: {
    position: 'absolute',
    top: height / 4,
    width: '100%',
    textAlign: 'center',
    color: '#C0C0C0',
    fontSize: 20,
    fontWeight: 'bold',
  },
  legendCard: {
    position: 'absolute',
    bottom: 15, // Ajustado para ficar dentro do container e acima da margem
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