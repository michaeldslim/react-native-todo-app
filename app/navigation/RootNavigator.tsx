import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import List from '../screens/TodoList';
import Detail from '../screens/TodoDetail';
import { Todo } from '../screens/types';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Logout from '../screens/Logout';
import AdminPage from '../screens/AdminPage';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export type RootStackList = {
  List: undefined;
  Detail: { todoItem: Todo };
  Login: undefined;
  Signup: undefined;
  Logout: undefined;
  AdminPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackList>();

const AdminButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>Admin</Text>
  </TouchableOpacity>
);

const RootNavigator = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
          }}
          initialRouteName="Login"
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Todo Login' }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ title: 'Todo Signup' }}
          />
          <Stack.Screen
            name="List"
            component={List}
            options={({ navigation }) => ({
              title: 'Todo List',
              headerBackVisible: false,
              headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AdminButton onPress={() => navigation.navigate('AdminPage')} />
                  <View style={{ width: 5 }} />
                  <Logout />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{ title: 'Todo Detail' }}
          />
          <Stack.Screen
            name="AdminPage"
            component={AdminPage}
            options={{ title: 'Admin Page' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4caf50',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RootNavigator;
