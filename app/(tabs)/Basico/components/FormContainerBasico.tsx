// app/(tabs)/basico/components/FormContainerBasico.tsx

import { Stack, useNavigation } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- CORES FIXAS DO TEMA BÁSICO (Vinho/Borgonha) ---
const BASICO_COLOR_HEADER = '#999999'; // Cinza Claro (Cor do Cabeçalho da Imagem)
const BASICO_COLOR_STEPS = '#800000'; // Vinho / Marrom Escuro
const BASICO_COLOR_ACTION = '#800000'; // Vinho para botões
const BASICO_TITLE = 'FORMULÁRIO BÁSICO';
const BASICO_NATURE = 'Natureza 1';
// -----------------------------------------------------------

interface FormContainerProps {
    currentStep: number;
    totalSteps: number;
    title: string;
    children: React.ReactNode;
    onAdvance: () => void;
    onCancel: () => void;
    showAdvanceButton: boolean;
    advanceText?: string;
    showSaveButton?: boolean;
}

export default function FormContainerBasico({
    currentStep,
    totalSteps,
    title,
    children,
    onAdvance,
    onCancel,
    showAdvanceButton,
    advanceText = 'Avançar',
    showSaveButton = true,
}: FormContainerProps) {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: title,
            headerStyle: {
                backgroundColor: BASICO_COLOR_HEADER, // Cabeçalho Cinza
            },
            headerTintColor: '#fff', 
            headerTitleAlign: 'center',
        });
    }, [navigation, title]);


    const renderSteps = () => {
        return Array.from({ length: totalSteps }, (_, index) => (
            <View
                key={index}
                style={[
                    styles.stepCircle,
                    { backgroundColor: index + 1 === currentStep ? BASICO_COLOR_STEPS : '#fff' },
                    { borderColor: index + 1 === currentStep ? BASICO_COLOR_STEPS : '#A9A9A9' },
                ]}
            >
                <Text style={[styles.stepText, { color: index + 1 === currentStep ? '#fff' : '#A9A9A9' }]}>
                    {index + 1}
                </Text>
            </View>
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: title, headerShown: true }} />

            <View style={[styles.header, { backgroundColor: BASICO_COLOR_HEADER }]}>
                <Text style={styles.headerText}>{BASICO_TITLE}</Text>
                <Text style={styles.headerTextSubtitle}>{BASICO_NATURE}</Text>
            </View>

            <View style={styles.stepsContainer}>
                {renderSteps()}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    {children}
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                {/* Cancelar (Vinho na Imagem) */}
                <TouchableOpacity style={[styles.cancelButton, {borderColor: BASICO_COLOR_ACTION}]} onPress={onCancel}>
                    <Text style={[styles.buttonText, {color: BASICO_COLOR_ACTION}]}>Cancelar</Text>
                </TouchableOpacity>

                {showSaveButton && (
                    <TouchableOpacity style={[styles.saveButton, {backgroundColor: BASICO_COLOR_ACTION}]} onPress={() => console.log('Salvar Rascunho')}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                )}

                {showAdvanceButton && (
                    <TouchableOpacity style={[styles.advanceButton, { backgroundColor: BASICO_COLOR_ACTION }]} onPress={onAdvance}>
                        <Text style={styles.buttonText}>{advanceText}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f0f0' },
    header: { paddingVertical: 10, paddingHorizontal: 15 },
    headerText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    headerTextSubtitle: { color: '#fff', fontSize: 12 },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 40,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    stepCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepText: { fontWeight: 'bold' },
    scrollContent: { flexGrow: 1 },
    content: { padding: 15 },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
    },
    cancelButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    saveButton: {
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    advanceButton: {
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});