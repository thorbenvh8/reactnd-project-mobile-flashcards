import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = "5EkVrGpj3tTN8Mjw"

const defaultDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((res) => JSON.parse(res))
    .then(decks => {
      // if no data is available, load some test data for init
      if (decks == null) {
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(defaultDecks))
        return defaultDecks
      }
      return decks
    })
}

export function getDeck ({ title }) {
  return getDecks().then(decks => decks[title])
}

export function saveDeckTitle ({ title }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: [],
    }
  }))
}

export function addCardToDeck ({ title, card }) {
  return getDeck({title}).then(deck => {
    deck.questions.push(card)
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [title]: deck,
    }))
  })
}
