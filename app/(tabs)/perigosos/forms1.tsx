// app/(tabs)/Perigosos/forms1.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardTypeOptions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FormContainerPerigosos from './components/FormContainerPerigosos';

const PERIGOSOS_COLOR = '#FFD700'; 
const PERIGOSOS_COLOR_DARK = '#998100'; // Cor mais escura para texto em fundo claro

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
        <TextInput style={formStyles.input} placeholder={placeholder} keyboardType={keyboardType} />
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
            {selected && <Text style={{color: '#000', fontSize: 14}}>✓</Text>}
        </View>
        <Text style={formStyles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

// --- COMPONENTE PRINCIPAL ---
export default function Forms1Natureza4Perigosos() {
    const router = useRouter();
    const [formaAcionamento, setFormaAcionamento] = useState('');
    const [situacaoOcorrencia, setSituacaoOcorrencia] = useState('');
    const [localAcionamento, setLocalAcionamento] = useState('');

    const handleAdvance = () => {
        router.push('/perigosos/forms2'); 
    };

    const handleCancel = () => {
        router.back(); 
    };

    const checkState = (currentState, expectedState) => {
        return currentState.includes(expectedState);
    };

    const handleToggle = (state, setState, value) => {
        setState(state === value ? '' : value);
    };
    
    // Toggle para acionamento
    const handleAcionamentoToggle = (value) => {
        setFormaAcionamento(checkState(formaAcionamento, value) ? formaAcionamento.replace(value, '').trim() : formaAcionamento + ' ' + value);
    };

    // Toggle para Local de Acionamento (Mantendo checkboxes mútiplos para os três)
    const handleLocalToggle = (value) => {
        setLocalAcionamento(checkState(localAcionamento, value) ? localAcionamento.replace(value, '').trim() : localAcionamento + ' ' + value);
    };


    return (
        <FormContainerPerigosos
            currentStep={1}
            totalSteps={5}
            title="Forms1 - Acionamento"
            onAdvance={handleAdvance}
            onCancel={handleCancel}
            showAdvanceButton={true}
        >
            <ScrollView contentContainerStyle={formStyles.scrollContent}>
                
                <View style={formStyles.row}>
                    <FormField placeholder="Ponto Base" isSmall />
                    <FormField placeholder="CME" isSmall />
                    <FormField placeholder="Tipo/VTR" isSmall />
                </View>
                <View style={formStyles.row}>
                    <FormField placeholder="Nº do aviso" isSmall keyboardType="numeric" />
                    <FormField placeholder="dia/hora" isSmall />
                </View>

                <Text style={formStyles.sectionTitle}>Forma de Acionamento</Text>
                
                <View style={formStyles.rowCheck}>
                    <Checkbox label="CO de agrupamento" selected={checkState(formaAcionamento, 'CO')} onPress={() => handleAcionamentoToggle('CO')} />
                    <Checkbox label="Pessoalmente" selected={checkState(formaAcionamento, 'Pessoalmente')} onPress={() => handleAcionamentoToggle('Pessoalmente')} />
                </View>
                <View style={formStyles.rowCheck}>
                    <Checkbox label="CIODS" selected={checkState(formaAcionamento, 'CIODS')} onPress={() => handleAcionamentoToggle('CIODS')} />
                    <Checkbox label="193" selected={checkState(formaAcionamento, '193')} onPress={() => handleAcionamentoToggle('193')} />
                    <Checkbox label="Outros___" selected={checkState(formaAcionamento, 'Outros')} onPress={() => handleAcionamentoToggle('Outros')} />
                </View>
                {checkState(formaAcionamento, 'Outros') && <TextInput style={formStyles.input} placeholder="Especifique a outra forma de acionamento" />}

                
                <Text style={formStyles.sectionTitle}>Situação da Ocorrência</Text>
                
                <View style={formStyles.rowCheck}>
                    <Checkbox label="Atendida" selected={situacaoOcorrencia === 'Atendida'} onPress={() => setSituacaoOcorrencia('Atendida')} />
                    <Checkbox label="Trote" selected={situacaoOcorrencia === 'Trote'} onPress={() => setSituacaoOcorrencia('Trote')} />
                    <Checkbox label="Cancelada" selected={situacaoOcorrencia === 'Cancelada'} onPress={() => setSituacaoOcorrencia('Cancelada')} />
                </View>
                
                <View style={formStyles.rowCheck}>
                    <Checkbox label="Sem atuação/motivo___" selected={situacaoOcorrencia === 'Sem'} onPress={() => setSituacaoOcorrencia('Sem')} />
                </View>
                {situacaoOcorrencia === 'Sem' && <TextInput style={formStyles.input} placeholder="Especifique o motivo da não atuação" />}


                <Text style={formStyles.sectionTitle}>Local de Acionamento</Text>
                
                <View style={formStyles.rowCheck}>
                    <Checkbox label="Ponto zero" selected={checkState(localAcionamento, 'Ponto zero')} onPress={() => handleLocalToggle('Ponto zero')} />
                    <Checkbox label="Retornar ao ponto zero" selected={checkState(localAcionamento, 'Retornar')} onPress={() => handleLocalToggle('Retornar')} />
                </View>
                <View style={formStyles.rowCheck}>
                    <Checkbox label="Imediatamente após finalizar anterior" selected={checkState(localAcionamento, 'Imediatamente')} onPress={() => handleLocalToggle('Imediatamente')} />
                </View>
                <View style={formStyles.rowCheck}>
                    <Checkbox label="Outros___" selected={checkState(localAcionamento, 'Outros')} onPress={() => handleLocalToggle('Outros')} />
                </View>
                {checkState(localAcionamento, 'Outros') && <TextInput style={formStyles.input} placeholder="Especifique o outro local" />}

            </ScrollView>
        </FormContainerPerigosos>
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
        color: PERIGOSOS_COLOR_DARK, 
        borderBottomWidth: 2,
        borderBottomColor: PERIGOSOS_COLOR_DARK,
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
    rowCheck: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 5,
        gap: 10,
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
        borderColor: PERIGOSOS_COLOR_DARK,
        marginRight: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: PERIGOSOS_COLOR,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#333',
    },
});