import axios from "axios";
import data from "./data";

export const getResponseFromApi = async api => axios.get(api);

export const getContinents = () => data.continents;

export const getPlaces = () => data.places;

export const checkMapQuestion = (codeName, answer) => {
  //===CHANGE IF HTML+CSS (SAME LOCATION)===\\
  if (codeName === "HTML+CSS") codeName = "HTML";
  //===CHECK ANSWER===\\
  let points = 0;
  data.codeLanguage.forEach(codeType => {
    if (codeName === codeType.code) {
      switch (answer.toUpperCase()) {
        case codeType.town.toUpperCase():
          points = 10;
          break;
        case codeType.state.toUpperCase():
          points = 5;
          break;
        case codeType.region.toUpperCase():
          points = 1;
          break;
        default:
          points = -5;
      }
    }
  });
  return points;
};

export const shuffle = array =>
  array
    .map(index => [Math.random(), index])
    .sort(([a], [b]) => a - b)
    .map(([_, index]) => index);

export const getQuestion = number => {
  const questionNumber = data.questions[number];
  return { ...questionNumber, answers: shuffle(questionNumber.answers) };
};

export const checkNumber = number => number > data.questions.length - 1;

export const getResult = (money, pointsMap, pointsChallenge) => {
  let resultStory = ``;
  if (money > 0) {
    if (pointsMap > 4 && pointsChallenge > 4) {
      resultStory = data.results.ultimateResult;
    } else if (
      (pointsMap > 4 && pointsChallenge === 0) ||
      (pointsMap === 0 && pointsChallenge > 4)
    ) {
      resultStory = data.results.plusOnePage;
    } else if (pointsMap > 2 || pointsChallenge > 2) {
      resultStory = data.results.plus2;
    } else if (pointsMap > 0 || pointsChallenge > 0) {
      resultStory = data.results.plus;
    } else {
      resultStory = data.results.wrong;
    }
  } else {
    if (
      (pointsMap > 4 && pointsChallenge === 0) ||
      (pointsMap === 0 && pointsChallenge > 4)
    ) {
      resultStory = data.results.minusOnePage;
    } else if (pointsMap > 2 || pointsChallenge > 2) {
      resultStory = data.results.minus2;
    } else if (pointsMap > 0 || pointsChallenge > 0) {
      resultStory = data.results.minus;
    } else {
      resultStory = data.results.wrong;
    }
  }
  return resultStory;
};

//Debouncing ensure that time-consuming tasks do not fire so often, improving browser performance
export const debounce = (func, delay) => {
  let inDebounce
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  }
}

//Throttle is like a chaining debounce
export const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function () {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}
