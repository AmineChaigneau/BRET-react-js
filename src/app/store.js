import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from '../features/settings/settingsReducer'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { resetSettings } from '../features/settings/settingsReducer'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
};

const reducers = combineReducers({
    settings: settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const resetStore = () => (dispatch) => {
    dispatch(resetSettings());
};

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(thunk),
});

export default store;