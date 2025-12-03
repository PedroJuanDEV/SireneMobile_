// app/(tabs)/FormPreHospitalar/forms5.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FormContainer from './components/FormContainer';

// Componente de Campo Simples (Reutilizado)
const FormField: React.FC<{ label: string; placeholder: string; isSmall?: boolean }> = ({ label, placeholder, isSmall = false }) => (
  <View style={[styles.inputGroup, isSmall && styles.smallInputGroup]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} placeholder={placeholder} />
  </View>
);

// Componente para opções Sim/Não ou Rádio (Reutilizado)
const RadioGroup: React.FC<{ label: string; options: string[]; currentValue: string; onChange: (value: string) => void }> = ({ label, options, currentValue, onChange }) => {
    return (
        <View style={styles.radioGroup}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.radioOptions}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.radioOption,
                            currentValue === option && styles.radioOptionSelected
                        ]}
                        onPress={() => onChange(option)}
                    >
                        <Text style={[
                            styles.radioText,
                            currentValue === option && styles.radioTextSelected
                        ]}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};


export default function Forms5Natureza1() {
  const router = useRouter();
  const [veiculoEnvolvido, setVeiculoEnvolvido] = useState('Sim');
  const [guarnicaoEmpenhada, setGuarnicaoEmpenhada] = useState('Posto Geral');

  const handleFinish = () => {
    
    console.log('Formulário da Natureza 1 Finalizado e Enviado!');
    
    router.back(); 
  };

  const handleCancel = () => {
    router.back(); 
  };

  return (
    <FormContainer
      currentStep={5} 
      totalSteps={5}
      title="Forms5-Natureza 1"
      onAdvance={handleFinish} 
      onCancel={handleCancel}
      showAdvanceButton={true}
      advanceText='Finalizar' 
      showSaveButton={true} 
    >
        
        <Text style={styles.sectionTitle}>Veículos envolvidos</Text>
        <RadioGroup 
            label="Veículos envolvidos" 
            options={['Sim', 'Não']} 
            currentValue={veiculoEnvolvido} 
            onChange={setVeiculoEnvolvido}
        />

        {veiculoEnvolvido === 'Sim' && (
            <View>
                <Text style={styles.sectionSubtitle}>Veículo 1</Text>
                <View style={styles.row}>
                    <FormField label="Modelo" placeholder="Ex: Corsa, Moto" isSmall />
                    <FormField label="Placa" placeholder="ABC-1234" isSmall />
                    <FormField label="UF" placeholder="PE" isSmall />
                </View>
                <FormField label="Cor" placeholder="Ex: Vermelho" />
                <FormField label="VTP KM" placeholder="Ex: 12000" />
                
                <Text style={styles.sectionSubtitle}>Veículo 2</Text>
                <View style={styles.row}>
                    <FormField label="Modelo" placeholder="Ex: Corsa, Moto" isSmall />
                    <FormField label="Placa" placeholder="ABC-1234" isSmall />
                    <FormField label="UF" placeholder="PE" isSmall />
                </View>
                <FormField label="VTR/VTP utilizadas" placeholder="Ex: ABT-123" />
            </View>
        )}
        
        {/* Guarnição Empenhada */}
        <Text style={styles.sectionTitle}>Guarnição empenhada</Text>
        <View style={styles.guarnicaoOptions}>
            <RadioGroup 
                label="" 
                options={['Posto Geral', 'Guarnição Interna', 'Outra Organização', 'Solicitação Médica']} 
                currentValue={guarnicaoEmpenhada} 
                onChange={setGuarnicaoEmpenhada}
            />
        </View>

        <FormField label="Viatura de destino no ap" placeholder="Ex: ABT-123" />
        <FormField label="OBSERVAÇÕES (Opcional)" placeholder="Detalhes adicionais do serviço" />

    </FormContainer>
  );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 8,
        color: '#1E40AF', 
    },
    sectionSubtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: '#333',
    },
    inputGroup: {
        marginBottom: 10,
    },
    smallInputGroup: {
        flex: 1,
        marginRight: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioGroup: {
        marginBottom: 10,
    },
    radioOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    radioOption: {
        backgroundColor: '#eee',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    radioOptionSelected: {
        backgroundColor: '#1E40AF', 
        borderColor: '#1E40AF',
    },
    radioText: {
        color: '#333',
        fontWeight: '500',
    },
    radioTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    guarnicaoOptions: {
        
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    }
});