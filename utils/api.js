import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = "abc"

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((res) => JSON.parse(res))
}

export function getDeck ({ title }) {
  return getDecks()[title]
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
  var deck = getDeck({title})
  deck.questions.push(card)
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: deck,
  }))
}
