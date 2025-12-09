import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const primaryColor = '#550D08';
const cardBackgroundColor = '#FFFFFF';
const inputBorderColor = '#CCCCCC';
const screenHeight = Dimensions.get('window').height;
const ViewOccurrenceModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Visualizar ocorrência</Text>
        
        <View style={styles.inputRow}>
            <View style={styles.inputGroupLogradouro}>
                {/* Visualizar: INPUTS EM ESTILO READ-ONLY */}
                <TextInput style={styles.modalInputVisualizar} placeholder="Logradouro" value="Rua das Flores, 123" editable={false} />
            </View>
            <View style={styles.inputGroupNumero}>
                <TextInput style={styles.modalInputVisualizar} placeholder="Nº" value="45" editable={false} />
            </View>
        </View>
        
        <View style={styles.inputRow}>
            <View style={styles.inputGroupHalf}>
                <TextInput style={styles.modalInputVisualizar} placeholder="Bairro" value="Centro" editable={false} />
            </View>
            <View style={styles.inputGroupHalf}>
                <TextInput style={styles.modalInputVisualizar} placeholder="Município/UF" value="Recife/PE" editable={false} />
            </View>
        </View>
        
        <View style={styles.modalButtonRow}>
            {/* O modal de visualização só precisa de um botão "Cancelar" (ou "Fechar") */}
            <TouchableOpacity style={styles.modalSaveButton} onPress={onClose}>
                <Text style={styles.modalSaveButtonText}>Fechar</Text>
            </TouchableOpacity>
        </View>
    </View>
);

// 2. MODAL DE EDIÇÃO (EDITÁVEL, COM BOTÃO SALVAR)
const EditOccurrenceModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Editar ocorrência</Text>
        
        <View style={styles.inputRow}>
            <View style={styles.inputGroupLogradouro}>
                <TextInput style={styles.modalInput} placeholder="Logradouro" />
            </View>
            <View style={styles.inputGroupNumero}>
                <TextInput style={styles.modalInput} placeholder="Nº" keyboardType="numeric" />
            </View>
        </View>
        
        <View style={styles.inputRow}>
            <View style={styles.inputGroupHalf}>
                <TextInput style={styles.modalInput} placeholder="Bairro" />
            </View>
            <View style={styles.inputGroupHalf}>
                <TextInput style={styles.modalInput} placeholder="Município/UF" />
            </View>
        </View>
        
        <View style={styles.modalButtonRow}>
            <TouchableOpacity style={styles.modalCancelButton} onPress={onClose}>
                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalSaveButton} onPress={() => { console.log('Salvar Edição'); onClose(); }}>
                <Text style={styles.modalSaveButtonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    </View>
);


// 3. MODAL DE DELETAR (SEM ALTERAÇÃO)
const DeleteOccurrenceModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Deletar ocorrência</Text>
        <Text style={styles.deleteText}>Tem certeza que deseja excluir esta ocorrência?</Text>

        <View style={styles.modalButtonRow}>
            <TouchableOpacity style={styles.modalCancelButton} onPress={onClose}>
                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.modalDeleteButton} 
                onPress={() => { console.log('Excluir'); onClose(); }}
            >
                <Text style={styles.modalSaveButtonText}>Excluir</Text>
            </TouchableOpacity>
        </View>
    </View>
);

// --- Componente de Card ---

const OcorrenciaCard: React.FC<{ 
    tipo: string; 
    data: string; 
    viatura: string; 
    equipe: string; 
    onView: () => void; // Mapeia para Visualizar
    onEdit: () => void; // NOVO: Mapeia para Editar
    onDelete: () => void; 
}> = ({ tipo, data, viatura, equipe, onView, onEdit, onDelete }) => (
    <View style={styles.cardContainer}>
        <View style={styles.detailsContainer}>
            <Text style={styles.cardTipo}>{tipo}</Text>
            <Text style={styles.cardDetail}>Data/Hora: {data}</Text>
            <Text style={styles.cardDetail}>Viatura: {viatura}</Text>
            <Text style={styles.cardDetail}>Equipe: {equipe}</Text>
        </View>
        
        <View style={styles.buttonsContainer}>
            {/* BOTÃO 1: EDITAR (Lápis) - Chama onEdit */}
            <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={onEdit}>
                <Ionicons name="create-outline" size={20} color={primaryColor} />
            </TouchableOpacity>
            
            {/* BOTÃO 2: VISUALIZAR (Olho) - Chama onView */}
            <TouchableOpacity style={[styles.actionButton, styles.viewButton]} onPress={onView}>
                <Ionicons name="eye-outline" size={20} color={primaryColor} />
            </TouchableOpacity>
            
            {/* BOTÃO 3: DELETAR (X) */}
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={onDelete}>
                <Ionicons name="close-outline" size={20} color={primaryColor} />
            </TouchableOpacity>
        </View>
    </View>
);

// --- Tela Principal ---

