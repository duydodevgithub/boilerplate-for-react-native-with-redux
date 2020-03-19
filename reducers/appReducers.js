const INI_STATE = {};

export const decks = (state = INI_STATE, action) => {
  switch (action.type) {
    case "RECEIVE_DECKS":
      return action.decks;
    default:
      return state;
  }
};

export const cards = (state = INI_STATE, action) => {
  switch (action.type) {
    case "RECEIVE_CARDS":
      return action.cards;
    default:
      return state;
  }
};

export const history = (state = INI_STATE, action) => {
  switch (action.type) {
    case "RECEIVE_HISTORY":
      return action.history;
    default:
      return state;
  }
};
