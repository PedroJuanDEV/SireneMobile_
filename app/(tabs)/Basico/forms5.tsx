// app/(tabs)/basico/forms5.tsx

import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardTypeOptions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FormContainerBasico from './components/FormContainerBasico';

const BASICO_COLOR = '#FF4500';
const BASICO_COLOR_DARK = '#D23C00';

// --- COMPONENTES AUXILIARES ---

interface FormFieldProps {
    label?: string;
    placeholder: string;
    isSmall?: boolean;
    keyboardType?: KeyboardTypeOptions;
}
const FormField: React.FC<FormFieldProps> = ({ label, placeholder, isSmall = false, keyboardType = 'default' }) => (
    <View style={[formStyles.inputGroup, isSmall && formStyles.smallInputGroup]}>
        {label && <Text style={formStyles.label}>{label}</Text>}
        <TextInput 
            style={formStyles.input} 
            placeholder={placeholder} 
            keyboardType={keyboardType} 
        />
    </View>
);

interface CheckboxProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}
const Checkbox: React.FC<CheckboxProps> = ({ label, selected, onPress }) => (
    <TouchableOpacity style={formStyles.checkboxContainer} onPress={onPress}>
        <View style={[formStyles.checkbox, selected && formStyles.checkboxSelected]}>
            {selected && <MaterialIcons name="check" size={14} color="#fff" />}
        </View>
        <Text style={formStyles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

// --- COMPONENTE PRINCIPAL ---
export default function Forms5Natureza1Basico() {
    const router = useRouter();
    const [veiculosSim, setVeiculosSim] = useState(true);

    const handleAdvance = () => {
        // FIM do fluxo, retorna para a tela inicial
        router.replace('/Inicial'); 
    };

    const handleCancel = () => {
        router.back(); 
    };

    return (
        <FormContainerBasico
            currentStep={5}
            totalSteps={5}
            title="Forms5 - Encerramento"
            onAdvance={handleAdvance}
            onCancel={handleCancel}
            showAdvanceButton={true}
            advanceText="Concluir"
        >
            <ScrollView contentContainerStyle={formStyles.scrollContent}>
                
                <Text style={formStyles.sectionTitle}>Veículos Envolvidos</Text>
                <View style={formStyles.rowAlignItems}>
                    <Checkbox label="Sim" selected={veiculosSim} onPress={() => setVeiculosSim(true)} />
                    <Checkbox label="Não" selected={!veiculosSim} onPress={() => setVeiculosSim(false)} />
                </View>

                {veiculosSim && (
                    <View>
                        {/* Veículo 1 */}
                        <Text style={formStyles.veiculoTitle}>1º</Text>
                        <View style={formStyles.row}>
                            <FormField placeholder="Modelo" isSmall />
                            <FormField placeholder="Placa" isSmall />
                            <FormField placeholder="UF" isSmall />
                        </View>
                        <View style={formStyles.row}>
                            <FormField placeholder="Cor" isSmall />
                            <FormField placeholder="CPF/RG" isSmall keyboardType="numeric" />
                            <FormField placeholder="Orgão expedidor" isSmall />
                        </View>
                        <FormField placeholder="Nome" />

                        {/* Veículo 2 */}
                        <Text style={formStyles.veiculoTitle}>2º</Text>
                        <View style={formStyles.row}>
                            <FormField placeholder="Modelo" isSmall />
                            <FormField placeholder="Placa" isSmall />
                            <FormField placeholder="UF" isSmall />
                        </View>
                        <View style={formStyles.row}>
                            <FormField placeholder="Cor" isSmall />
                            <FormField placeholder="CPF/RG" isSmall keyboardType="numeric" />
                            <FormField placeholder="Orgão expedidor" isSmall />
                        </View>
                        <FormField placeholder="Nome" />
                    </View>
                )}


                <Text style={formStyles.sectionTitle}>Guarnição Empenhada</Text>
                <View style={formStyles.row}>
                    <FormField placeholder="Posto/Grad." isSmall />
                    <FormField placeholder="Matrícula-CMT op" isSmall />
                </View>
                <View style={formStyles.row}>
                    <FormField placeholder="Matrícula unid. tática" isSmall />
                    <FormField placeholder="Matrícula indiv. tática" isSmall />
                </View>
                
                <Text style={formStyles.label}>Visto de divisão de op./ Concluir</Text>
                <TouchableOpacity style={formStyles.concluirButton} onPress={handleAdvance}>
                    <MaterialIcons name="done-all" size={24} color="#fff" />
                    <Text style={formStyles.addButtonText}>Concluir</Text>
                </TouchableOpacity>

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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 5,
    },
    rowAlignItems: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 15,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        marginBottom: 5,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: BASICO_COLOR_DARK,
        marginRight: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: BASICO_COLOR,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#333',
    },
    veiculoTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: BASICO_COLOR_DARK,
        marginTop: 15,
        marginBottom: 5,
    },
    concluirButton: {
        flexDirection: 'row',
        backgroundColor: BASICO_COLOR_DARK,
        padding: 12,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        gap: 8,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});