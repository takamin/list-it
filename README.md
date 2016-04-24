list-it - Fixed Column Text Table Formatter
===========================================

DESCRIPTION
-----------

This module is used to create a preformatted text table.

Each columns in all rows are aligned in vertical.

You can put it to the console or a preformated text-file.

When a autoAlign option is set, the numbers are aligned by its fraction point.

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

### autoAlign

__planets.js__

```
var listit = require("list-it");
var buf = listit.buffer({ "autoAlign" : true });
console.log(
    buf
        .d("NAME").d("Mass(10^24kg)").d("Dia(km)")
            .d("Dens(kg/m3)").d("Grav(m/s2)")
            .d("EscV(km/s)").d("Rot(hours)").nl()
        .d("MERCURY").d(0.33).d(4879).d(5427).d(3.7).d(4.3).d(1407.6).nl()
        .d("VENUS").d(4.87).d(12104).d(5243).d(8.9).d(10.4).d(-5832.5).nl()
        .d("EARTH").d(5.97).d(12756).d(5514).d(9.8).d(11.2).d(23.9).nl()
        .d("MOON").d(0.0073).d(3475).d(3340).d(1.6).d(2.4).d(655.7).nl()
        .d("MARS").d(0.642).d(6792).d(3933).d(3.7).d(5.0).d(24.6).nl()
        .d("JUPITER").d(1898).d(142984).d(1326).d(23.1).d(59.5).d(9.9).nl()
        .d("SATURN").d(568).d(120536).d(687).d(9.0).d(35.5).d(10.7).nl()
        .d("URANUS").d(86.8).d(51118).d(1271).d(8.7).d(21.3).d(-17.2).nl()
        .d("NEPTUNE").d(102).d(49528).d(1638).d(11.0).d(23.5).d(16.1).nl()
        .d("PLUTO").d(0.0146).d(2370).d(2095).d(0.7).d(1.3).d(-153.3).nl()
        .toString());
```

outputs:

```
$ node sample/planets.js
NAME    Mass(10^24kg) Dia(km) Dens(kg/m3) Grav(m/s2) EscV(km/s) Rot(hours)
MERCURY        0.33      4879        5427        3.7        4.3     1407.6
VENUS          4.87     12104        5243        8.9       10.4    -5832.5
EARTH          5.97     12756        5514        9.8       11.2       23.9
MOON           0.0073    3475        3340        1.6        2.4      655.7
MARS           0.642     6792        3933        3.7        5.0       24.6
JUPITER     1898.0     142984        1326       23.1       59.5        9.9
SATURN       568.0     120536         687        9.0       35.5       10.7
URANUS        86.8      51118        1271        8.7       21.3      -17.2
NEPTUNE      102.0      49528        1638       11.0       23.5       16.1
PLUTO          0.0146    2370        2095        0.7        1.3     -153.3
```


METHODS
-------

### buffer(opt)

Creates a `ListItBuffer` instance and returns it.

The instance has current row that is a position for the columns to be added.

You cannot edit the columns and rows that were already added.

See the examples below.

#### opt.autoAlign

When this is set true, the data in cell will be aligned in automatic depending on its type.

The number will be aligned to the right taking account of its decimal point.

* Type : boolean
* Default setting : false

### ListItBuffer.d(string)

Adds a new column to the current row.
The `d` is representing 'data'.

Returns `this` object. So you can chain a method call.

### ListItBuffer.nl()

Ends up a process for the current row.

Returns `this` object.

### ListItBuffer.toString()

Returns preformatted text table.


LICENCE
-------

MIT
