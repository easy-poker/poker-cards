import { range } from 'lodash/fp';

import { Suit, Face, Card } from './types';
import { Shuffler, shuffleFisherYatesStack } from './util/shuffle';

export const generateDeck = ({
  jokers = false,
}: { jokers?: boolean } = {}): Deck => {
  const suits = Object.values(Suit).filter((suit) => suit !== Suit.Joker);
  const faces = Object.values(Face).filter((face) => face !== Face.Joker);

  return suits
    .flatMap((suit) => faces.map((face) => ({ face, suit })))
    .concat(
      jokers
        ? range(0, 4).map(() => ({ face: Face.Joker, suit: Suit.Joker }))
        : [],
    );
};

// index 0 represents 'top' of a deck
export const drawCardsFromDeck = (deck: Deck, count = 1): DeckDrawResult => {
  const drawCount = Math.min(count, deck.length);

  if (!deck.length || !drawCount || drawCount < 0) return { deck, cards: [] };

  const nextDeck = [...deck];
  const cards = nextDeck.splice(0, drawCount);

  // Reverse order to represent drawing cards one-by-one, as opposed to cutting
  // off a chunk of cards from the "top" of the deck, so that first drawn ends
  // up at "bottom" of drawn pile, e.g. when drawing 3:
  // initial deck: [a, b, c, d]
  // draw first card: [b, c, d] => [a]
  // then second: [c, d] => [b, a]
  // then third: [b] => [c, b, a]
  cards.reverse();

  return { cards, deck: nextDeck };
};

export const shuffleDeck = (
  deck: Deck,
  shuffleFn: Shuffler = shuffleFisherYatesStack,
): Promise<Deck> => shuffleFn(deck);

export type DeckDrawResult = Readonly<{ cards: Card[]; deck: Deck }>;

export type Deck = readonly Card[];
