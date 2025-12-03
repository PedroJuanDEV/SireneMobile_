// app/(tabs)/incendio/forms3.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardTypeOptions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FormContainerIncendio from './components/FormContainerIncendio';

const INCENDIO_COLOR = '#FF4500'; 

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

interface RadioBoxProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}
const RadioBox: React.FC<RadioBoxProps> = ({ label, selected, onPress }) => (
    <TouchableOpacity style={formStyles.radioBox} onPress={onPress}>
        <View style={[formStyles.radioCircle, selected && formStyles.radioSelected]} />
        <Text style={formStyles.label}>{label}</Text>
    </TouchableOpacity>
);

interface ToggleGroupProps {
    label: string;
    options: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({ label, options, selectedValue, onSelect }) => (
    <View style={formStyles.toggleContainer}>
        <Text style={formStyles.label}>{label}</Text>
        <View style={formStyles.toggleRow}>
            {options.map((option) => (
                <TouchableOpacity 
                    key={option} 
                    style={[
                        formStyles.toggleOption, 
                        selectedValue === option && formStyles.toggleOptionSelected
                    ]} 
                    onPress={() => onSelect(option)}
                >
                    <Text style={[formStyles.toggleText, selectedValue === option && formStyles.toggleTextSelected]}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);


export default function Forms3Natureza2Incendio() {
    const router = useRouter();
    const [sexo, setSexo] = useState('');
    const [victimStatus, setVictimStatus] = useState('');
    const [structureType, setStructureType] = useState('');

    const handleAdvance = () => {
        router.push('/incendio/forms4'); 
    };

    const handleCancel = () => {
        router.back(); 
    };

    return (
        <FormContainerIncendio
            currentStep={3}
            totalSteps={5}
            title="Forms3 - Identificação e Horários"
            onAdvance={handleAdvance}
            onCancel={handleCancel}
            showAdvanceButton={true}
        >
            <ScrollView contentContainerStyle={formStyles.scrollContent}>
                
                <Text style={formStyles.sectionTitle}>Assinatura</Text>
                <TouchableOpacity style={formStyles.signatureBox}>
                    <Text style={formStyles.signaturePlaceholder}>Assinatura digital</Text>
                </TouchableOpacity>

                <Text style={formStyles.sectionTitle}>Dados Pessoais</Text>
                <FormField placeholder="Nome" />
                
                <View style={formStyles.row}>
                    <FormField placeholder="CPF/RG" isSmall keyboardType="numeric" />
                    <FormField placeholder="Órgão expedidor" isSmall />
                </View>

                <View style={formStyles.rowAlignItems}>
                    <FormField placeholder="Telefone" isSmall keyboardType="phone-pad" />
                    <View style={formStyles.genderGroup}>
                        <Text style={formStyles.label}>Sexo:</Text>
                        <RadioBox label="F" selected={sexo === 'F'} onPress={() => setSexo('F')} />
                        <RadioBox label="M" selected={sexo === 'M'} onPress={() => setSexo('M')} />
                    </View>
                </View>

                <Text style={formStyles.sectionTitle}>Horários</Text>
                <View style={formStyles.row}>
                    <FormField placeholder="Hora de saída" isSmall />
                    <FormField placeholder="Horário no local" isSmall />
                </View>
                <View style={formStyles.row}>
                    <FormField placeholder="Hora de saída do local" isSmall />
                    <FormField placeholder="Horário chegada destino" isSmall />
                </View>
                <View style={formStyles.row}>
                    <FormField placeholder="Horário retorno quartel" isSmall />
                    <View style={{ flex: 1 }} /> 
                </View>

                <Text style={formStyles.sectionTitle}>Viaturas</Text>
                <View style={formStyles.row}>
                    <FormField placeholder="VTR local" isSmall />
                    <FormField placeholder="Placa VTR local" isSmall />
                </View>

            </ScrollView>
        </FormContainerIncendio>
    );
}

const formStyles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20, 
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: INCENDIO_COLOR, 
        borderBottomWidth: 2,
        borderBottomColor: INCENDIO_COLOR,
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
    rowAlignItems: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 15,
    },
    toggleContainer: {
        marginBottom: 15,
    },
    toggleRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    toggleOption: {
        backgroundColor: '#eee',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        flexGrow: 1,
        alignItems: 'center',
    },
    toggleOptionSelected: {
        backgroundColor: INCENDIO_COLOR, 
        borderColor: INCENDIO_COLOR,
    },
    toggleText: {
        color: '#333',
        fontWeight: '500',
        fontSize: 14,
    },
    toggleTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    signatureBox: {
        height: 100,
        borderWidth: 1,
        borderColor: INCENDIO_COLOR,
        borderStyle: 'dashed',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        marginBottom: 15,
    },
    signaturePlaceholder: {
        color: '#9CA3AF',
        fontSize: 16,
    },
    genderGroup: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    radioBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
    },
    radioCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: INCENDIO_COLOR,
        marginRight: 5,
        backgroundColor: '#fff',
    },
    radioSelected: {
        backgroundColor: INCENDIO_COLOR,
    },
    concluirButton: {
        flexDirection: 'row',
        backgroundColor: INCENDIO_COLOR,
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