export default function OcorrenciasScreen() {
    const [selectedOrder, setSelectedOrder] = useState('Recente');
    const [isModalVisible, setIsModalVisible] = useState(false);
    // Tipos de modal: view, edit, delete
    const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);

    const showModal = (type: 'view' | 'edit' | 'delete') => {
        setModalType(type);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setModalType(null);
    };

    const ocorrencias = [
        { id: 1, tipo: 'Acidente', data: '14/11/2025', viatura: 'VTR-1234', equipe: 'Beta' },
        { id: 2, tipo: 'Acidente', data: '14/11/2025', viatura: 'VTR-1234', equipe: 'Beta' },
        { id: 3, tipo: 'Acidente', data: '14/11/2025', viatura: 'VTR-1234', equipe: 'Beta' },
        { id: 4, tipo: 'Acidente', data: '14/11/2025', viatura: 'VTR-1234', equipe: 'Beta' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.pageHeader}>
                <Text style={styles.pageTitle}>Lista-Ocorrências</Text>
            </View>
            
            <View style={styles.filterContainer}>
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={20} color={primaryColor} style={{ marginRight: 5 }} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquisar"
                        placeholderTextColor="#999"
                    />
                </View>
                
                <View style={styles.orderPickerContainer}>
                    <Text style={styles.orderLabel}>Ordenar por:</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={selectedOrder}
                            onValueChange={(itemValue) => setSelectedOrder(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Recente" value="Recente" />
                            <Picker.Item label="Antigo" value="Antigo" />
                            <Picker.Item label="Status" value="Status" />
                        </Picker>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {ocorrencias.map(ocorrencia => (
                    <OcorrenciaCard 
                        key={ocorrencia.id}
                        tipo={ocorrencia.tipo}
                        data={ocorrencia.data}
                        viatura={ocorrencia.viatura}
                        equipe={ocorrencia.equipe}
                        onView={() => showModal('view')} // OLHO -> VISUALIZAR
                        onEdit={() => showModal('edit')} // LÁPIS -> EDITAR
                        onDelete={() => showModal('delete')}
                    />
                ))}

                <View style={{ height: 100 }} />
            </ScrollView>

            {isModalVisible && (
                <View style={styles.modalOverlay}>
                    {modalType === 'view' && <ViewOccurrenceModal onClose={closeModal} />}
                    {modalType === 'edit' && <EditOccurrenceModal onClose={closeModal} />}
                    {modalType === 'delete' && <DeleteOccurrenceModal onClose={closeModal} />}
                </View>
            )}
        </SafeAreaView>
    );
}

// --- Estilos ---

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    pageHeader: {
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: cardBackgroundColor,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: inputBorderColor,
    },
    searchInput: {
        flex: 1,
        padding: 0,
        fontSize: 16,
    },
    orderPickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderLabel: {
        fontSize: 14,
        color: '#666',
        marginRight: 5,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: inputBorderColor,
        borderRadius: 8,
        overflow: 'hidden',
        height: 35,
        justifyContent: 'center',
    },
    picker: {
        width: 120,
        height: 35,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: cardBackgroundColor,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        marginHorizontal: 15,
        borderWidth: 1,
        borderColor: primaryColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    cardTipo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    cardDetail: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    actionButton: {
        width: 35,
        height: 35,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    deleteButton: {
        marginBottom: 0, 
    },
    
    // --- Estilos do Modal/Overlay ---
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        height: screenHeight,
    },
    modalContent: {
        width: '90%',
        backgroundColor: cardBackgroundColor,
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: primaryColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: primaryColor,
        marginBottom: 30,
        textAlign: 'center',
    },
    // Logradouro e Nº
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    inputGroupLogradouro: {
        width: '70%',
    },
    inputGroupNumero: {
        width: '25%',
    },
    // Bairro e Município (metade)
    inputGroupHalf: {
        width: '48%',
    },
    // Estilo para INPUTS EDITÁVEIS
    modalInput: {
        height: 40,
        borderWidth: 1,
        borderColor: primaryColor, // Borda forte para edição
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#333',
        backgroundColor: '#FFF',
    },
    // NOVO ESTILO: INPUTS APENAS PARA VISUALIZAÇÃO
    modalInputVisualizar: {
        height: 40,
        borderWidth: 1,
        borderColor: '#E0E0E0', // Borda clara para visualização
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#666', // Cor de texto mais clara
        backgroundColor: '#F7F7F7', // Fundo levemente cinza
    },
    deleteText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    modalCancelButton: {
        flex: 1,
        backgroundColor: cardBackgroundColor,
        borderWidth: 1,
        borderColor: primaryColor,
        borderRadius: 8,
        paddingVertical: 12,
        marginRight: 10,
        alignItems: 'center',
    },
    modalCancelButtonText: {
        color: primaryColor,
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalSaveButton: {
        flex: 1,
        backgroundColor: primaryColor,
        borderRadius: 8,
        paddingVertical: 12,
        marginLeft: 10,
        alignItems: 'center',
    },
    modalDeleteButton: {
        flex: 1,
        backgroundColor: primaryColor,
        borderRadius: 8,
        paddingVertical: 12,
        marginLeft: 10,
        alignItems: 'center',
    },
    modalSaveButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});