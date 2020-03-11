const R = require('ramda');
const fs = require('fs');

let rawdata = fs.readFileSync('students.json');
let students = JSON.parse(rawdata);
const averageThreshold = 16;
const certainScore = 30;

const studentAvgScore = student => {
    const studentScores = R.map(r => r.score, student.results);
    const avg = R.mean(studentScores);
    return R.merge(student, { allScores: studentScores, avgScore: avg });
}

const filterByAvgScore = R.curry((threshold, student) => {
    const { avgScore = 0 } = student;
    return avgScore >= threshold;
})


const scoredStudents = (students) => {
    return R.map(studentAvgScore, students);
}

// const studentsWithScoreAboveValue = (value, students) => {
//     const res1 = scoredStudents(students);
//     const res2 = R.filter(filterByAvgScore(value), res1);

//     return res2;
// }

const studentsWithScoreAboveValuePiped = (value, students) => {
    return R.pipe(
        scoredStudents,
        R.filter(filterByAvgScore(value)),
    )(students)
}


const bestScoredStudents = (students) => {
    return R.pipe(
        scoredStudents,
        R.sortWith([R.descend(student => student.avgScore)]),
        R.head,
    )(students)
}

const filterScoreWithAValue = R.curry((value, student) => {
    const studentScores = R.map(r => r.score, student.results);
    return R.any(e => e == value)(studentScores);
})


const studentHavingAtLeastACertainScore = (value, students) => {
    return R.filter(filterScoreWithAValue(value), students);
}




console.log('================================');
console.log('PARAMETERS:');
console.log('================================');
console.log('averageThreshold: ', averageThreshold);
console.log('certainScore: ', certainScore);



console.log('================================');
console.log('ALL SCORED STUDENTS');
console.log('================================');
console.log('students list: ', scoredStudents(students));

console.log('================================');
console.log('STUDENTS WITH AVG SCORE GREATER THAN', averageThreshold);
console.log('================================');

const scope = studentsWithScoreAboveValuePiped(averageThreshold, students)
console.log('There are', R.length(scope), 'students having an average score greater than', averageThreshold);
console.log('Students:');
console.log(scope);
console.log('================================');
console.log('BEST STUDENT');
console.log('================================');
console.log('The best student is: ')
console.log(bestScoredStudents(students));

console.log('================================');
console.log('STUDENTS HAVING A CERTAIN SCORE of (', certainScore, ')');
console.log('================================');

console.log(studentHavingAtLeastACertainScore(certainScore, students));
