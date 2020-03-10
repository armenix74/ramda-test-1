const R = require('ramda');
const fs = require('fs');

let rawdata = fs.readFileSync('students.json');
let students = JSON.parse(rawdata);


const studentAvgScore = student => {
    const studentScores = [];
    student.results.map((elem, i) => {
        studentScores.push(elem.score);
    });
    const len = R.length(studentScores);
    const avg = R.sum(studentScores) / len;
    return R.merge(student, { avgScore: avg });
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


console.log('================================');
console.log('SCORED STUDENTS');
console.log('================================');
console.log('students list: ', scoredStudents(students));

console.log('================================');
console.log('STUDENTS WITH AVG SCORE GREATER THAN 20');
console.log('================================');

const scope = studentsWithScoreAboveValuePiped(16, students)
console.log('There are ', R.length(scope), 'students');
console.log('Students: ', scope);
console.log('================================');
console.log('BEST STUDENT');
console.log('================================');
console.log('The best student is: ', bestScoredStudents(students));


