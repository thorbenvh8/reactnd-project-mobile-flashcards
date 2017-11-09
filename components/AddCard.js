import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import * as API from '../utils/api'
import { white, gray, black } from '../utils/colors'
import { addCard } from '../actions'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: "Add Card to " + title
    }
  }

  state = {
    question: '',
    answer: '',
  }

  handleQuestionChange = (question) => {
    this.setState({
      question
    })
  }

  handleAnswerChange = (answer) => {
    this.setState({
      answer
    })
  }

  handleSubmit = () => {
    const { title, addCard, navigation } = this.props
    const { question, answer } = this.state
    const deck = {
      title,
      card: {
        question,
        answer
      }
    }

    API.addCardToDeck(deck)
      .then(() => {
        addCard(deck)

        navigation.dispatch(NavigationActions.back())
      })
  }

  render() {
    const { question, answer } = this.state
    return (
      <View style={[styles.center, styles.container]}>
        <TextInput
          value={question}
          style={styles.input}
          placeholder="Question"
          multiline={true}
          numberOfLines = {3}
          onChangeText={this.handleQuestionChange}
        />
        <TextInput
          value={answer}
          style={styles.input}
          placeholder="Answer"
          multiline={true}
          numberOfLines = {3}
          onChangeText={this.handleAnswerChange}
        />
        <TouchableOpacity style={styles.buttonSubmit} onPress={this.handleSubmit}>
          <Text style={styles.buttonTextSubmit}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 40,
    backgroundColor: white,
  },
  input: {
    height: 60,
    width: '80%',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    fontSize: 15,
  },
  buttonSubmit: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: black,
    marginTop: 10,
  },
  buttonTextSubmit: {
    fontSize: 20,
    color: white,
  },
})

function mapStateToProps (state, { navigation }) {
  return {
    title: navigation.state.params.title
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    addCard: (data) => dispatch(addCard(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCard)
