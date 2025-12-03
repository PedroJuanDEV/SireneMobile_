// app/(tabs)/Perigosos/components/FormContainerPerigosos.tsx

import { Stack, useNavigation } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- CORES FIXAS DO TEMA PRODUTOS PERIGOSOS ---
const PERIGOSOS_COLOR_HEADER = '#FFD700';
const PERIGOSOS_COLOR_STEPS = '#FFD700';
const PERIGOSOS_TITLE = 'PRODUTOS PERIGOSOS';
const PERIGOSOS_NATURE = 'Natureza 4';
// ----------------------------------------------

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

export default function FormContainerPerigosos({
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
                backgroundColor: PERIGOSOS_COLOR_HEADER,
            },
            headerTintColor: '#000', // Texto preto para cabeçalho amarelo
            headerTitleAlign: 'center',
        });
    }, [navigation, title]);


    const renderSteps = () => {
        return Array.from({ length: totalSteps }, (_, index) => (
            <View
                key={index}
                style={[
                    styles.stepCircle,
                    { backgroundColor: index + 1 === currentStep ? PERIGOSOS_COLOR_STEPS : '#fff' },
                    { borderColor: index + 1 === currentStep ? PERIGOSOS_COLOR_STEPS : '#A9A9A9' },
                ]}
            >
                <Text style={[styles.stepText, { color: index + 1 === currentStep ? '#000' : '#A9A9A9' }]}>
                    {index + 1}
                </Text>
            </View>
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: title, headerShown: true }} />

            <View style={[styles.header, { backgroundColor: PERIGOSOS_COLOR_HEADER }]}>
                <Text style={[styles.headerText, { color: '#000' }]}>{PERIGOSOS_TITLE}</Text>
                <Text style={[styles.headerTextSubtitle, { color: '#000' }]}>{PERIGOSOS_NATURE}</Text>
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
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>

                {showSaveButton && (
                    <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Salvar Rascunho')}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                )}

                {showAdvanceButton && (
                    <TouchableOpacity style={[styles.advanceButton, { backgroundColor: PERIGOSOS_COLOR_HEADER }]} onPress={onAdvance}>
                        <Text style={[styles.buttonText, { color: '#000' }]}>{advanceText}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f0f0' },
    header: { paddingVertical: 10, paddingHorizontal: 15 },
    headerText: { fontSize: 16, fontWeight: 'bold' },
    headerTextSubtitle: { fontSize: 12 },
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
        backgroundColor: '#9CA3AF',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#FBBF24',
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
    buttonText: { fontWeight: 'bold' },
});