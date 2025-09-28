function getAverage(scores) {
  if (scores.length === 0) {
    return 0;
  }

  let sum = 0;

  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }

  return sum / scores.length;
}

// shorter way to find the average
/*
function getAverage(scores) {
  let sum = 0;

  for (const score of scores) {
    sum += score;
  }

  return sum / scores.length;
}*/

console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));

function getGrade(score) {
  if (score === 100) {
    return "A++";
  } else if (score <= 99 && score >= 90) {
    return "A";
  } else if (score <= 89 && score >= 80) {
    return "B";
  } else if (score <= 79 && score >= 70) {
    return "C";
  } else if (score <= 69 && score >= 60) {
    return "D";
  } else {
    return "F";
  }
}
console.log("100" + getGrade(100));
console.log("96" + getGrade(96));
console.log("82" + getGrade(82));
console.log("56" + getGrade(56));
console.log("78" + getGrade(78));

function hasPassingGrade(score) {
  if (getGrade(score) === "F") {
    return false;
  }
  return true;
}

// shorter way
// function hasPassingGrade(score) {
//   return getGrade(score) !== "F";
// }
console.log(hasPassingGrade(100));
console.log(hasPassingGrade(53));
console.log(hasPassingGrade(87));

function studentMsg(totalScores, studentScore) {
  const average = getAverage(totalScores);
  const grade = getGrade(studentScore);
  return `Class average: ${average}. Your grade: ${grade}. ${
    grade === "F" ? "You failed the course." : "You passed the course."
  }`;
}
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
