list-it - Fixed Column Text Table Formatter
===========================================

This repo is currently in drafting.

DESCRIPTION
-----------


SAMPLE
------

__japanese-foods.js__

```
var listit = require("list-it");
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
```

outputs:

```
$ node sample/japanese-food.js
1 Sushi    vinegared rice combined raw seafood Healthy
2 Yakiniku Grilled meat on Japanese            Juicy
3 Ramen    Japanese noodle soup dish           I like it
4 Tempura  Deep fried seafood or vegetables    Delicious
5 Sashimi  Very fresh sliced fish              Try it now, It's good
```

METHOD
------

LICENCE
-------

MIT
