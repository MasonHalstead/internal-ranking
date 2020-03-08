import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { settingsReducer } from './settingsReducer';
import { avatarsReducer } from './avatarsReducer';
import { modalsReducer } from './modalsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  avatars: avatarsReducer,
  modals: modalsReducer,
});

export default rootReducer;
