let cards = {
    '8xf0y6ziyjabvozdd253nd': {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      text: 'Is Bitcoin a crypto currency?',
      answer: 1,
    },
    '8xf023fdfbef6ziyjabvozdd253nd': {
      id: '8xf023fdfbef6ziyjabvozdd253nd',
      timestamp: 1467166856498,
      text: 'Is Ethereum a crypto currency?',
      answer: 1,
    },
    sdg3fhdfsgiyjabvozdd253nd: {
      id: 'sdg3fhdfsgiyjabvozdd253nd',
      timestamp: 1467166887634,
      text: 'Is the Earth square shape?',
      answer: 0,
    },
    '123123sdg3fhdfsgiyjabvozdd253nd': {
      id: '123123sdg3fhdfsgiyjabvozdd253nd',
      timestamp: 1467966887634,
      text: 'Is the Earth oval shape?',
      answer: 0,
    },
  };
  
  let decks = {
    sar8xf0y6ziyjedfdfozdd253nd: {
      id: 'sar8xf0y6ziyjedfdfozdd253nd',
      title: 'sarahedo Default Deck 1',
      author: 'sarahedo',
      timestamp: 1467356887634,
      cardlist: ['8xf0y6ziyjabvozdd253nd'],
    },
    tylergfgfbdfgrbcvkhyozdd253nd: {
      id: 'tylergfgfbdfgrbcvkhyozdd253nd',
      title: 'tylermcginnis Default deck 1',
      author: 'tylermcginnis',
      timestamp: 1467398787634,
      cardlist: ['8xf023fdfbef6ziyjabvozdd253nd', 'sdg3fhdfsgiyjabvozdd253nd'],
    },
    t43241ylergfgfbdfgrbcvkhyozdd253nd: {
      id: 't43241ylergfgfbdfgrbcvkhyozdd253nd',
      title: 'tylermcginnis Default deck 2',
      author: 'tylermcginnis',
      timestamp: 1467498787634,
      cardlist: ['123123sdg3fhdfsgiyjabvozdd253nd'],
    },
  };
  
  let users = {
    sarahedo: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      avatarURL:
        'https://media.npr.org/assets/img/2017/06/01/istock-512038076_wide-e4e6966f49effbf246f3aa75ebcba5bacc6f7a83.jpg?s=1400',
      answers: {
        '8xf0y6ziyjabvozdd253nd': {
          ans: 'no',
          timestamp: 1467499787634,
        },
      },
      decks: ['sar8xf0y6ziyjedfdfozdd253nd'],
    },
    tylermcginnis: {
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      avatarURL:
        'https://cdn.britannica.com/96/94596-050-D327EF86/polar-bear-cubs.jpg',
      answers: {
        '8xf023fdfbef6ziyjabvozdd253nd': {
          ans: 0,
          timestamp: 1467499787634,
        },
        sdg3fhdfsgiyjabvozdd253nd: {
          ans: 1,
          timestamp: 1467499787634,
        },
        '123123sdg3fhdfsgiyjabvozdd253nd': {
          ans: 0,
          timestamp: 1467499787634,
        },
      },
      decks: [
        'tylergfgfbdfgrbcvkhyozdd253nd',
        't43241ylergfgfbdfgrbcvkhyozdd253nd',
      ],
    },
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
      cardlist: [],
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
        author: userId,
      });
  
      setTimeout(() => {
        decks = {
          ...decks,
          [formattedDeck.id]: formattedDeck,
        };
        users = {
          ...users,
          [authedUser]: {
            ...users[authedUser],
            decks: users[authedUser].decks.concat([formattedDeck.id]),
          },
        };
        res({ [formattedDeck.id]: formattedDeck });
      }, 1000);
    });
  }
  
