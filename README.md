list-it - Fixed Column Text Table Formatter
===========================================

DESCRIPTION
-----------

This module is used to create a preformatted text table.

Each columns in all rows are aligned in vertical.

You can put it to the console or a preformated text-file.

METHODS
-------

### buffer()

Creates a `ListItBuffer` instance and returns it.

The instance has current row that is a position for the columns to be added.

You cannot edit the columns and rows that were already added.

See the examples below.

### ListItBuffer.d(string)

Adds a new column to the current row.
The `d` is representing 'data'.

Returns `this` object. So you can chain a method call.

### ListItBuffer.nl()

Ends up a process for the current row.

Returns `this` object.

### ListItBuffer.toString()

Returns preformatted text table.


SAMPLE
------

__japanese-foods.js__

```
var listit = require("list-it");
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
