import millisecondToSecond from "./millisecond-to-second";
import { getRandomNumbers } from "./random";

function generateId() {
  const randNumber = getRandomNumbers({ count: 4, min: 1, max: 9 }).join("");

  return `${millisecondToSecond(new Date().getTime())}${randNumber}`;
}

export default generateId;
