import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as surveyReducer from '../survey/survey.state';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import * as dateTime from '../../utils/date-time';

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

const circle = {
  borderWidth: 0,
  borderRadius: 40,
  width: 80,
  height: 80
};

const rectangle = {
  borderWidth: StyleSheet.hairlineWidth,
  width: width - 10,
  height: 35,
  borderRadius: 7,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  circleButton: {
    ...circle,
    backgroundColor: '#170A1C'
  },
  headerFlow: {
    marginLeft: 15,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row'
  },
  headerIndex: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  headerTitle: {
    marginTop: 7
  },
  numberFlow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  numberText: {
    marginTop: 30,
    marginLeft: 20,
    color: 'white',
    fontSize: 15
  },
  lines: {
    height: 0.5,
    width: width,
    backgroundColor: '#EFEFC4'
  },
  qcm: {
    backgroundColor: '#FFEAC0',
    borderColor: '#FFEAC0',
    borderRadius: 5,
    margin: 10,
    borderWidth: 0.5,
    width: (width / 2.0 - 2.0 * 10),
    height: 35
  },
  qcmValue: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#F87979',
    fontSize: 20
  },
  qcmName: {
    fontWeight: 'bold',
    marginLeft: 10
  },
  dateFlow: {
    marginLeft: 15,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row'
  }
});

class SurveyPage extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerLeft: <TouchableOpacity onPress={
      () => navigation.goBack(null)
    }>
      <Text style={{ marginLeft: 12, fontSize: 13 }}>Close</Text>
    </TouchableOpacity>,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'white',
    },
  });

  static propTypes = {
    result: PropTypes.any.isRequired,
    info: PropTypes.any.isRequired,

    actions: PropTypes.shape({
      survey: PropTypes.func.isRequired,
    })
  };

  componentWillMount() {
    // request getting survey by code
    if (this.props.info !== undefined) {
      this.props.actions.survey(this.props.info.code);
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={{ marginTop: 15 }}
          data={this.props.result}
          renderItem={({ item, index, separators }) => (
            <View>
              <View style={styles.headerFlow}>
                <Text style={styles.headerIndex}>{index + 1}. </Text>
                <Text style={styles.headerTitle}>{item.label}</Text>
              </View>
              <View style={styles.lines}></View>

              {
                this.renderAnswer(item)
              }
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  renderAnswer(item) {
    console.log(item.type);

    switch (item.type) {
      case 'numeric':
        return this.renderNumberView(item);

      case 'date':
        return this.renderDateView(item);

      default:
        return this.renderQCMView(item);
    }

  }

  renderQCMView(item) {

    // convert object to array to easily use 

    var data = [];
    const results = item.result;

    for (let type in results) {
      var item = {};
      item.name = type;
      item.value = results[type];
      data.push(item)
    }

    return (
      <View>
        <FlatList
          style={{ marginLeft: 0, marginBottom: 15, marginRight: 0 }}
          horizontal={false}
          numColumns={2}
          data={data}
          renderItem={({ item, index, separators }) => (
            <View style={styles.qcm}>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={styles.qcmName}>{item.name}</Text>
                <Text style={styles.qcmValue}> {item.value}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  renderNumberView(item) {
    return (
      <View style={styles.numberFlow}>
        <View style={styles.circleButton}>
          <Text style={styles.numberText}>
            {parseFloat(item.result).toFixed(1)}
          </Text>
        </View>
      </View>
    );
  }

  renderDateView(item) {

    return (
      <View>
        <FlatList
          data={dateTime.sortDate(item.result)}
          renderItem={({ item, index, separators }) => (
            <View>
              <View style={styles.dateFlow}>
                <Text>{item.format('DD MMM YYYY')}</Text>
              </View>
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
    result: state.surveyReducer.result,
    info: state.homeReducer.selected,
  }),
  dispatch => ({
    actions: bindActionCreators(surveyReducer, dispatch)
  })
)(SurveyPage);
