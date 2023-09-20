interface GetRandomNumbersArg {
  count: number;
  min: number;
  max: number;
}

function random(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomNumbers({ count, min, max }: GetRandomNumbersArg) {
  return new Array(count).fill(null).map(() => random(min, max));
}

export { random as default, getRandomNumbers };
