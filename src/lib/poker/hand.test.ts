import { Face, Suite } from '../cards';
import { evaluatePokerHand, comparePokerHands } from './hand';
import { PokerHandRank } from './types';

describe('poker/hand', () => {
  describe('comparePokerHands', () => {
    it('compares hands', () => {
      expect(comparePokerHands(ranksOnePair, ranksOnePair)).toBe(0);
      expect(
        comparePokerHands(ranksTwoPair, ranksThreeOfAKind),
      ).toBeGreaterThan(0);
      expect(comparePokerHands(ranksFullHouse, ranksThreeOfAKind)).toBeLessThan(
        0,
      );
    });
  });

  describe('evaluatePokerHand', () => {
    it('evaluates high card', () => {
      expect(evaluatePokerHand(ranksHighCard)).toEqual({
        rank: PokerHandRank.HighCard,
        rankCards: [{ face: Face.Queen, suite: Suite.Diamonds }],
        kickers: [
          { face: Face.Jack, suite: Suite.Clubs },
          { face: Face.Eight, suite: Suite.Spades },
          { face: Face.Six, suite: Suite.Diamonds },
          { face: Face.Four, suite: Suite.Clubs },
          { face: Face.Three, suite: Suite.Clubs },
          { face: Face.Two, suite: Suite.Diamonds },
        ],
      });
    });

    it('evaluates one pair', () => {
      expect(evaluatePokerHand(ranksOnePair)).toEqual({
        rank: PokerHandRank.OnePair,
        rankCards: [
          { face: Face.Six, suite: Suite.Clubs },
          { face: Face.Six, suite: Suite.Diamonds },
        ],
        kickers: [
          { face: Face.Queen, suite: Suite.Diamonds },
          { face: Face.Jack, suite: Suite.Clubs },
          { face: Face.Eight, suite: Suite.Spades },
          { face: Face.Four, suite: Suite.Clubs },
          { face: Face.Two, suite: Suite.Diamonds },
        ],
      });
    });

    it('evaluates two pair', () => {
      expect(evaluatePokerHand(ranksTwoPair)).toEqual({
        rank: PokerHandRank.TwoPair,
        rankCards: [
          { face: Face.Jack, suite: Suite.Clubs },
          { face: Face.Jack, suite: Suite.Diamonds },
          { face: Face.Six, suite: Suite.Clubs },
          { face: Face.Six, suite: Suite.Diamonds },
        ],
        kickers: [
          { face: Face.Eight, suite: Suite.Spades },
          { face: Face.Four, suite: Suite.Clubs },
          { face: Face.Two, suite: Suite.Diamonds },
        ],
      });

      expect(evaluatePokerHand(ranksTwoPairFromThreePair)).toEqual({
        rank: PokerHandRank.TwoPair,
        rankCards: [
          { face: Face.Queen, suite: Suite.Spades },
          { face: Face.Queen, suite: Suite.Clubs },
          { face: Face.Jack, suite: Suite.Clubs },
          { face: Face.Jack, suite: Suite.Diamonds },
        ],
        kickers: [
          { face: Face.Eight, suite: Suite.Spades },
          { face: Face.Six, suite: Suite.Clubs },
          { face: Face.Six, suite: Suite.Diamonds },
        ],
      });
    });

    it('evaluates three of a kind', () => {
      expect(evaluatePokerHand(ranksThreeOfAKind)).toEqual({
        rank: PokerHandRank.ThreeOfAKind,
        rankCards: [
          { face: Face.Six, suite: Suite.Hearts },
          { face: Face.Six, suite: Suite.Clubs },
          { face: Face.Six, suite: Suite.Diamonds },
        ],
        kickers: [
          { face: Face.Queen, suite: Suite.Clubs },
          { face: Face.Jack, suite: Suite.Diamonds },
          { face: Face.Eight, suite: Suite.Spades },
          { face: Face.Two, suite: Suite.Diamonds },
        ],
      });
    });

    it('evaluates straight', () => {
      expect(evaluatePokerHand(ranksStraightAndPair)).toEqual({
        rank: PokerHandRank.Straight,
        rankCards: [
          { face: Face.Six, suite: Suite.Hearts },
          { face: Face.Five, suite: Suite.Clubs },
          { face: Face.Four, suite: Suite.Diamonds },
          { face: Face.Three, suite: Suite.Diamonds },
          { face: Face.Two, suite: Suite.Clubs },
        ],
        kickers: [
          { face: Face.Eight, suite: Suite.Spades },
          { face: Face.Six, suite: Suite.Diamonds },
        ],
      });
    });

    it('evaluates flush', () => {
      expect(evaluatePokerHand(ranksFlushAndTwoPair)).toEqual({
        rank: PokerHandRank.Flush,
        rankCards: [
          { face: Face.Jack, suite: Suite.Diamonds },
          { face: Face.Five, suite: Suite.Diamonds },
          { face: Face.Four, suite: Suite.Diamonds },
          { face: Face.Three, suite: Suite.Diamonds },
          { face: Face.Two, suite: Suite.Diamonds },
        ],
        kickers: [
          { face: Face.Jack, suite: Suite.Hearts },
          { face: Face.Three, suite: Suite.Spades },
        ],
      });
    });

    it('evaluates full house', () => {
      expect(evaluatePokerHand(ranksFullHouse)).toEqual({
        rank: PokerHandRank.FullHouse,
        rankCards: [
          { face: Face.Three, suite: Suite.Spades },
          { face: Face.Three, suite: Suite.Clubs },
          { face: Face.Three, suite: Suite.Diamonds },
          { face: Face.Jack, suite: Suite.Hearts },
          { face: Face.Jack, suite: Suite.Diamonds },
        ],
        kickers: [
          { face: Face.Five, suite: Suite.Diamonds },
          { face: Face.Four, suite: Suite.Diamonds },
        ],
      });

      expect(evaluatePokerHand(ranksFullHouseAndTwoPair)).toEqual({
        rank: PokerHandRank.FullHouse,
        rankCards: [
          { face: Face.Jack, suite: Suite.Spades },
          { face: Face.Jack, suite: Suite.Hearts },
          { face: Face.Jack, suite: Suite.Diamonds },
          { face: Face.Four, suite: Suite.Hearts },
          { face: Face.Four, suite: Suite.Diamonds },
        ],
        kickers: [
          { face: Face.Three, suite: Suite.Clubs },
          { face: Face.Three, suite: Suite.Diamonds },
        ],
      });

      expect(evaluatePokerHand(ranksFullHouseAndTwoThreeOfAKind)).toEqual({
        rank: PokerHandRank.FullHouse,
        rankCards: [
          { face: Face.Jack, suite: Suite.Spades },
          { face: Face.Jack, suite: Suite.Hearts },
          { face: Face.Jack, suite: Suite.Diamonds },
          { face: Face.Three, suite: Suite.Hearts },
          { face: Face.Three, suite: Suite.Clubs },
        ],
        kickers: [
          { face: Face.Four, suite: Suite.Diamonds },
          { face: Face.Three, suite: Suite.Diamonds },
        ],
      });
    });

    it('evaluates four of a kind', () => {
      expect(evaluatePokerHand(ranksFourOfAKind)).toEqual({
        rank: PokerHandRank.FourOfAKind,
        rankCards: [
          { face: Face.Six, suite: Suite.Spades },
          { face: Face.Six, suite: Suite.Hearts },
          { face: Face.Six, suite: Suite.Clubs },
          { face: Face.Six, suite: Suite.Diamonds },
        ],
        kickers: [
          { face: Face.Jack, suite: Suite.Diamonds },
          { face: Face.Eight, suite: Suite.Spades },
          { face: Face.Two, suite: Suite.Diamonds },
        ],
      });
    });

    it('evaluates straight flush', () => {
      expect(evaluatePokerHand(ranksStraightFlushAndOnePair)).toEqual({
        rank: PokerHandRank.StraightFlush,
        rankCards: [
          { face: Face.Six, suite: Suite.Clubs },
          { face: Face.Five, suite: Suite.Clubs },
          { face: Face.Four, suite: Suite.Clubs },
          { face: Face.Three, suite: Suite.Clubs },
          { face: Face.Two, suite: Suite.Clubs },
        ],
        kickers: [
          { face: Face.Eight, suite: Suite.Spades },
          { face: Face.Six, suite: Suite.Spades },
        ],
      });
    });

    it('evaluates royal flush', () => {
      expect(evaluatePokerHand(ranksRoyalFlushAndOnePair)).toEqual({
        rank: PokerHandRank.RoyalFlush,
        rankCards: [
          { face: Face.Ace, suite: Suite.Clubs },
          { face: Face.King, suite: Suite.Clubs },
          { face: Face.Queen, suite: Suite.Clubs },
          { face: Face.Jack, suite: Suite.Clubs },
          { face: Face.Ten, suite: Suite.Clubs },
        ],
        kickers: [
          { face: Face.Jack, suite: Suite.Spades },
          { face: Face.Eight, suite: Suite.Spades },
        ],
      });
    });
  });
});

