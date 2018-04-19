import { combineReducers } from 'redux';
import homeReducer from '../modules/home/home.state';
import surveyReducer from '../modules/survey/survey.state';

import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../modules/navigators/app-navigator';


const initialNavState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Main')
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const AppReducer = combineReducers({
  nav,
  homeReducer,
  surveyReducer
});

export default AppReducer;
