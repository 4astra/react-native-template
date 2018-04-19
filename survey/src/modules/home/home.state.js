import { combineReducers } from 'redux';
import * as homeAPI from '../../services/home.service'

const REQ_LIST = 'HomeState/GET';
const REQ_SEARCH_KEYWORD = 'HomeState/REQ_SEARCH_KEYWORD'
const CURRENT_SELECTION = 'HomeState/CURRENT_SELECTION'

/**
 * @author Hoat Ha
 * @description HomeStateReducer class
 */

const initialState = {
  loading: false,
  list: [],
  isSearching: false,
  keyword: null,
  searchResult: [],
  selected: null
};

export function updateSelected(item) {
  return {
    type: CURRENT_SELECTION,
    payload: item
  }
}

// do filter
export function search(keyword) {
  return {
    type: REQ_SEARCH_KEYWORD,
    payload: keyword
  }
}

export function list() {
  return { type: REQ_LIST, payload: homeAPI.listSurvey() };
}

export default function homeReducer(state = initialState, action = {}) {
  switch (action.type) {

    case REQ_LIST:
      return { ...state, list: action.payload };

    case REQ_SEARCH_KEYWORD:
      var key = action.payload;
      return {
        ...state,
        isSearching: true,
        keyword: key,
        searchResult: doSearch(key, state)
      };
    
    case CURRENT_SELECTION:
      return {
        ...state,
        selected: action.payload
      }  
    default:
      return state;
  }
}

function doSearch(keyword, state) {
  var results = state.list;

  if (results == null || results == undefined || results.length <= 0) {
    return [];
  }

  if (keyword === undefined || keyword === null) {

    return results
  } else {

    let key = keyword.toLowerCase().trim();

    results = results.filter((item) => {
      let name = item.name.toLowerCase();
      let code = item.code.toLowerCase();
      return name.includes(key) || code.includes(key)
    });
    //console.log("My: ", results);
    return results;
  }

}

