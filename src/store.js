import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { fetchReducer } from './reducers/apiReducer';


const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, fetchReducer)

// const reducers = combineReducers({ users: fetchReducer });

const store = createStore(persistedReducer, applyMiddleware(logger, thunk));

const persistor = persistStore(store)
 

export { store, persistor};