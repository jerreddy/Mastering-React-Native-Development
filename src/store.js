import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { reducer as LoginReducer } from './components/Login'
import { reducer as AppReducer } from './components/App'
import { CardFeedReducer } from './components/Welcome/CardFeed'

const rootReducer = combineReducers({
  Login: LoginReducer,
  App: AppReducer,
  CardFeed: CardFeedReducer,
})

// This just allows for multiple middlewares to be integrated with redux
const middleware = []
middleware.push(thunk)

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['App'],
  blacklist: ['CardFeed'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(...middleware))
const persistor = persistStore(store)

export default { store, persistor }
