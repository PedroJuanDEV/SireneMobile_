// app/(tabs)/incendio/forms2.tsx

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Importa o container específico que acabamos de validar
import FormContainerIncendio from './components/FormContainerIncendio';

// --- CONSTANTES DE TEMA INCÊNDIO ---
const INCENDIO_COLOR = '#FF4500'; 
// ------------------------------------

// Componente de Campo Simples (Reutilizado)
const FormField: React.FC<{ label: string; placeholder: string; isSmall?: boolean; keyboardType?: 'numeric' | 'default' }> = ({ label, placeholder, isSmall = false, keyboardType = 'default' }) => (
    <View style={[styles.inputGroup, isSmall && styles.smallInputGroup]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} placeholder={placeholder} keyboardType={keyboardType} />
    </View>
);

// Componente para seleção de Botões (ToggleGroup - Reutilizado)
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


export default function Forms2Natureza2Incendio() {
    const router = useRouter();
    const [tipoAgua, setTipoAgua] = useState('');
    const [tipoResgate, setTipoResgate] = useState('');

    const handleAdvance = () => {
        // Navega para a próxima etapa: forms3.tsx
        router.push('/incendio/forms3'); 
    };

    const handleCancel = () => {
        router.back(); 
    };

    return (
        <FormContainerIncendio
            currentStep={2}
            totalSteps={5} 
            title="Forms2-Natureza 2 (Incêndio)"
            onAdvance={handleAdvance}
            onCancel={handleCancel}
            showAdvanceButton={true}
        >
            {/* 1. Coordenadas e Localização (Reutilizado de outros forms) */}
            <Text style={styles.sectionTitle}>Coordenadas</Text>

            <View style={styles.row}>
                <FormField label="Latitude" placeholder="-8.00000" isSmall keyboardType="numeric" />
                <FormField label="Longitude" placeholder="-34.00000" isSmall keyboardType="numeric" />
            </View>
            <TouchableOpacity style={styles.localizationButton}>
                <MaterialIcons name="my-location" size={20} color="#fff" />
                <Text style={styles.localizationText}>Localização atual</Text>
            </TouchableOpacity>

            {/* 2. Recursos Utilizados */}
            <Text style={styles.sectionTitle}>Recursos Utilizados</Text>
            
            <ToggleGroup 
                label="Tipo de Água"
                options={['Própria', 'Municipal', 'Carro Pipa', 'Outros']}
                selectedValue={tipoAgua}
                onSelect={setTipoAgua}
            />
            
            <ToggleGroup 
                label="Resgate de Vítimas"
                options={['Sim', 'Não']}
                selectedValue={tipoResgate}
                onSelect={setTipoResgate}
            />
            
            <FormField label="Tempo de Combate (min)" placeholder="Ex: 30" keyboardType="numeric" />
            <FormField label="Água Utilizada (litros)" placeholder="Ex: 500" keyboardType="numeric" />

            {/* 3. Fotos/Vídeos */}
            <Text style={styles.sectionTitle}>Fotos/Vídeos</Text>
            <View style={styles.mediaRow}>
                <TouchableOpacity style={styles.mediaButton}>
                    <FontAwesome name="camera" size={24} color={INCENDIO_COLOR} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mediaButton}>
                    <FontAwesome name="video-camera" size={24} color={INCENDIO_COLOR} />
                </TouchableOpacity>
            </View>

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
        marginBottom: 10,
        alignItems: 'flex-start',
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
        fontSize: 12,
    },
    toggleTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    localizationButton: {
        flexDirection: 'row',
        backgroundColor: INCENDIO_COLOR, 
        padding: 12,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },
    localizationText: {
        color: '#fff',
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
        borderColor: INCENDIO_COLOR,
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
});