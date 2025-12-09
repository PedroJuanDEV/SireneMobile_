import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import FormContainerIncendio from './components/FormContainerIncendio';

// --- CONSTANTES DE TEMA INCÊNDIO ---
const INCENDIO_COLOR = '#DB2626'; 
// ------------------------------------

const FormField: React.FC<{ label: string; placeholder: string }> = ({ label, placeholder }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} placeholder={placeholder} />
    </View>
);

const ToggleGroup: React.FC<{ label: string; options: string[]; selectedValue: string; onSelect: (value: string) => void }> = ({ label, options, selectedValue, onSelect }) => (
    <View style={styles.toggleContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.toggleRow}>
            {options.map((option) => (
                <TouchableOpacity 
                    key={option} 
                    style={[
                        styles.toggleOption, 
                        selectedValue === option && styles.toggleOptionSelected
                    ]} 
                    onPress={() => onSelect(option)}
                >
                    <Text style={[styles.toggleText, selectedValue === option && styles.toggleTextSelected]}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);


export default function Forms1Natureza2Incendio() {
    const router = useRouter();
    const [tipoIncendio, setTipoIncendio] = React.useState('');
    const [imovelDanos, setImovelDanos] = React.useState('');

    const handleAdvance = () => {
        router.push('/Incendio/forms2'); 
    };

    const handleCancel = () => {
        router.back(); 
    };

    return (
        <FormContainerIncendio // CORREÇÃO 2: Usando o container específico
            currentStep={1}
            totalSteps={5} 
            title="Forms1-Natureza 2 (Incêndio)"
            onAdvance={handleAdvance}
            onCancel={handleCancel}
            showAdvanceButton={true}
        >
            <Text style={styles.sectionTitle}>Dados da Ocorrência</Text>
            <FormField label="Local do Incêndio" placeholder="Ex: Residencial, Comercial, Industrial" />
            <FormField label="Endereço (Complemento)" placeholder="Número do apto, sala, bloco" />

            <Text style={styles.sectionTitle}>Tipo de Incêndio</Text>
            <ToggleGroup 
                label="Classificação"
                options={['Edificação', 'Veículo', 'Mata/Vegetação', 'Outros']}
                selectedValue={tipoIncendio}
                onSelect={setTipoIncendio}
            />
            
            <Text style={styles.sectionTitle}>Imóvel e Vítimas</Text>
            
            <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <ToggleGroup 
                        label="Houve Danos?"
                        options={['SIM', 'NÃO']}
                        selectedValue={imovelDanos}
                        onSelect={setImovelDanos}
                    />
                </View>
                <View style={{ flex: 1 }}>
                   <FormField label="Nº de Vítimas" placeholder="0" />
                </View>
            </View>
            
            <FormField label="Material em Combustão" placeholder="Ex: Madeira, Plástico, Líquido Inflamável" />
            <FormField label="Área Atingida (m²)" placeholder="Ex: 50" />

        </FormContainerIncendio>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 8,
        color: INCENDIO_COLOR, 
    },
    inputGroup: {
        marginBottom: 10,
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
        marginBottom: 10,
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
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    toggleOptionSelected: {
        backgroundColor: INCENDIO_COLOR, 
        borderColor: INCENDIO_COLOR,
    },
    toggleText: {
        color: '#333',
        fontWeight: '500',
    },
    toggleTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
});