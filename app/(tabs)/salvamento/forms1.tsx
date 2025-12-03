// app/(tabs)/Salvamento/forms1.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardTypeOptions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FormContainerSalvamento from './components/FormContainerSalvamento';

const SALVAMENTO_COLOR = '#FF8C00'; 

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
            {selected && <Text style={{color: '#fff', fontSize: 14}}>✓</Text>}
        </View>
        <Text style={formStyles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

// --- COMPONENTE PRINCIPAL ---
export default function Forms1Natureza3Salvamento() {
    const router = useRouter();
    const [formaAcionamento, setFormaAcionamento] = useState('');
    const [situacaoOcorrencia, setSituacaoOcorrencia] = useState('');
    const [localAcionamento, setLocalAcionamento] = useState('');
    const [outrosAcionamento, setOutrosAcionamento] = useState(false);
    const [outrosLocal, setOutrosLocal] = useState(false);

    const handleAdvance = () => {
        router.push('/salvamento/forms2'); 
    };

    const handleCancel = () => {
        router.back(); 
    };

    return (
        <FormContainerSalvamento
            currentStep={1}
            totalSteps={5}
            title="Forms1 - Acionamento"
            onAdvance={handleAdvance}
            onCancel={handleCancel}
            showAdvanceButton={true}
        >
            <ScrollView contentContainerStyle={formStyles.scrollContent}>
                
                <Text style={formStyles.sectionTitle}>Forma de Acionamento</Text>
                
                <View style={formStyles.row}>
                    <FormField placeholder="Ponto Base" isSmall />
                    <FormField placeholder="QG/OBM" isSmall />
                    <FormField placeholder="Tipo/VTR" isSmall />
                </View>

                <View style={formStyles.rowCheck}>
                    <Checkbox label="CO de agrupamento" selected={formaAcionamento === 'CO'} onPress={() => setFormaAcionamento('CO')} />
                    <Checkbox label="Pessoalmente" selected={formaAcionamento === 'Pessoalmente'} onPress={() => setFormaAcionamento('Pessoalmente')} />
                </View>
                <View style={formStyles.rowCheck}>
                    <Checkbox label="CIODS" selected={formaAcionamento === 'CIODS'} onPress={() => setFormaAcionamento('CIODS')} />
                    <Checkbox label="193" selected={formaAcionamento === '193'} onPress={() => setFormaAcionamento('193')} />
                    <Checkbox label="Outros" selected={outrosAcionamento} onPress={() => setOutrosAcionamento(!outrosAcionamento)} />
                </View>
                {outrosAcionamento && <TextInput style={formStyles.input} placeholder="Especifique a outra forma de acionamento" />}
                
                <Text style={formStyles.sectionTitle}>Situação da Ocorrência</Text>
                
                <View style={formStyles.rowCheck}>
                    <Checkbox label="Atendida" selected={situacaoOcorrencia === 'Atendida'} onPress={() => setSituacaoOcorrencia('Atendida')} />
                    <Checkbox label="Trote" selected={situacaoOcorrencia === 'Trote'} onPress={() => setSituacaoOcorrencia('Trote')} />
                    <Checkbox label="Cancelada" selected={situacaoOcorrencia === 'Cancelada'} onPress={() => setSituacaoOcorrencia('Cancelada')} />
                </View>
                
                <View style={formStyles.rowCheck}>
                    <Checkbox label="Sem atuação/motivo" selected={situacaoOcorrencia === 'Sem'} onPress={() => setSituacaoOcorrencia('Sem')} />
                </View>

                <Text style={formStyles.sectionTitle}>Local de Acionamento</Text>
                
                <View style={formStyles.rowCheck}>
                    <Checkbox label="Ponto zero" selected={localAcionamento === 'Ponto zero'} onPress={() => setLocalAcionamento('Ponto zero')} />
                    <Checkbox label="Retornar ao ponto zero" selected={localAcionamento === 'Retornar'} onPress={() => setLocalAcionamento('Retornar')} />
                </View>
                <View style={formStyles.rowCheck}>
                    <Checkbox label="Imediatamente após finalizar anterior" selected={localAcionamento === 'Imediatamente'} onPress={() => setLocalAcionamento('Imediatamente')} />
                </View>
                <View style={formStyles.rowCheck}>
                    <Checkbox label="Outros" selected={outrosLocal} onPress={() => setOutrosLocal(!outrosLocal)} />
                </View>
                {outrosLocal && <TextInput style={formStyles.input} placeholder="Especifique o outro local" />}

            </ScrollView>
        </FormContainerSalvamento>
    );
}

// --- ESTILOS COMPARTILHADOS ---
const formStyles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20, 
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: SALVAMENTO_COLOR, 
        borderBottomWidth: 2,
        borderBottomColor: SALVAMENTO_COLOR,
        paddingBottom: 5,
    },
    inputGroup: {
        marginBottom: 15,
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
        borderColor: SALVAMENTO_COLOR,
        marginRight: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: SALVAMENTO_COLOR,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#333',
    },
    // Removendo estilos desnecessários para Forms1 (mas mantendo o nome formStyles)
});