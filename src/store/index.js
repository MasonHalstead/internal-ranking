import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'ducks/reducers/index';
import thunk from 'redux-thunk';
import { loadUser, saveUser } from 'utils/auth';
import { selectUser } from 'ducks/selectors';
import { composeWithDevTools } from 'redux-devtools-extension';

let user = loadUser();
const persistedState = {
  user,
};

export const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
  const updatedUser = selectUser(store.getState());
  if (updatedUser !== user) {
    user = updatedUser;
    saveUser(user);
  }
});
