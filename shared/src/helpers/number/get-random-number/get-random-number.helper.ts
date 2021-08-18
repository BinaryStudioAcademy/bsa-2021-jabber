const RANDOM_NUMBER_INCREMENT = 1;

const getRandomNumber = (min: number, max: number): number => {
  const randomNumber = Math.floor(Math.random() * (max - min + RANDOM_NUMBER_INCREMENT)) + min;

  return randomNumber;
};

export { getRandomNumber };
