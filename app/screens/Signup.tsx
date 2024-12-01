// src/screens/SignupScreen.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { RootStackList } from '../navigation/RootNavigator';
import { getAuthErrorMessage } from '../service/firebaseErrors';

type TodoListProps = NativeStackScreenProps<RootStackList, 'Signup'>;

const Signup: React.FC<TodoListProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const auth = FIREBASE_AUTH;

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
      navigation.navigate('List');
    } catch (error: any) {
      console.error(error);
      setError(getAuthErrorMessage(error.code));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Signup</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(e) => setEmail(e.trim())}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={(e) => setPassword(e.trim())}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[
            styles.button,
            email.trim() === '' ? styles.disabledButton : styles.addButton,
          ]}
          onPress={handleSignup}
          disabled={email.trim() === ''}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
        <Text style={styles.developerText}>
          Developed by Mike, powered by React Native
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  disabledButton: {
    backgroundColor: '#d8d8d8',
  },
  addButton: {
    backgroundColor: '#1976d2',
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 12,
    alignItems: 'center',
  },
  linkText: {
    color: '#1976d2',
    fontSize: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  developerText: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    fontSize: 12,
    color: '#aaa',
  },
});

export default Signup;
