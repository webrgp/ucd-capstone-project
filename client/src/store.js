import React, { useReducer } from 'react'

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {

    case 'GET_IMAGES':
      return state

    case 'FETCH_IMAGES':
      return action.value

    case 'ADD_IMAGE':
      return [ action.value, ...state]

    case 'DELETE_IMAGE':
      const deleted = action.value
      const filtered = state.filter( image => image !== deleted)
      return filtered

    case 'UPDATE_IMAGE':
      const updated = state.map( image => {
        if (image.imageId === action.value.imageId) {
          return action.value
        }

        return image
      })
      return updated

    default:
      return state;
  }
}

export const Store = React.createContext({});
export const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };
  return (
    <Store.Provider value={value}>{children}</Store.Provider>
  );
}