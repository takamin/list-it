var listit = require("../lib");
var buf = listit.buffer();
console.log(
    buf
        .d("1").d("Sushi")
            .d("vinegared rice combined raw seafood")
            .d("Healthy").nl()
        .d("2").d("Yakiniku")
            .d("Grilled meat on Japanese")
            .d("Juicy").nl()
        .d("3").d("Ramen")
            .d("Japanese noodle soup dish")
            .d("I like it").nl()
        .d("4").d("Tempura")
            .d("Deep fried seafood or vegetables")
            .d("Delicious").nl()
        .d("5").d("Sashimi")
            .d("Very fresh sliced fish")
            .d("Try it now, It's good").nl()
        .toString());