const ranksHighCard = [
  { face: Face.Six, suite: Suite.Diamonds },
  { face: Face.Two, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Clubs },
  { face: Face.Eight, suite: Suite.Spades },
  { face: Face.Three, suite: Suite.Clubs },
  { face: Face.Four, suite: Suite.Clubs },
  { face: Face.Queen, suite: Suite.Diamonds },
];

const ranksOnePair = [
  { face: Face.Six, suite: Suite.Diamonds },
  { face: Face.Two, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Clubs },
  { face: Face.Eight, suite: Suite.Spades },
  { face: Face.Six, suite: Suite.Clubs },
  { face: Face.Four, suite: Suite.Clubs },
  { face: Face.Queen, suite: Suite.Diamonds },
];

const ranksTwoPair = [
  { face: Face.Six, suite: Suite.Diamonds },
  { face: Face.Two, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Diamonds },
  { face: Face.Eight, suite: Suite.Spades },
  { face: Face.Six, suite: Suite.Clubs },
  { face: Face.Four, suite: Suite.Clubs },
  { face: Face.Jack, suite: Suite.Clubs },
];

const ranksTwoPairFromThreePair = [
  { face: Face.Six, suite: Suite.Diamonds },
  { face: Face.Queen, suite: Suite.Clubs },
  { face: Face.Jack, suite: Suite.Diamonds },
  { face: Face.Eight, suite: Suite.Spades },
  { face: Face.Six, suite: Suite.Clubs },
  { face: Face.Queen, suite: Suite.Spades },
  { face: Face.Jack, suite: Suite.Clubs },
];

