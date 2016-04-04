var listit = require("../lib");
var buf = listit.buffer();
console.log(
    buf.push("1").push("Sushi").push("Seafoods on special rice").nl()
        .push("2").push("Yakiniku").push("Japanese style steak").nl()
        .push("3").push("Lamen").push("Noodle").nl()
        .push("4").push("Tempura").push("Fly the vegitables").nl()
        .push("5").push("Sashimi").push("Raw fishes").nl()
        .toString());

