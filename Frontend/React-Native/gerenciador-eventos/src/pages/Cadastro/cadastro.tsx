import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

const CadastroAdmin = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    
    type RootStackParamList = {
        Login: undefined;
    };
    
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleCadastro = async () => {
        if (!nome || !email || !senha || !confirmarSenha) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios!');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        await AsyncStorage.setItem('nome', nome);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('senha', senha);

        Alert.alert('Sucesso', 'Administrador cadastrado com sucesso!');
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');

        navigation.navigate('Login');
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
                <Image style={styles.backImage} source={require('../../../assets/voltar.png')} />
            </TouchableOpacity>

            <Text style={styles.title}>Cadastro de Administrador</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    value={nome}
                    onChangeText={setNome}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Image
                        style={styles.icon}
                        source={isPasswordVisible ? require('../../../assets/ocultar.png') : require('../../../assets/mostrar.png')}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirme sua senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    secureTextEntry={!isConfirmPasswordVisible}
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                    <Image
                        style={styles.icon}
                        source={isConfirmPasswordVisible ? require('../../../assets/ocultar.png') : require('../../../assets/mostrar.png')}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#080808',
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        marginTop: 50,
      },
      backImage: {
        width: 30,
        height: 30,
      },
    backButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 24,
        color: '#ffffff',
        fontFamily: 'Open Sans',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 8,
        fontFamily: 'Open Sans',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        fontFamily: 'Open Sans',
    },
    icon: {
        width: 24,
        height: 24,
        marginTop: 8,
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    button: {
        width: '50%',
        height: 50,
        backgroundColor: '#a8001c',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
    },
});

export default CadastroAdmin;
