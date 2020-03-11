const INI_STATE = {};

export const iniData = (state = INI_STATE, action) => {
  switch (action.type) {
    case 'RECEIVE_USERS':
      return { users: action.users };
    default:
      return state;
  }
};