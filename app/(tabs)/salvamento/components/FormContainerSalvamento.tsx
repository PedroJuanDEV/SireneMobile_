// app/(tabs)/Salvamento/components/FormContainerSalvamento.tsx

import { Stack, useNavigation } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- CORES FIXAS DO TEMA SALVAMENTO ---
const SALVAMENTO_COLOR_HEADER = '#FF8C00'; 
const SALVAMENTO_COLOR_STEPS = '#FF8C00';
const SALVAMENTO_TITLE = 'SALVAMENTO';
const SALVAMENTO_NATURE = 'Natureza 3';
// ---------------------------------------

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

export default function FormContainerSalvamento({
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
                backgroundColor: SALVAMENTO_COLOR_HEADER,
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
                    { backgroundColor: index + 1 === currentStep ? SALVAMENTO_COLOR_STEPS : '#fff' },
                    { borderColor: index + 1 === currentStep ? SALVAMENTO_COLOR_STEPS : '#A9A9A9' },
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

            <View style={[styles.header, { backgroundColor: SALVAMENTO_COLOR_HEADER }]}>
                <Text style={styles.headerText}>{SALVAMENTO_TITLE}</Text>
                <Text style={styles.headerTextSubtitle}>{SALVAMENTO_NATURE}</Text>
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
                    <TouchableOpacity style={[styles.advanceButton, { backgroundColor: SALVAMENTO_COLOR_HEADER }]} onPress={onAdvance}>
                        <Text style={styles.buttonText}>{advanceText}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    headerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerTextSubtitle: {
        color: '#fff',
        fontSize: 12,
    },
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
    stepText: {
        fontWeight: 'bold',
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        padding: 15,
    },
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
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});