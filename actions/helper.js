import { AsyncStorage } from "react-native";
import uuid from "react-uuid";
import { Permissions } from "expo-permissions";
import { Notifications } from "expo";
import Constants from "expo-constants";

export const _retrieveHistory = async () => {
  // console.log("Retrive data from asyncstorage");
  try {
    const value = await AsyncStorage.getItem("HISTORY");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
    return { err: "error" };
  }
};

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

export function formatHistory(deckId, correct, total) {
  return {
    [Date.now()]: {
      deckId,
      correct,
      total
    }
  };
}

export function saveResult({ correct, total, deckId }) {
  return {
    [deckId]: {
      correct,
      total,
      timestamp: Date.now()
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem("NOTIFICATION")
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        const { status } = async () => {
          await Permissions.askAsync(Permissions.NOTIFICATIONS);
        };
        if (Constants.isDevice && status === "granted") {
          // console.log("Notification permissions granted.");
          Notifications.cancelAllScheduledNotificationsAsync();
          const localNotification = {
            title: "Test notification",
            body: "Test notification body"
          };

          const schedulingOptions = {
            time: new Date().getTime() + 1000,
            repeat: "hour"
          };

          Notifications.scheduleLocalNotificationAsync(
            localNotification,
            schedulingOptions
          );

          AsyncStorage.setItem("NOTIFICATION", JSON.stringify(true));
        }
      }
    });
}

const askNotification = async () => {
  // We need to ask for Notification permissions for ios devices
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Constants.isDevice && status === "granted")
    console.log("Notification permissions granted.");
};
