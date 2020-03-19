import * as React from "react";
import { View, Text, Button } from "react-native";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { logger } from "./middlewares/appMiddlewares";
import { decks, cards, history } from "./reducers/appReducers";
import { handleLoadInitialData } from "./actions/shared";
import HomeScreen from "./components/HomeScreen";
import AddNewDeckScreen from "./components/AddNewDeckScreen";
import DeckDetailScreen from "./components/DeckDetailScreen";
import QuizScreen from "./components/QuizScreen";
import AddNewCardScreen from "./components/AddNewCardScreen";

const store = createStore(
  combineReducers({
    decks,
    cards,
    history
  }),
  applyMiddleware(thunk, logger)
);

const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    store.dispatch(handleLoadInitialData());
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "My home",
                headerShown: false
              }}
            />

            <Stack.Screen
              name="AddNewDeck"
              component={AddNewDeckScreen}
              options={{
                title: "Add New Deck",
                headerShown: false
              }}
            />

            <Stack.Screen
              name="DeckDetail"
              component={DeckDetailScreen}
              options={{
                title: "Deck Detail Screen",
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={{
                title: "Quiz Screen",
                headerShown: false
              }}
            />

            <Stack.Screen
              name="AddNewCard"
              component={AddNewCardScreen}
              options={{
                title: "Add New Card Screen Screen"
                // headerShown: false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
