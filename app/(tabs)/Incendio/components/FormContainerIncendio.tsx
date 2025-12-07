import { Stack, useNavigation } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useFormStore } from '@/src/context/FormStore';

const INCENDIO_COLOR_HEADER = '#DB2626'; 
const INCENDIO_COLOR_STEPS = '#DB2626';
const INCENDIO_TITLE = 'SALVAMENTO E INCÊNDIO';
const INCENDIO_NATURE = 'Natureza 2';

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

// TROCANDO O "const" pela declaração "function" com export default
export default function FormContainerIncendio({
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
    const store = useFormStore();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: title,
            headerStyle: {
                backgroundColor: INCENDIO_COLOR_HEADER,
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
                    { backgroundColor: index + 1 === currentStep ? INCENDIO_COLOR_STEPS : '#fff' },
                    { borderColor: index + 1 === currentStep ? INCENDIO_COLOR_STEPS : '#A9A9A9' },
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

            <View style={[styles.header, { backgroundColor: INCENDIO_COLOR_HEADER }]}>
                <Text style={styles.headerText}>{INCENDIO_TITLE}</Text>
                <Text style={styles.headerTextSubtitle}>{INCENDIO_NATURE}</Text>
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
                    <TouchableOpacity style={styles.saveButton} onPress={async () => {
                        try {
                            const payload = {
                                titulo: 'Registro de formulário',
                                observacoes: 'Rascunho salvo pelo app',
                                dataRegistro: new Date().toISOString(),
                            };
                            const result = await store.saveRegistro(payload);
                            if (result.offline) {
                                Alert.alert('Salvo offline', 'Registro salvo localmente. Será sincronizado quando houver conexão.');
                            } else if (result.ok) {
                                Alert.alert('Sucesso', 'Registro enviado com sucesso.');
                            } else {
                                Alert.alert('Aviso', 'Registro salvo (possível problema ao enviar).');
                            }
                        } catch (err) {
                            console.warn('Erro ao salvar registro', err);
                            Alert.alert('Erro', 'Não foi possível salvar o registro.');
                        }
                    }}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                )}

                {showAdvanceButton && (
                    <TouchableOpacity style={[styles.advanceButton, { backgroundColor: INCENDIO_COLOR_HEADER }]} onPress={onAdvance}>
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