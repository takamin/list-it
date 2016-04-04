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
    buf.push("1").push("Sushi").push("Seafoods on special rice").nl()
        .push("2").push("Yakiniku").push("Japanese style steak").nl()
        .push("3").push("Lamen").push("Noodle").nl()
        .push("4").push("Tempura").push("Fly the vegitables").nl()
        .push("5").push("Sashimi").push("Raw fishes").nl()
        .toString());
```

outputs:

```
$ node sample/japanese-food.js
1 Sushi    Seafoods on special rice
2 Yakiniku Japanese style steak
3 Lamen    Noodle
4 Tempura  Fly the vegitables
5 Sashimi  Raw fishes
```

METHOD
------

LICENCE
-------

MIT
