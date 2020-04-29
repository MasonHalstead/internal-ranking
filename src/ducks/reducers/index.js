import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { settingsReducer } from './settingsReducer';
import { avatarsReducer } from './avatarsReducer';
import { organizationReducer } from './organizationReducer';
import { modalsReducer } from './modalsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  organization: organizationReducer,
  avatars: avatarsReducer,
  modals: modalsReducer,
});

export default rootReducer;
