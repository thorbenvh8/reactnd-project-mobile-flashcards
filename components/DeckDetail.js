import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, gray, black } from '../utils/colors'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title
    }
  }

  onAddCardPress = () => {
    const { title, navigation } = this.props

    navigation.navigate(
      'AddCard',
      {
        title
      }
    )
  }

  onStartQuizPress = () => {
    const { title, navigation } = this.props

    navigation.navigate(
      'Quiz',
      {
        title
      }
    )
  }

  render() {
    const { title, questions } = this.props
    return (
      <View style={[styles.deck, styles.center]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cards}>{questions.length} card{questions.length !== 1 && "s"}</Text>
        <TouchableOpacity style={styles.buttonAddCard} onPress={this.onAddCardPress}>
          <Text style={styles.buttonTextAddCard}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStartQuiz} onPress={this.onStartQuizPress}>
          <Text style={styles.buttonTextStartQuiz}>Start Quiz</Text>
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
  deck: {
    padding: 40,
    backgroundColor: white,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  cards: {
    color: gray,
  },
  buttonAddCard: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    marginTop: 10,
  },
  buttonTextAddCard: {
    fontSize: 20,
  },
  buttonStartQuiz: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: black,
    marginTop: 10,
  },
  buttonTextStartQuiz: {
    fontSize: 20,
    color: white,
  },
})

function mapStateToProps (state, { navigation }) {
  const { title } = navigation.state.params

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
)(DeckDetail)
