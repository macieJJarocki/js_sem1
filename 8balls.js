const generateRandomArray = () => {
  const randomArray = new Array(8);
  randomIndex = Math.floor(Math.random() * (randomArray.length - 1));

  for (let i = 0; i < randomArray.length; i++) {
    randomArray[i] = { index: i, weight: 1 };
    if (i === randomIndex) {
      randomArray[i].weight = 2;
    }
  }
  return randomArray;
};

function sum(subset) {
  return subset.reduce((acc, crr) => acc + crr.weight, 0);
}

function compareWeights(subset) {
  if (subset[0].weight > subset[1].weight) {
    return subset[0].index;
  } else if (subset[0].weight < subset[1].weight) {
    return subset[1].index;
  } else {
    return subset[2].index;
  }
}

function findIndexOf2(array) {
  const subSet1 = array.slice(0, 3);
  const subSet2 = array.slice(3, 6);
  const subSet3 = array.slice(6);

  if (sum(subSet1) === sum(subSet2)) {
    if (subSet3[0].weight > subSet3[1].weight) {
      return subSet3[0].index;
    }
    return subSet3[1].index;
  } else if (sum(subSet1) > sum(subSet2)) {
    return compareWeights(subSet1);
  } else {
    return compareWeights(subSet2);
  }
}
const array = generateRandomArray();
console.log(
  `Random genereted array: ${array.map((element) => element.weight)}`
);
console.log(
  `Position 2 in array using indexOf: ${array
    .map((element) => element.weight)
    .indexOf(2)}`
);
console.log(`Calculated position of the heaviest ball: ${findIndexOf2(array)}`);
