var listit = require("../lib");
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
