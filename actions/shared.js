import {
  _retrieveDecks,
  _clearAsyncStorage,
  formatDeck,
  _retrieveCards,
  formatCard,
  _retrieveHistory,
  formatHistory
} from "./helper";
import { _storeDecks, _storeCards, _storeHistory } from "../utils/_DATA";
import { AsyncStorage } from "react-native";

export function getDecks(decks) {
  return {
    type: "RECEIVE_DECKS",
    decks
  };
}

export function getCards(cards) {
  return {
    type: "RECEIVE_CARDS",
    cards
  };
}

export function getHistory(history) {
  return {
    type: "RECEIVE_HISTORY",
    history
  };
}

export function handleLoadInitialData() {
  _storeDecks();
  _storeCards();
  _storeHistory();
  // _clearAsyncStorage();
  return dispatch => {
    return Promise.all([
      _retrieveDecks(),
      _retrieveCards(),
      _retrieveHistory()
    ]).then(([decks, cards, history]) => {
      // console.log(res);
      dispatch(getDecks(decks));
      dispatch(getCards(cards));
      dispatch(getHistory(history));
    });
  };
}

export function handleAddNewDeck(title, description) {
  const formattedDeck = formatDeck({ title, description });
  console.log(formattedDeck);
  return dispatch => {
    return AsyncStorage.mergeItem(
      "DECKS",
      JSON.stringify({ [formattedDeck.id]: formattedDeck }),
      () => {
        AsyncStorage.getItem("DECKS", (err, result) => {
          dispatch(getDecks(JSON.parse(result)));
        });
      }
    );
  };
}

export function handleAddNewCard(question, answer, deckObj) {
  const formattedCard = formatCard({ question, answer });
  deckObj.cardlist.push(formattedCard.id);
  // console.log(formattedCard);
  return dispatch => {
    return AsyncStorage.mergeItem(
      "CARDS",
      JSON.stringify({ [formattedCard.id]: formattedCard }),
      () => {
        AsyncStorage.getItem(
          "CARDS",
          (err, result) => {
            dispatch(getCards(JSON.parse(result)));
          },
          AsyncStorage.mergeItem(
            "DECKS",
            JSON.stringify({ [deckObj.id]: deckObj })
          ),
          AsyncStorage.getItem("DECKS", (err, result) => {
            dispatch(getDecks(JSON.parse(result)));
          })
        );
      }
    );
  };
}

export function handleHistory(deckId, correct, total) {
  const formattedHistory = formatHistory(deckId, correct, total);
  // console.log(formattedHistory);
  return dispatch => {
    return AsyncStorage.mergeItem(
      "HISTORY",
      JSON.stringify(formattedHistory),
      () => {
        AsyncStorage.getItem("HISTORY", (err, result) => {
          dispatch(getHistory(JSON.parse(result)));
        });
      }
    );
  };
}
