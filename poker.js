const figures = [
  "2", // idx = 0
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A", // idx = 12
];

const colors = ["Heart", "Diamond", "Spade", "Club"];

//  ===================== helper functions

function getDeck() {
  let deck = new Array();
  for (let i = 0; i < figures.length; i++) {
    for (let j = 0; j < colors.length; j++) {
      deck.push({ figure: figures[i], color: colors[j], index: i });
    }
  }
  return deck;
}

function getHand() {
  const deck = getDeck();
  const hand = new Array();

  for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * deck.length);
    hand.push(deck[randomNumber]);
    deck.splice(randomNumber, 1);
  }
  return hand;
}

function getGroupedCards(hand) {
  const groupedHand = hand.reduce((acc, crr) => {
    if (!Object.hasOwn(acc, crr.figure)) {
      acc[crr.figure] = 1;
    } else {
      acc[crr.figure] += 1;
    }
    return acc;
  }, {});
  return groupedHand;
}

function getSortedCardsByIndex(hand) {
  const sortedHand = hand.sort((a, b) => a.index - b.index);
  return sortedHand;
}

//  =============== main

function isRoyalFlush(hand) {
  const sortedHand = getSortedCardsByIndex(hand);
  if (sortedHand[0].figure === "10" && isStraightFlush(sortedHand)) {
    return true;
  }
  return false;
}

function isStraightFlush(hand) {
  const sortedHand = getSortedCardsByIndex(hand);
  return isStraight(sortedHand) && isFlush(sortedHand);
}

function isFourOfAKind(hand) {
  return Object.values(getGroupedCards(hand)).includes(4);
}

function isFullHouse(hand) {
  result = Object.values(getGroupedCards(hand));
  if (result.includes(3) && result.includes(2)) {
    // [3, 2] -> true
    return true;
  }
  return false;
}

function isFlush(hand) {
  const allowedcColor = hand[0].color;
  return hand.every((crr) => crr.color === allowedcColor);
}

function isStraight(hand) {
  const sortedHand = getSortedCardsByIndex(hand);

  for (let i = 0; i < sortedHand.length - 1; i++) {
    const nextIndex = sortedHand[i + 1].index;
    const previousIndex = sortedHand[i].index;
    const diffIndex = nextIndex - previousIndex;
    if (diffIndex !== 1 && diffIndex !== 9) {
      return false;
    }
  }
  return true;
}

function isThreeOfAKind(hand) {
  return Object.values(getGroupedCards(hand)).includes(3);
}

function isTwoPair(hand) {
  // Reurn array contains only duplicate cards
  const result = Object.values(getGroupedCards(hand)).filter((crr) => crr > 1);
  return result.length === 2 ? true : false;
}

function isOnePair(hand) {
  return Object.values(getGroupedCards(hand)).includes(2);
}

function isHighCard(hand) {
  const sortedHand = getSortedCardsByIndex(hand);
  return sortedHand[4];
}

// const testObj = [
//   { figure: "7", color: "Club", index: 11 },
//   { figure: "9", color: "Club", index: 8 },
//   { figure: "4", color: "Club", index: 9 },
//   { figure: "A", color: "Club", index: 3 },
//   { figure: "J", color: "Club", index: 10 },
// ];
// const hand = testObj;

const hand = getHand();
console.table(hand);
console.log("****************************************");

if (isRoyalFlush(hand)) {
  console.log("Congratulations you have Royal Flush");
} else if (isStraightFlush(hand)) {
  console.log("Congratulations you have Straight Flush");
} else if (isFourOfAKind(hand)) {
  console.log(`Congratulations you have 4 figures same type.`);
} else if (isFullHouse(hand)) {
  console.log(`Congratulations you have three of a kind and one pair.`);
} else if (isFlush(hand)) {
  console.log(`Congratulations all of your cards are the same color.`);
} else if (isStraight(hand)) {
  console.log(`Congratulations you have straight.`);
} else if (isThreeOfAKind(hand)) {
  console.log(`Congratulations you have 3 figures same type.`);
} else if (isTwoPair(hand)) {
  console.log(`Congratulations you have two pairs.`);
} else if (isOnePair(hand)) {
  console.log(`Congratulations you have one pair.`);
} else {
  const highestCard = isHighCard(hand);
  console.log(`Your highest card is ${highestCard.figure}.`);
}
console.log("****************************************");
