import { combineReducers } from 'redux';
import * as surveyAPI from '../../services/survey.service';

const REQ_LIST = 'SurveyState/GET';

/**
 * @author Hoat Ha
 * @description SurveyStateReducer class
 */

const initialState = {
  loading: false,
  result: [],
};

export function survey(id) {
  console.log(surveyAPI.survey(id));
  return { type: REQ_LIST, playload: surveyAPI.survey(id) };
}

export default function surveyReducer(state = initialState, action = {}) {
  switch (action.type) {

    case REQ_LIST:
      return { ...state, result: action.playload };

    default:
      return state;
  }
}

