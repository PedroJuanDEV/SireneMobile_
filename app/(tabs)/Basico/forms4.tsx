// app/(tabs)/basico/forms4.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardTypeOptions, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import FormContainerBasico from './components/FormContainerBasico';

const BASICO_COLOR = '#FF4500';
const BASICO_COLOR_DARK = '#D23C00';

// --- COMPONENTES AUXILIARES ---

interface FormFieldProps {
    label?: string;
    placeholder: string;
    isSmall?: boolean;
    keyboardType?: KeyboardTypeOptions;
    value?: string;
    onChangeText?: (text: string) => void;
}
const FormField: React.FC<FormFieldProps> = ({ label, placeholder, isSmall = false, keyboardType = 'default', value, onChangeText }) => (
    <View style={[formStyles.inputGroup, isSmall && formStyles.smallInputGroup]}>
        {label && <Text style={formStyles.label}>{label}</Text>}
        <TextInput 
            style={formStyles.input} 
            placeholder={placeholder} 
            keyboardType={keyboardType} 
            value={value}
            onChangeText={onChangeText}
        />
    </View>
);

// --- COMPONENTE PRINCIPAL ---
export default function Forms4Natureza1Basico() {
    const router = useRouter();
    const [historico, setHistorico] = useState('');

    const handleAdvance = () => {
        // Navega para a última etapa: forms5.tsx
        router.push('/Basico/forms5'); 
    };

    const handleCancel = () => {
        router.back(); 
    };

    return (
        <FormContainerBasico
            currentStep={4}
            totalSteps={5}
            title="Forms4 - Histórico e Vítimas"
            onAdvance={handleAdvance}
            onCancel={handleCancel}
            showAdvanceButton={true}
        >
            <ScrollView contentContainerStyle={formStyles.scrollContent}>
                
                <Text style={formStyles.sectionTitle}>Histórico da Ocorrência</Text>
                <TextInput 
                    style={formStyles.textArea} 
                    multiline
                    numberOfLines={8}
                    placeholder="Histórico"
                    value={historico}
                    onChangeText={setHistorico}
                />
                
                <Text style={formStyles.sectionTitle}>Detalhes do Evento</Text>
                <FormField label="EVENTO - natureza inicial do aviso:" placeholder="Natureza do chamado" />

                <Text style={formStyles.sectionTitle}>Tipo de Vítima</Text>
                
                <View style={formStyles.row}>
                    <FormField placeholder="Quantidade de vítimas" isSmall keyboardType="numeric" />
                    <FormField placeholder="Fatais" isSmall keyboardType="numeric" />
                </View>
                <View style={formStyles.row}>
                    <FormField placeholder="Ilesas" isSmall keyboardType="numeric" />
                    <FormField placeholder="Desaparecidas" isSmall keyboardType="numeric" />
                </View>
                
            </ScrollView>
        </FormContainerBasico>
    );
}

// --- ESTILOS COMPARTILHADOS ---
const formStyles = StyleSheet.create({
    scrollContent: { paddingBottom: 20 },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: BASICO_COLOR_DARK, 
        borderBottomWidth: 2,
        borderBottomColor: BASICO_COLOR_DARK,
        paddingBottom: 5,
    },
    inputGroup: { marginBottom: 15 },
    smallInputGroup: { flex: 1, marginRight: 10 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 4, color: '#333' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 5,
        backgroundColor: '#fff',
        minHeight: 120,
        textAlignVertical: 'top',
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 5,
    },
});