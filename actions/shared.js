
import {getInitialData} from "../utils/api";


export function getUsers(users) {
    return {
      type: "RECEIVE_USERS",
      users: users
    }
  }

export function handleLoadInitialData() {
    return (dispatch) => {
      return getInitialData()
      .then(({users}) => {
        dispatch(getUsers(users))
      }).then(()=>{
      })
    }
  }