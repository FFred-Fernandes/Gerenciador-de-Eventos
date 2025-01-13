import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [gravarSenha, setGravarSenha] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  type RootStackParamList = {
    Login: undefined;
    Home: { userEmail: string };
    Cadastro: undefined; 
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    const storedEmail = await AsyncStorage.getItem('email');
    const storedSenha = await AsyncStorage.getItem('senha');

    if (storedEmail !== email || storedSenha !== senha) {
      Alert.alert('Erro', 'E-mail ou senha incorretos!');
      return;
    }

    if (gravarSenha) {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('senha', senha);
    }

    await AsyncStorage.setItem('currentUser', email);

    Alert.alert('Sucesso', 'Login realizado com sucesso!');
    navigation.navigate('Home', { userEmail: email }); 
  };

  const handleCadastrar = () => {
    navigation.navigate('Cadastro');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar no Gerenciador de Eventos</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Faça a organização de seus eventos</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Adicione, edite e exclua a qualquer momento</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Coloque imagens e a localização do evento</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
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

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setGravarSenha(!gravarSenha)} style={styles.checkbox}>
          <Image
            style={styles.icon}
            source={gravarSenha ? require('../../../assets/ligado.png') : require('../../../assets/desligado.png')}
          />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Salvar Senha</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonCadastrar} onPress={handleCadastrar}>
        <Text style={styles.buttonText}>Cadastrar-se</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#ffffff',
  },
  cardContainer: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  cardText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
    marginLeft: -200,
  },
  checkbox: {
    width: 2,
    height: 2,
    marginRight: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: '#ffffff',
    fontSize: 16,
  },
  button: {
    width: '50%',
    height: 50,
    backgroundColor: '#a8001c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonCadastrar: {
    width: '50%',
    height: 50,
    backgroundColor: '#278a2c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 8,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
});

export default Login;