const ranksThreeOfAKind = [
  { face: Face.Six, suite: Suite.Diamonds },
  { face: Face.Two, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Diamonds },
  { face: Face.Eight, suite: Suite.Spades },
  { face: Face.Six, suite: Suite.Clubs },
  { face: Face.Six, suite: Suite.Hearts },
  { face: Face.Queen, suite: Suite.Clubs },
];

const ranksStraightAndPair = [
  { face: Face.Four, suite: Suite.Diamonds },
  { face: Face.Two, suite: Suite.Clubs },
  { face: Face.Three, suite: Suite.Diamonds },
  { face: Face.Eight, suite: Suite.Spades },
  { face: Face.Five, suite: Suite.Clubs },
  { face: Face.Six, suite: Suite.Hearts },
  { face: Face.Six, suite: Suite.Diamonds },
];

const ranksFlushAndTwoPair = [
  { face: Face.Four, suite: Suite.Diamonds },
  { face: Face.Two, suite: Suite.Diamonds },
  { face: Face.Three, suite: Suite.Diamonds },
  { face: Face.Three, suite: Suite.Spades },
  { face: Face.Five, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Hearts },
];

const ranksFullHouse = [
  { face: Face.Four, suite: Suite.Diamonds },
  { face: Face.Three, suite: Suite.Clubs },
  { face: Face.Three, suite: Suite.Diamonds },
  { face: Face.Three, suite: Suite.Spades },
  { face: Face.Five, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Hearts },
];

const ranksFullHouseAndTwoPair = [
  { face: Face.Four, suite: Suite.Hearts },
  { face: Face.Three, suite: Suite.Clubs },
  { face: Face.Three, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Spades },
  { face: Face.Four, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Hearts },
];

const ranksFullHouseAndTwoThreeOfAKind = [
  { face: Face.Three, suite: Suite.Hearts },
  { face: Face.Three, suite: Suite.Clubs },
  { face: Face.Three, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Spades },
  { face: Face.Four, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Hearts },
];

const ranksFourOfAKind = [
  { face: Face.Six, suite: Suite.Diamonds },
  { face: Face.Two, suite: Suite.Diamonds },
  { face: Face.Jack, suite: Suite.Diamonds },
  { face: Face.Eight, suite: Suite.Spades },
  { face: Face.Six, suite: Suite.Clubs },
  { face: Face.Six, suite: Suite.Hearts },
  { face: Face.Six, suite: Suite.Spades },
];

const ranksStraightFlushAndOnePair = [
  { face: Face.Four, suite: Suite.Clubs },
  { face: Face.Two, suite: Suite.Clubs },
  { face: Face.Three, suite: Suite.Clubs },
  { face: Face.Eight, suite: Suite.Spades },
  { face: Face.Five, suite: Suite.Clubs },
  { face: Face.Six, suite: Suite.Clubs },
  { face: Face.Six, suite: Suite.Spades },
];

const ranksRoyalFlushAndOnePair = [
  { face: Face.Ace, suite: Suite.Clubs },
  { face: Face.Queen, suite: Suite.Clubs },
  { face: Face.Ten, suite: Suite.Clubs },
  { face: Face.Eight, suite: Suite.Spades },
  { face: Face.Jack, suite: Suite.Clubs },
  { face: Face.King, suite: Suite.Clubs },
  { face: Face.Jack, suite: Suite.Spades },
];
