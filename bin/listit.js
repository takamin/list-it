#!/usr/bin/env node
"use strict";

const { name, version, repository, homepage, author, license } =
    require(`${__dirname}/../package.json`);

const USAGE =
`Usage: listit [input-filename] [OPTIONS]

Outputs the array included in JSON to the console in tabular format.
Non-array data is displayed as is.

OPTIONS:
[[OPTIONS]]

----
This command is included in the npm ${name}@${version}

Repository: ${repository.url}
Homepage: ${homepage}

Copyright (c) 2020 ${author}
This software is released under the ${license} License
`;

const PARAMETERS = [
    "inputFilename:string",
];

const OPTIONS = [
    ["h", "help", "Print this help message"],
    ["v", "version", "Print the version of this package"],
];

const debug = require("debug")("listit");
const EastAsianStringWidth = require("eastasianwidth");
const fs = require("fs");
const Getopt = require("node-getopt").create(OPTIONS).bindHelp(USAGE);
const HashArg = require("hash-arg");
const ListIt = require("../index.js");
const readline = require("readline");
const TermSize = require("term-size");

const readFile = filename => {
    return new Promise((resolve, reject)=>{
        fs.readFile(filename, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data.toString());
            }
        });
    });
};

const readStdin = () => {
    return new Promise((resolve, reject)=>{
        try {
            const inputLines = [];
            const stdin = readline.createInterface({ input: process.stdin });
            stdin.on("line", line => inputLines.push(line));
            stdin.on("close", () => resolve(inputLines.join("\r\n")));
        } catch (err) {
            reject(err);
        }
    });
};

const readInput = filename => {
    if(filename) {
        return readFile(filename);
    }
    return readStdin();
};

const _createList = (resultBuffer, inputData, name) => {
    if(Array.isArray(inputData)) {
        const listit = new ListIt({});
        resultBuffer.push({ name, type: "list", list: listit.d(inputData) });
    } else if(typeof inputData === "object") {
        Object.keys(inputData).forEach(key => _createList(
            resultBuffer, inputData[key], `${name}.${key}`));
    } else {
        resultBuffer.push({ name, type: "value", value: inputData });
    }
};

const createList = inputData => {
    const resultBuffer = [];
    _createList(resultBuffer, inputData, "$");
    return resultBuffer;
};

const eastAsianSubstring = (s, start, end) => {
    let chStart = 0;
    let chEnd = 0;
    let count = 0;
    for(let c of s) {
        count += EastAsianStringWidth.length(c);
        if(count < start) {
            chStart++;
        }
        if(end == null || count < end) {
            chEnd++;
        }
    }
    return s.substring(chStart, chEnd);
};

class EastAsianLineBuffer {
    constructor() {
        this._lines = [];
    }
    push(data) {
        data.split(/\r{0,1}\n/).forEach(
            line => this._lines.push(line));
    }
    toString(offset, width) {
        offset = offset || 0;
        width = width || 0;
        return this._lines.map(line=>{
            if(line.length < offset) {
                return "";
            } else if(width == 0 || line.length < offset + width) {
                return eastAsianSubstring(line, offset);
            } else {
                return eastAsianSubstring(line, offset, offset + width);
            }
        }).join("\r\n");
    }
}

const ChildProcess = require("child_process");
const exec = command => {
    return new Promise((resolve, reject) => {
        ChildProcess.exec(command, (err, stdout, stderr) => {
            if(err) {
                err.message = `${err.message}(stderr:${stderr})`;
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
};

const getTermSize = async () => {
    //try {
    //    debug("Try tput to get terminal size.");
    //    return {
    //        columns: parseInt(await exec("tput cols")),
    //        rows: parseInt(await exec("tput lines")),
    //    }
    //} catch(err) {
    //    debug(`Error: ${err.message}`);
    //    debug("Try term-size to get terminal size.");
    try {
        return TermSize();
    } catch(err) {
        debug(`Error: ${err.message}`);
        return null;
    }
    //}
};

(async () => {
    try {
        const { options, argv } = Getopt.parseSystem();
        debug(`options:${JSON.stringify(options, null, 2)}`);

        if(options.version) {
            console.log(`${version}`);
            process.exit(1);
        }

        const { inputFilename } = HashArg.get(PARAMETERS, argv);
        debug(`inputFilename:${inputFilename}`);

        const inputData = JSON.parse(await readInput(inputFilename));
        debug(JSON.stringify(inputData, null, 2));

        const result = createList(inputData);
        const lineBuffer = new EastAsianLineBuffer();
        result.forEach( data => {
            lineBuffer.push("");
            lineBuffer.push(`[${data.name}]:`);
            lineBuffer.push(`${data[data.type].toString()}`);
        });
        const termSize = await getTermSize();
        if(termSize) {
            debug(`termSize: ${JSON.stringify(termSize)}`);
            console.log(lineBuffer.toString(0, termSize.columns));
        } else {
            console.log(lineBuffer.toString());
        }
    } catch(err) {
        console.error(`Error: ${err.message}`);
    }
})();
