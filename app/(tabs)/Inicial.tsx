import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const primaryColor = '#550D08';

// Componente para os Cards de Estatísticas
const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

// Componente para os Cards de Atividades Recentes
const ActivityItem: React.FC<{ type: 'atribuida' | 'concluida' | 'andamento'; text: string; time: string }> = ({ type, text, time }) => {
  let iconName: 'flag' | 'checkmark-circle' | 'timer';
  let iconColor: string;

  switch (type) {
    case 'atribuida':
      iconName = 'flag';
      iconColor = primaryColor;
      break;
    case 'concluida':
      iconName = 'checkmark-circle';
      iconColor = '#4CAF50';
      break;
    case 'andamento':
      iconName = 'timer';
      iconColor = '#FFC107';
      break;
  }

  return (
    <View style={styles.activityItem}>
      {/* O ícone usa um Text wrapper para fins de alinhamento com alguns ícones */}
      <Ionicons name={iconName} size={24} color={iconColor} style={styles.activityIcon} />
      <View style={styles.activityTextContainer}>
        <Text style={styles.activityText}>{text}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
    </View>
  );
};

export default function InicialScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          {/* 🎯 CORREÇÃO: Encapsulando "Página inicial" dentro de <Text> */}
          <Text style={styles.pageTitle}>Página inicial</Text> 
          <View style={styles.onlineStatus}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>

        {/* --- Cards de Estatísticas --- */}
        <View style={styles.statsRow}>
          <StatCard title="Total de ocorrências" value="08" />
          <StatCard title="Em andamento" value="2" />
        </View>
        <View style={styles.statsRow}>
          <StatCard title="Tempo médio resposta" value="10min" />
          <StatCard title="Taxa de conclusão" value="90%" />
        </View>

        {/* --- Atividades Recentes --- */}
        <Text style={styles.sectionTitle}>Atividades recentes</Text>
        <View style={styles.activityCard}>
          <ActivityItem 
            type="atribuida" 
            text="Nova ocorrência atribuída" 
            time="há 2 minutos" 
          />
          <ActivityItem 
            type="concluida" 
            text="Ocorrência #202590 Concluída" 
            time="há 5 minutos" 
          />
          <ActivityItem 
            type="andamento" 
            text="Ocorrência #202590 Em andamento" 
            time="há 7 minutos" 
          />
        </View>

        {/* --- Ocorrências Recentes (Placeholder) --- */}
        <Text style={styles.sectionTitle}>Ocorrências recentes</Text>
        <View style={styles.ocorrenciasCard}>
          {/* Conteúdo dinâmico das ocorrências seria inserido aqui */}
        </View>

        <View style={{ height: 100 }} /> 
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  onlineText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statCard: {
    width: '48.5%',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColor,
  },
  statTitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  activityCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  activityIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  activityTextContainer: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  ocorrenciasCard: {
    backgroundColor: '#FFF',
    minHeight: 250,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
});