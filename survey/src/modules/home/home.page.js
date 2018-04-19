import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeReducer from '../home/home.state';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';

import {
  Button,
  StyleSheet,
  Text, View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

const rectangle = {
  borderWidth: StyleSheet.hairlineWidth,
  width: width - 10,
  height: 35,
  borderRadius: 7
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }, search: {
    ...rectangle,
    flexDirection: 'row',
    borderColor: '#C7C7CD',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textInput: {
    width: width - 10,
    marginLeft: 15,
    marginRight: 5,
    fontSize: 13
  },
});

class HomePage extends React.Component {
  static navigationOptions = {
    title: 'List Survey',
    headerLeft: null
  }

  static propTypes = {
    list: PropTypes.any.isRequired,
    isSearching: PropTypes.bool.isRequired,
    searchResult: PropTypes.any.isRequired,

    actions: PropTypes.shape({
      list: PropTypes.func.isRequired,
      search: PropTypes.func.isRequired,
      updateSelected: PropTypes.func.isRequired
    })
  };

  componentDidMount() {
    this.props.actions.list()
  }

  startSearch(text) {
    this.props.actions.search(text)
  }

  doSurvey(item) {
    this.props.actions.updateSelected(item);
    this.props.navigation.navigate('Survey', { title: item.code });
  }

  render() {
    var data = !this.props.isSearching ? this.props.list : this.props.searchResult;

    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput style={styles.textInput}
            autoCorrect={false}
            autoFocus={false}
            placeholder="Type name or code"
            onChangeText={
              _.debounce((text) => this.startSearch(text))
            }
            onSubmitEditing={(event) => {
              console.log('A')
            }}
          />
        </View>
        <FlatList
          data={data}
          renderItem={({ item, separators }) => (
            <View>
              <TouchableOpacity onPress={() =>
                this.doSurvey(item)
              }
                style={{ marginLeft: 15, marginRight: 5, marginTop: 5, marginBottom: 5 }}>
                <Text>Name: {item.name}</Text>
                <Text style={{ marginTop: 5, marginBottom: 5 }}>Code: {item.code}</Text>
              </TouchableOpacity>
              <View style={{ height: 0.5, width: width, backgroundColor: '#EFEFC4' }}></View>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    list: state.homeReducer.list,
    isSearching: state.homeReducer.isSearching,
    searchResult: state.homeReducer.searchResult
  }),
  dispatch => ({
    actions: bindActionCreators(homeReducer, dispatch)
  })
)(HomePage);
