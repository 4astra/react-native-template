import React from 'react';
import SurveyPage from '../survey/survey.page';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

const case1 = {
  surveyReducer: {
    loading: false,
    result: [],
  },
  homeReducer: {
    selected: {
      "name": "Melun",
      "code": "XX1"
    }
  }
};

const case2 = {
  surveyReducer: {
    loading: false,
    result: [],
  },
  homeReducer: {
    selected: {
      "name": "Melun",
      "code": null
    }
  }
};

describe('SurveyPage', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <SurveyPage />,
      { context: { store: mockStore(case1) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('renders as expected when code is null', () => {
    const wrapper = shallow(
      <SurveyPage />,
      { context: { store: mockStore(case2) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});

