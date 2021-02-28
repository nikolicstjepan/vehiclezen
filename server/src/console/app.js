#!/usr/bin/env node
require("dotenv").config();

const { Command } = require("commander");
const program = new Command();

program.version("0.1.0").command("make [name]", "make user or vehicle");

program.parse(process.argv);
