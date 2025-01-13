import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, FlatList, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar, DateData } from 'react-native-calendars';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';

interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    image: string;
}

const HomeEvents = () => {
    const route = useRoute();
    const { userEmail } = route.params as { userEmail: string };

    const [events, setEvents] = useState<Event[]>([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [newEvent, setNewEvent] = useState<Event>({
        id: '',
        title: '',
        date: '',
        location: '',
        image: '',
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        loadUserEvents();
    }, []);

    const loadUserEvents = async () => {
        const userEvents = await AsyncStorage.getItem(`events_${userEmail}`);
        if (userEvents) {
            setEvents(JSON.parse(userEvents));
        }
    };

    const saveUserEvents = async (updatedEvents: Event[]) => {
        setEvents(updatedEvents);
        await AsyncStorage.setItem(`events_${userEmail}`, JSON.stringify(updatedEvents));
    };

    const handleAddEvent = () => {
        if (!newEvent.title || !newEvent.date || !newEvent.location || !newEvent.image) {
            setErrorMessage('Todos os campos são obrigatórios!');
            return;
        }
        const updatedEvents = [...events, { ...newEvent, id: Math.random().toString() }];
        saveUserEvents(updatedEvents);
        setNewEvent({ id: '', title: '', date: '', location: '', image: '' });
        setIsAddModalVisible(false);
        setErrorMessage('');
    };

    const handleEditEvent = (id: string) => {
        const event = events.find(e => e.id === id);
        if (event) {
            setNewEvent(event);
            setIsEditModalVisible(true);
        }
    };

    const handleSaveEvent = () => {
        if (!newEvent.title || !newEvent.date || !newEvent.location || !newEvent.image) {
            setErrorMessage('Todos os campos são obrigatórios!');
            return;
        }
        const updatedEvents = events.map(event => (event.id === newEvent.id ? newEvent : event));
        saveUserEvents(updatedEvents);
        setNewEvent({ id: '', title: '', date: '', location: '', image: '' });
        setIsEditModalVisible(false);
        setErrorMessage('');
    };

    const handleDeleteEvent = (id: string) => {
        const updatedEvents = events.filter(event => event.id !== id);
        saveUserEvents(updatedEvents);
    };

    const handleDateChange = (date: string) => {
        setNewEvent({ ...newEvent, date });
        setIsCalendarVisible(false);
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permissão necessária', 'Você precisa permitir o acesso à galeria para selecionar uma imagem.');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setNewEvent({ ...newEvent, image: pickerResult.assets[0].uri });
        }
    };

    const renderEvent = ({ item }: { item: Event }) => (
        <View style={styles.eventCard}>
            <Image source={{ uri: item.image }} style={styles.eventImage} />
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventLabel}>Data: <Text style={styles.eventValue}>{item.date}</Text></Text>
            <Text style={styles.eventLabel}>Localização: <Text style={styles.eventValue}>{item.location}</Text></Text>
            <TouchableOpacity onPress={() => handleEditEvent(item.id)} style={styles.editButton}>
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteEvent(item.id)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerCard}>
                <Text style={styles.headerText}>
                    Mantenha seus eventos sempre organizados. Adicione-os ao sistema para planejar sua programação de forma eficiente e garantir que nenhum evento importante seja esquecido.
                </Text>
            </View>

            <Text style={styles.eventsTitle}>Eventos</Text>

            <FlatList
                data={events}
                renderItem={renderEvent}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.eventList}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => setIsAddModalVisible(true)}>
                <Text style={styles.buttonText}>Adicionar Evento</Text>
            </TouchableOpacity>

            {/*Adicionar Evento */}
            <Modal visible={isAddModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            <Text style={styles.modalTitle}>Adicionar Evento</Text>

                            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

                            <Text style={styles.label}>Nome do Evento</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite o nome do evento"
                                placeholderTextColor="#aaa"
                                value={newEvent.title}
                                onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
                            />

                            <Text style={styles.label}>Data</Text>
                            <TouchableOpacity onPress={() => setIsCalendarVisible(true)} style={styles.input}>
                                <Text>{newEvent.date || 'Escolha a data'}</Text>
                            </TouchableOpacity>

                            {isCalendarVisible && (
                                <Calendar
                                    onDayPress={(day) => handleDateChange(day.dateString)}
                                    markedDates={{
                                        [newEvent.date]: { selected: true, selectedColor: 'blue' },
                                    }}
                                    style={styles.calendar}
                                />
                            )}

                            <Text style={styles.label}>Localização</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite a localização do evento"
                                placeholderTextColor="#aaa"
                                value={newEvent.location}
                                onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
                            />

                            <Text style={styles.label}>Imagem</Text>
                            <TouchableOpacity onPress={pickImage} style={styles.input}>
                                <Text>{newEvent.image ? 'Imagem Selecionada' : 'Escolha uma Imagem'}</Text>
                            </TouchableOpacity>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.saveButton} onPress={handleAddEvent}>
                                    <Text style={styles.buttonText}>Salvar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.backButton}
                                    onPress={() => {
                                        setNewEvent({ id: '', title: '', date: '', location: '', image: '' });
                                        setIsAddModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.buttonText}>Voltar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/*Editar Evento */}
            <Modal visible={isEditModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            <Text style={styles.modalTitle}>Editar Evento</Text>

                            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

                            <Text style={styles.label}>Nome do Evento</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome do evento"
                                placeholderTextColor="#aaa"
                                value={newEvent.title}
                                editable={false} 
                            />

                            <Text style={styles.label}>Data</Text>
                            <TouchableOpacity onPress={() => setIsCalendarVisible(true)} style={styles.input}>
                                <Text>{newEvent.date || 'Escolha a data'}</Text>
                            </TouchableOpacity>

                            {isCalendarVisible && (
                                <Calendar
                                    onDayPress={(day) => handleDateChange(day.dateString)}
                                    markedDates={{
                                        [newEvent.date]: { selected: true, selectedColor: 'blue' },
                                    }}
                                    style={styles.calendar}
                                />
                            )}

                            <Text style={styles.label}>Localização</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Localização do evento"
                                placeholderTextColor="#aaa"
                                value={newEvent.location}
                                onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
                            />

                            <Text style={styles.label}>Imagem</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="URL da Imagem"
                                placeholderTextColor="#aaa"
                                value={newEvent.image}
                                editable={false}
                            />

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.saveButton} onPress={handleSaveEvent}>
                                    <Text style={styles.buttonText}>Salvar Edição</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.backButton}
                                    onPress={() => {
                                        setNewEvent({ id: '', title: '', date: '', location: '', image: '' });
                                        setIsEditModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.buttonText}>Voltar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#080808',
        padding: 16,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerCard: {
        padding: 16,
        borderRadius: 12,
        width: '100%',
        marginBottom: 20,
        marginTop: 50,
        borderWidth: 2,
        borderColor: '#fff',
    },
    headerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    eventsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center',
    },
    eventList: {
        width: '100%',
        marginBottom: 16,
    },
    eventCard: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    eventImage: {
        width: 180,
        height: 180,
        borderRadius: 8,
        marginBottom: 10,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    eventLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    eventValue: {
        fontSize: 14,
        color: '#777',
    },
    editButton: {
        backgroundColor: '#2067d1',
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
        width: 120,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#a8001c',
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
        width: 120,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#a8001c',
        padding: 14,
        borderRadius: 8,
        marginTop: 16,
        width: '80%',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 12,
        padding: 10,
        fontSize: 16,
        width: '100%',
    },
    calendar: {
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 50,
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 8,
        width: '35%',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: '#e53935',
        padding: 10,
        borderRadius: 8,
        width: '35%',
        alignItems: 'center',
    },
    errorMessage: {
        color: 'red',
        fontSize: 14,
        marginBottom: 12,
        textAlign: 'center',
    },
});

export default HomeEvents;
