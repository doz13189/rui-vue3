var People;
(function (People) {
    People[People["a"] = 0] = "a";
    People[People["b"] = 1] = "b";
    People[People["c"] = 2] = "c";
})(People || (People = {}));
console.log(People);
console.log(People.a);
console.log(People[0]);
// enum Month {
//   January = 1,
//   February = 2,
//   March = 3,
//   April = 4,
//   May = 5,
//   June = 6,
//   July = 7,
//   August = 8,
//   September = 9,
//   October = 10,
//   November = 11,
//   December = 12
// }
// console.log(Month.May)
// console.log(Month[5])
// enum People2 {
//   a = 1,
//   b,
//   c
// }
// enum People3 {}
