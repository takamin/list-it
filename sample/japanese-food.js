var listit = require("../lib");
var buf = listit.buffer();
console.log(
    buf
        .push("1").push("Sushi")
            .push("vinegared rice combined raw seafood")
            .push("Healthy").nl()
        .push("2").push("Yakiniku")
            .push("Grilled meat on Japanese")
            .push("Juicy").nl()
        .push("3").push("Ramen")
            .push("Japanese noodle soup dish")
            .push("I like it").nl()
        .push("4").push("Tempura")
            .push("Deep fried seafood or vegetables")
            .push("Delicious").nl()
        .push("5").push("Sashimi")
            .push("Very fresh sliced fish")
            .push("Try it now, It's good").nl()
        .toString());
