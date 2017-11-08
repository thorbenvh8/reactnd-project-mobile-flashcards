export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'SAVE_DECK_TITLE'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function saveDeckTitle (title) {
  return {
    type: ADD_DECK,
    deck: {
      [title]: {
        title,
        questions: [],
      }
    }
  }
}
