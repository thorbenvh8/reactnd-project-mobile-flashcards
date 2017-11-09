import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { white, gray } from '../utils/colors'
import { receiveDecks } from '../actions'
import * as API from '../utils/api'

class Decks extends Component {
  componentDidMount () {
    const { receiveDecks } = this.props

    API.getDecks()
      .then((decks) => receiveDecks({decks}))
  }

  renderDeck = ({ item }) => {
    return <View>
      <TouchableOpacity
        style={[styles.deck, styles.center]}
        onPress={() => this.props.navigation.navigate(
          'DeckDetail',
          {
            title: item.title
          }
        )}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.cards}>{item.questions.length} card{item.questions.length !== 1 && "s"}</Text>
      </TouchableOpacity>
      <View style={styles.line}/>
    </View>
  }

  render() {
    var { decks } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderDeck}
          keyExtractor={(item, index) => item.title}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deck: {
    padding: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  cards: {
    color: gray,
  },
  line: {
    borderBottomWidth: 1,
  },
})

function mapStateToProps (decks) {
  return {
    decks: Object.keys(decks).map((key) => decks[key])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    receiveDecks: (data) => dispatch(receiveDecks(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks)
