import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignupScreen from "./screens/Auth/SignupScreen";
import WelcomeScreen from "./screens/Auth/WelcomeScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import IconButton from "./components/ui/IconButton";
import ReminderScreen from "./screens/ReminderScreen";
import ReminderContextProvider from "./store/reminder-context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ReminderMetadataContextProvider, {
  ReminderMetadataContext,
} from "./store/metadata-context";
import AddCategory from "./screens/AddCategory";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  const authCtx = useContext(AuthContext);
  const { getRemindersListMetadata } = useContext(ReminderMetadataContext);
  const metadata = getRemindersListMetadata();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={authCtx.logout}
          />
        ),
      }}
    >
      <Drawer.Screen name="Welcome" component={WelcomeScreen} />
      {metadata?.map((item) => (
        <Drawer.Screen
          key={item.id}
          name={item.title}
          component={ReminderScreen}
          initialParams={{ reminderList: item.reminderList }}
        />
      ))}
      <Drawer.Screen
        key="AddCategory"
        name="AddCategory"
        component={AddCategory}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="add-circle-outline" // nombre del ícono que desees usar
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="ReminderList"
        component={ReminderScreen}
        options={{
          title: "Recordatorios",
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <DrawerNavigator />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUserId = await AsyncStorage.getItem("userid");

      if (storedToken) {
        authCtx.authenticate(storedToken, storedUserId);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return null;
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ReminderMetadataContextProvider>
        <ReminderContextProvider>
          <AuthContextProvider>
            <Root />
          </AuthContextProvider>
        </ReminderContextProvider>
      </ReminderMetadataContextProvider>
    </>
  );
}
