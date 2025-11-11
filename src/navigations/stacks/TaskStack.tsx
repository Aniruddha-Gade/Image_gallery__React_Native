import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskScreen from '../../screens/task-list/TaskScreen';
import { PATH } from '../../constant/constant';

const Stack = createNativeStackNavigator();

export default function TaskStack() {
  const options = {
    headerShown: false,
  };

  return (
    <Stack.Navigator initialRouteName={PATH.TASK_LIST}>
      <Stack.Screen
        name={PATH.TASK_LIST}
        component={TaskScreen}
        options={options}
      />
    </Stack.Navigator>
  );
}
