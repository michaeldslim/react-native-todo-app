import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import List from '../screens/TodoList';
import Detail from '../screens/TodoDetail';
import { Todo } from '../screens/types';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Logout from '../screens/Logout';

export type RootStackList = {
  List: undefined;
  Detail: { todoItem: Todo };
  Login: undefined;
  Signup: undefined;
  Logout: undefined;
};

const Stack = createNativeStackNavigator<RootStackList>();

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
            options={{
              title: 'Todo List',
              headerBackVisible: false,
              headerRight: () => <Logout />,
            }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{ title: 'Todo Detail' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default RootNavigator;
