// app/(tabs)/Perigosos/forms2.tsx

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardTypeOptions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FormContainerPerigosos from './components/FormContainerPerigosos';

const PERIGOSOS_COLOR = '#FFD700';
const PERIGOSOS_COLOR_DARK = '#998100';

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
export default function Forms2Natureza4Perigosos() {
    const router = useRouter();
    const [areaOBM, setAreaOBM] = useState('');

    const handleAdvance = () => {
        router.push('/perigosos/forms3'); 
    };

    const handleCancel = () => {
        router.back(); 
    };

    return (
        <FormContainerPerigosos
            currentStep={2}
            totalSteps={5}
            title="Forms2 - Localização e Mídia"
            onAdvance={handleAdvance}
            onCancel={handleCancel}
            showAdvanceButton={true}
        >
            <ScrollView contentContainerStyle={formStyles.scrollContent}>
                
                <Text style={formStyles.sectionTitle}>Local da Ocorrência</Text>
                
                <View style={formStyles.row}>
                    <FormField placeholder="Logradouro" isSmall />
                    <FormField placeholder="Nº" isSmall keyboardType="numeric" />
                </View>
                <View style={formStyles.row}>
                    <FormField placeholder="Bairro" isSmall />
                    <FormField placeholder="Município/UF" isSmall />
                </View>

                <Text style={formStyles.sectionTitle}>Coordenadas</Text>
                
                <View style={formStyles.row}>
                    <FormField placeholder="LAT." isSmall keyboardType="numeric" />
                    <FormField placeholder="LONG." isSmall keyboardType="numeric" />
                </View>
                
                <TouchableOpacity style={formStyles.localizationButton}>
                    <MaterialIcons name="my-location" size={20} color="#000" />
                    <Text style={formStyles.localizationText}>Localização atual</Text>
                </TouchableOpacity>

                <Text style={formStyles.sectionTitle}>Área da OBM</Text>
                
                <View style={formStyles.rowAlignItems}>
                    <Checkbox label="SIM" selected={areaOBM === 'SIM'} onPress={() => setAreaOBM('SIM')} />
                    <Checkbox label="NÃO" selected={areaOBM === 'NÃO'} onPress={() => setAreaOBM('NÃO')} />
                    <FormField placeholder="Código do local" />
                </View>

                <Text style={formStyles.sectionTitle}>Fotos/Vídeos</Text>
                
                <View style={formStyles.mediaRow}>
                    <TouchableOpacity style={formStyles.mediaButton}>
                        <FontAwesome name="camera" size={30} color={PERIGOSOS_COLOR_DARK} />
                    </TouchableOpacity>
                    <TouchableOpacity style={formStyles.mediaButton}>
                        <FontAwesome name="video-camera" size={30} color={PERIGOSOS_COLOR_DARK} />
                    </TouchableOpacity>
                    <TouchableOpacity style={formStyles.mediaButton}>
                        <MaterialIcons name="folder-open" size={30} color={PERIGOSOS_COLOR_DARK} />
                    </TouchableOpacity>
                </View>

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
    localizationButton: {
        flexDirection: 'row',
        backgroundColor: PERIGOSOS_COLOR,
        padding: 12,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },
    localizationText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    mediaRow: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20,
    },
    mediaButton: {
        borderWidth: 2,
        borderColor: PERIGOSOS_COLOR_DARK,
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
});