#!/usr/bin/env node
const { registerUser } = require("../use-cases");

const { Command } = require("commander"); // (normal include)
const program = new Command();

program.option("-u, --username <username>", "users username");
program.option("-p, --password <password>", "users password");

program.parse(process.argv);

const options = program.opts();

async function app({ username, password }) {
  try {
    await registerUser({ username, password });
    console.log("User registered!");
  } catch (error) {
    console.log(error.message);
  }

  process.exit();
}

app(options);
