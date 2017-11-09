import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { white, gray, black, green, red } from '../utils/colors'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: "Quiz for " + title
    }
  }

  state = {
    showAnswer: false,
    correct: 0,
    incorrect: 0,
  }

  showAnswer = () => {
    this.setState({
      showAnswer: true,
    })
  }

  showQuestion = () => {
    this.setState({
      showAnswer: false,
    })
  }

  answeredCorrect = () => {
    this.setState((state) => {
      return {
        ...state,
        correct: state.correct + 1,
        showAnswer: false,
      }
    })
  }

  answeredIncorrect = () => {
    this.setState((state) => {
      return {
        ...state,
        incorrect: state.incorrect + 1,
        showAnswer: false,
      }
    })
  }

  back = () => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.back())
  }

  render() {
    const { showAnswer, correct, incorrect } = this.state
    const { questions } = this.props
    const current = correct + incorrect

    if (current >= questions.length) {
      return (
        <View style={[styles.center, styles.container]}>
          <Text style={styles.question}>You scored {Math.round(correct/questions.length*100)}% correct!</Text>
          <TouchableOpacity style={styles.buttonBack} onPress={this.back}>
            <Text style={styles.buttonTextBack}>Back</Text>
          </TouchableOpacity>
        </View>
      )
    }

    const question = questions[current]
    return (
      <View style={[styles.center, styles.container]}>
        <Text>{current+1} / {questions.length}</Text>
        { !showAnswer
          ? <View>
              <Text style={styles.question}>{question.question}</Text>
              <TouchableOpacity style={styles.buttonToggle} onPress={this.showAnswer}>
                <Text style={styles.buttonTextToggle}>Answer</Text>
              </TouchableOpacity>
            </View>
          : <View>
              <Text style={styles.answer}>{question.answer}</Text>
              <TouchableOpacity style={styles.buttonToggle} onPress={this.showQuestion}>
                <Text style={styles.buttonTextToggle}>Question</Text>
              </TouchableOpacity>
            </View>
        }
        <TouchableOpacity style={styles.buttonCorrect} onPress={this.answeredCorrect}>
          <Text style={styles.buttonTextCorrect}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonIncorrect} onPress={this.answeredIncorrect}>
          <Text style={styles.buttonTextIncorrect}>Incorrect</Text>
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
  question: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  buttonCorrect: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: green,
    marginTop: 10,
  },
  buttonTextCorrect: {
    fontSize: 20,
    color: white,
  },
  buttonToggle: {
    padding: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonTextToggle: {
    fontSize: 15,
    color: gray,
  },
  buttonIncorrect: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: red,
    marginTop: 5,
  },
  buttonTextIncorrect: {
    fontSize: 20,
    color: white,
  },
  buttonBack: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: black,
    marginTop: 10,
  },
  buttonTextBack: {
    fontSize: 20,
    color: white,
  },
})

function mapStateToProps (state, { navigation }) {
  const title = navigation.state.params.title
  return {
    title,
    questions: state[title].questions
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz)
