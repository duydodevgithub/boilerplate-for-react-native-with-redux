import { AsyncStorage } from "react-native";
import uuid from "react-uuid";

export const _retrieveDecks = async () => {
  // console.log("Retrive data from asyncstorage");
  try {
    const value = await AsyncStorage.getItem("DECKS");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
    return { err: "error" };
  }
};

export const _retrieveCards = async () => {
  // console.log("Retrive data from asyncstorage");
  try {
    const value = await AsyncStorage.getItem("CARDS");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
    return { err: "error" };
  }
};

export const _clearAsyncStorage = async () => {
  // console.log("Retrive data from asyncstorage");
  try {
    const value = await AsyncStorage.setItem("DECKS", JSON.stringify({}));
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
    return { err: "error" };
  }
};

export const _addDeckAsyncStorage = async () => {
  // console.log("Retrive data from asyncstorage");
  try {
    const value = await AsyncStorage.setItem("DECKS", JSON.stringify({}));
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
    return { err: "error" };
  }
};

export function formatDeck({ title, description }) {
  return {
    id: uuid(),
    title,
    description,
    timestamp: Date.now(),
    cardlist: []
  };
}

export function formatCard({ question, answer }) {
  return {
    id: uuid(),
    text: question,
    answer,
    timestamp: Date.now()
  };
}
