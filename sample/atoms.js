const ListIt = require("../index.js");
const listit = new ListIt({
    autoAlign : true,
    headerUnderline: true,
});
const ATOMS = [
    ["Name", "Radius(m)", "Radius(Å)"],
    ["H", 0.1e-10, 0.1],
    ["Cl", 1.67e-10, 1.67],
    ["Na", 1.16e-10, 1.16],
    ["O", 1.21e-10, 1.21],
    ["Si", 0.4e-10, 0.4],
];

console.log(listit.setHeaderRow(ATOMS.shift()).d(ATOMS).toString());
