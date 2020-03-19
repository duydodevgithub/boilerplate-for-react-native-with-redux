import { AsyncStorage } from "react-native";

let cards = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1467166872634,
    text: "Is Bitcoin a crypto currency?",
    answer: 1
  },
  "8xf023fdfbef6ziyjabvozdd253nd": {
    id: "8xf023fdfbef6ziyjabvozdd253nd",
    timestamp: 1467166856498,
    text: "Is Ethereum a crypto currency?",
    answer: 1
  },
  sdg3fhdfsgiyjabvozdd253nd: {
    id: "sdg3fhdfsgiyjabvozdd253nd",
    timestamp: 1467166887634,
    text: "Is the Earth square shape?",
    answer: 0
  },
  "123123sdg3fhdfsgiyjabvozdd253nd": {
    id: "123123sdg3fhdfsgiyjabvozdd253nd",
    timestamp: 1467966887634,
    text: "Is the Earth oval shape?",
    answer: 0
  },
  asdsdg3fhdfdsfsgiyjabvozdd253nd: {
    id: "asdsdg3fhdfdsfsgiyjabvozdd253nd",
    timestamp: 1467966887634,
    text: "Is Corona Virus from China?",
    answer: 1
  },
  loihfurnsfsgiyjabvozdd253nd: {
    id: "loihfurnsfsgiyjabvozdd253nd",
    timestamp: 1467966887634,
    text: "Was the stock market down when Corona virus occured?",
    answer: 1
  }
};

let decks = {
  sar8xf0y6ziyjedfdfozdd253nd: {
    id: "sar8xf0y6ziyjedfdfozdd253nd",
    description: "This is default deck of flashcard app",
    title: "Default Deck 1",
    timestamp: 1467356887634,
    cardlist: [
      "8xf0y6ziyjabvozdd253nd",
      "8xf023fdfbef6ziyjabvozdd253nd",
      "sdg3fhdfsgiyjabvozdd253nd",
      "123123sdg3fhdfsgiyjabvozdd253nd"
    ]
  },
  aaasar8xf0123y6ziyjedfdfozdd253nd: {
    id: "aaasar8xf0123y6ziyjedfdfozdd253nd",
    description:
      "This is default deck 2 of flashcard app. Testing your knowledge about current economy",
    title: "Economy Deck",
    timestamp: 1467356887634,
    cardlist: ["asdsdg3fhdfdsfsgiyjabvozdd253nd", "loihfurnsfsgiyjabvozdd253nd"]
  }
};

export const _storeDecks = async () => {
  try {
    await AsyncStorage.setItem("DECKS", JSON.stringify(decks));
  } catch (error) {
    // Error saving data
  }
};

export const _storeCards = async () => {
  try {
    await AsyncStorage.setItem("CARDS", JSON.stringify(cards));
  } catch (error) {
    // Error saving data
  }
};

export const _storeHistory = async () => {
  try {
    await AsyncStorage.setItem("HISTORY", JSON.stringify({}));
  } catch (error) {
    // Error saving data
  }
};

function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

function formatDeck({ title, author }) {
  return {
    id: generateUID(),
    title,
    author,
    timestamp: Date.now(),
    cardlist: []
  };
}

export function _getCards() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...cards }), 1000);
  });
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getAllDecks() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...decks }), 1000);
  });
}

export function _getDecks(userId) {
  const data = users[userId];
  return new Promise((res, rej) => {
    setTimeout(() => res(data.decks), 1000);
  });
}

export function _saveDeck(deckDetail, userId) {
  return new Promise((res, rej) => {
    const authedUser = userId;
    const formattedDeck = formatDeck({
      title: deckDetail.deck,
      author: userId
    });

    setTimeout(() => {
      decks = {
        ...decks,
        [formattedDeck.id]: formattedDeck
      };
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          decks: users[authedUser].decks.concat([formattedDeck.id])
        }
      };
      res({ [formattedDeck.id]: formattedDeck });
    }, 1000);
  });
}
