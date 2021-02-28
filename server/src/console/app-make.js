#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();

program.version("0.1.0").command("user [name]", "make user");
program.version("0.1.0").command("vehicle [name]", "make vehicle");

program.parse(process.argv);
