import React from 'react';
import HomePage from '../home/home.page';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

const case1 = {
  homeReducer: {
    loading: false,
    list: [],
    isSearching: false,
    keyword: null,
    searchResult: []
  }
};

const case2 = {
  homeReducer: {
    loading: false,
    list: [
      {
        "name": "Melun",
        "code": "XX3"
      },
      {
        "code": "XX2",
        "name": "Chartres"
      }
    ],
    isSearching: false,
    keyword: null,
    searchResult: []
  }
};

const case3 = {
  homeReducer: {
    loading: false,
    list: [
      {
        "name": "Melun",
        "code": "XX3"
      },
      {
        "code": "XX2",
        "name": "Chartres"
      }
    ],
    isSearching: true,
    keyword: null,
    searchResult: []
  }
};

const case4 = {
  homeReducer: {
    loading: false,
    list: [
      {
        "name": "Melun",
        "code": "XX3"
      },
      {
        "code": "XX2",
        "name": "Chartres"
      }
    ],
    isSearching: true,
    keyword: null,
    searchResult: [
      {
        "name": "Melun",
        "code": "XX3"
      }
    ]
  }
};


describe('List Survey of HomePage', () => {
  it('renders not as expected when list is null', () => {
    const wrapper = shallow(
      <HomePage />,
      { context: { store: mockStore(case1) } },
    );
    !expect(wrapper.dive()).toMatchSnapshot();
  });

  it('renders as expected when list is filled', () => {
    const wrapper = shallow(
      <HomePage />,
      { context: { store: mockStore(case2) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });

});

describe('Search HomePage', () => {
  const mockStore1 = configureStore();
  it('Search renders not as expected when search is null', () => {
    const wrapper = shallow(
      <HomePage />,
      { context: { store: mockStore1(case3) } },
    );
    !expect(wrapper.dive()).toMatchSnapshot();
  });

  it('Search renders as expected when search is filled', () => {
    const wrapper = shallow(
      <HomePage />,
      { context: { store: mockStore1(case4) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });


});

