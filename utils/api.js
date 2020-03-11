import {
    _getUsers,
  } from './_DATA';
  
  export function getInitialData() {
    return Promise.all([_getUsers()]).then(([users]) => {
      return {
        users,
      };
    });
  }