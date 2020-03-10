var faker = require('faker');
const fs = require('fs');



let students = [];
let i = 0;
while (i < 10) {
    let student = {
        first: faker.name.firstName(),
        last: faker.name.lastName(),
        results: [{
            courseName: "ElasticSearch",
            score: faker.random.number(30)
        },
        {
            courseName: "GraphQL",
            score: faker.random.number(30)
        },
        {
            courseName: "FunctionalJS",
            score: faker.random.number(30)
        },
        {
            courseName: "Swift",
            score: faker.random.number(30)
        },
        {
            courseName: "Phyton",
            score: faker.random.number(30)
        },
        {
            courseName: "Ruby",
            score: faker.random.number(30)
        }],
    };
    students.push(student);
    i++;
}


var jsonContent = JSON.stringify(students);
console.log(jsonContent);

fs.writeFile("students.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
});