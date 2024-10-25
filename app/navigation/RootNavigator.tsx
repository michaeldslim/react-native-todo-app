import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from '../screens/TodoList';
import Detail from '../screens/TodoDetail';
import { Todo } from '../screens/types';

export type RootStackList = {
  List: undefined;
  Detail: { todoItem: Todo };
};

const Stack = createNativeStackNavigator<RootStackList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={List}
          options={{ title: 'Todo List' }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ title: 'Todo Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
