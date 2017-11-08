import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { white, gray, black } from '../utils/colors'
import { saveDeckTitle } from '../actions'

class NewDeck extends Component {
  state = {
    title: '',
  }

  handleTitleChange = (title) => {
    this.setState({
      title
    })
  }

  handleSubmit = () => {
    console.log("handleSubmit")
    const { saveDeckTitle, navigation } = this.props
    const { title } = this.state

    saveDeckTitle(title)
    navigation.navigate(
      'DeckDetail',
      {
        title
      }
    )

    this.setState({
      title: '',
    })
  }

  render() {
    const { title } = this.state
    return (
      <View style={[styles.center, styles.container]}>
        <Text style={styles.question}>What is the title of your new deck?</Text>
        <TextInput
          value={title}
          style={styles.input}
          placeholder="Title"
          onChangeText={this.handleTitleChange}
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
  question: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    height: 60,
    width: '80%',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
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
  return {}
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    saveDeckTitle: (data) => dispatch(saveDeckTitle(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewDeck)
