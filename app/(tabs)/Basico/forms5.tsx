// app/(tabs)/basico/forms5.tsx

import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardTypeOptions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createFormularioBasico } from '../../../src/api/formularioBasico';
import FormContainerBasico from './components/FormContainerBasico';

const BASICO_COLOR = '#FF4500';
const BASICO_COLOR_DARK = '#D23C00';

// --- COMPONENTES AUXILIARES ---

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

interface CheckboxProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}
const Checkbox: React.FC<CheckboxProps> = ({ label, selected, onPress }) => (
    <TouchableOpacity style={formStyles.checkboxContainer} onPress={onPress}>
        <View style={[formStyles.checkbox, selected && formStyles.checkboxSelected]}>
            {selected && <MaterialIcons name="check" size={14} color="#fff" />}
        </View>
        <Text style={formStyles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

// --- COMPONENTE PRINCIPAL ---
export default function Forms5Natureza1Basico() {
    const router = useRouter();
    const [veiculosSim, setVeiculosSim] = useState(true);
    // Campos do formulário (controlados)
    const [pontoBase, setPontoBase] = useState('');
    const [ome, setOme] = useState('');
    const [viaturaResponsavel, setViaturaResponsavel] = useState('');
    const [numeroAviso, setNumeroAviso] = useState('');

    const [veh1Modelo, setVeh1Modelo] = useState('');
    const [veh1Placa, setVeh1Placa] = useState('');
    const [veh1UF, setVeh1UF] = useState('');
    const [veh1Cor, setVeh1Cor] = useState('');
    const [veh1CPF, setVeh1CPF] = useState('');
    const [veh1Orgao, setVeh1Orgao] = useState('');
    const [veh1Nome, setVeh1Nome] = useState('');

    const [veh2Modelo, setVeh2Modelo] = useState('');
    const [veh2Placa, setVeh2Placa] = useState('');
    const [veh2UF, setVeh2UF] = useState('');
    const [veh2Cor, setVeh2Cor] = useState('');
    const [veh2CPF, setVeh2CPF] = useState('');
    const [veh2Orgao, setVeh2Orgao] = useState('');
    const [veh2Nome, setVeh2Nome] = useState('');

    const [postoGrad, setPostoGrad] = useState('');
    const [matriculaCmt, setMatriculaCmt] = useState('');
    const [matriculaUnid, setMatriculaUnid] = useState('');
    const [matriculaIndiv, setMatriculaIndiv] = useState('');
    const [sending, setSending] = useState(false);

    const handleAdvance = async () => {
        // Submeter o formulário ao backend
        try {
            setSending(true);
            const token = await SecureStore.getItemAsync('token');
            if (!token) {
                Alert.alert('Autenticação', 'Você precisa fazer login para enviar o formulário.');
                return;
            }

            const payload: any = {
                pontoBase,
                ome,
                viaturaResponsavel,
                numeroAviso,
                dados: {
                    veiculosSim,
                    veiculos: [
                        {
                            modelo: veh1Modelo,
                            placa: veh1Placa,
                            uf: veh1UF,
                            cor: veh1Cor,
                            documento: veh1CPF,
                            orgaoExpedidor: veh1Orgao,
                            nome: veh1Nome,
                        },
                        {
                            modelo: veh2Modelo,
                            placa: veh2Placa,
                            uf: veh2UF,
                            cor: veh2Cor,
                            documento: veh2CPF,
                            orgaoExpedidor: veh2Orgao,
                            nome: veh2Nome,
                        }
                    ],
                    guarnicao: {
                        postoGrad,
                        matriculaCmt,
                        matriculaUnid,
                        matriculaIndiv,
                    }
                }
            };

            const resp = await createFormularioBasico(payload, token);
            console.log('createFormularioBasico resp:', resp);
            Alert.alert('Sucesso', 'Formulário enviado com sucesso.');
            // navegar para ocorrências para verificar
            router.replace('/Ocorrencias');
        } catch (err: any) {
            console.error('Erro ao enviar formulário:', err);
            Alert.alert('Erro', err?.message ? String(err.message) : 'Erro ao enviar formulário');
        } finally {
            setSending(false);
        }
    };

    const handleCancel = () => {
        router.back(); 
    };

    return (
        <FormContainerBasico
            currentStep={5}
            totalSteps={5}
            title="Forms5 - Encerramento"
            onAdvance={handleAdvance}
            onCancel={handleCancel}
            showAdvanceButton={true}
            advanceText="Concluir"
        >
            <ScrollView contentContainerStyle={formStyles.scrollContent}>
                
                <Text style={formStyles.sectionTitle}>Veículos Envolvidos</Text>
                <View style={formStyles.rowAlignItems}>
                    <Checkbox label="Sim" selected={veiculosSim} onPress={() => setVeiculosSim(true)} />
                    <Checkbox label="Não" selected={!veiculosSim} onPress={() => setVeiculosSim(false)} />
                </View>

                {veiculosSim && (
                    <View>
                        {/* Veículo 1 */}
                        <Text style={formStyles.veiculoTitle}>1º</Text>
                        <View style={formStyles.row}>
                            <FormField placeholder="Modelo" isSmall value={veh1Modelo} onChangeText={setVeh1Modelo} />
                            <FormField placeholder="Placa" isSmall value={veh1Placa} onChangeText={setVeh1Placa} />
                            <FormField placeholder="UF" isSmall value={veh1UF} onChangeText={setVeh1UF} />
                        </View>
                        <View style={formStyles.row}>
                            <FormField placeholder="Cor" isSmall value={veh1Cor} onChangeText={setVeh1Cor} />
                            <FormField placeholder="CPF/RG" isSmall keyboardType="numeric" value={veh1CPF} onChangeText={setVeh1CPF} />
                            <FormField placeholder="Orgão expedidor" isSmall value={veh1Orgao} onChangeText={setVeh1Orgao} />
                        </View>
                        <FormField placeholder="Nome" value={veh1Nome} onChangeText={setVeh1Nome} />

                        {/* Veículo 2 */}
                        <Text style={formStyles.veiculoTitle}>2º</Text>
                        <View style={formStyles.row}>
                            <FormField placeholder="Modelo" isSmall value={veh2Modelo} onChangeText={setVeh2Modelo} />
                            <FormField placeholder="Placa" isSmall value={veh2Placa} onChangeText={setVeh2Placa} />
                            <FormField placeholder="UF" isSmall value={veh2UF} onChangeText={setVeh2UF} />
                        </View>
                        <View style={formStyles.row}>
                            <FormField placeholder="Cor" isSmall value={veh2Cor} onChangeText={setVeh2Cor} />
                            <FormField placeholder="CPF/RG" isSmall keyboardType="numeric" value={veh2CPF} onChangeText={setVeh2CPF} />
                            <FormField placeholder="Orgão expedidor" isSmall value={veh2Orgao} onChangeText={setVeh2Orgao} />
                        </View>
                        <FormField placeholder="Nome" value={veh2Nome} onChangeText={setVeh2Nome} />
                    </View>
                )}


                <Text style={formStyles.sectionTitle}>Guarnição Empenhada</Text>
                <View style={formStyles.row}>
                    <FormField placeholder="Posto/Grad." isSmall value={postoGrad} onChangeText={setPostoGrad} />
                    <FormField placeholder="Matrícula-CMT op" isSmall value={matriculaCmt} onChangeText={setMatriculaCmt} />
                </View>
                <View style={formStyles.row}>
                    <FormField placeholder="Matrícula unid. tática" isSmall value={matriculaUnid} onChangeText={setMatriculaUnid} />
                    <FormField placeholder="Matrícula indiv. tática" isSmall value={matriculaIndiv} onChangeText={setMatriculaIndiv} />
                </View>
                
                <Text style={formStyles.label}>Visto de divisão de op./ Concluir</Text>
                <TouchableOpacity style={formStyles.concluirButton} onPress={handleAdvance} disabled={sending}>
                    {sending ? <ActivityIndicator color="#fff" /> : <MaterialIcons name="done-all" size={24} color="#fff" />}
                    <Text style={formStyles.addButtonText}>Concluir</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[formStyles.concluirButton, { backgroundColor: '#007ACC', marginTop: 12 }]}
                    onPress={async () => {
                        try {
                            const payload = {
                                // Campos mínimos aceitos pelo service/prisma
                                pontoBase: 'Ponto Teste',
                                ome: 'OME Teste',
                                viaturaResponsavel: veiculosSim ? 'VTR-TESTE' : '',
                                numeroAviso: '0001',
                                dados: { veiculosSim },
                            };

                            const token = await SecureStore.getItemAsync('token');
                            if (!token) {
                                Alert.alert('Autenticação', 'Você precisa fazer login para enviar o formulário.');
                                return;
                            }

                            Alert.alert('Enviando', 'Enviando formulário básico...');
                            const resp = await createFormularioBasico(payload, token);
                            console.log('Resposta createFormularioBasico:', resp);
                            Alert.alert('Sucesso', `Formulário enviado (resposta: ${JSON.stringify(resp)})`);
                            // Navega para lista de ocorrências (para verificar)
                            router.push('/Ocorrencias');
                        } catch (err: any) {
                            console.error('Erro criando formulário:', err);
                            Alert.alert('Erro', err?.message ? String(err.message) : 'Não foi possível criar formulário.');
                        }
                    }}
                >
                    <MaterialIcons name="send" size={20} color="#fff" />
                    <Text style={[formStyles.addButtonText, { marginLeft: 8 }]}>Enviar formulário (teste)</Text>
                </TouchableOpacity>

            </ScrollView>
        </FormContainerBasico>
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
        color: BASICO_COLOR_DARK, 
        borderBottomWidth: 2,
        borderBottomColor: BASICO_COLOR_DARK,
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
        borderColor: BASICO_COLOR_DARK,
        marginRight: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: BASICO_COLOR,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#333',
    },
    veiculoTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: BASICO_COLOR_DARK,
        marginTop: 15,
        marginBottom: 5,
    },
    concluirButton: {
        flexDirection: 'row',
        backgroundColor: BASICO_COLOR_DARK,
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