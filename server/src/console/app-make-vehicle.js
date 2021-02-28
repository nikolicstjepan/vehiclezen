#!/usr/bin/env node
const { addVehicle } = require("../use-cases");

const { Command } = require("commander"); // (normal include)
const program = new Command();

program.option("-ma, --make <make>", "vehicles make");
program.option("-mo, --model <model>", "vehicles model");
program.option("-y, --year <year>", "vehicles year");

program.parse(process.argv);

const options = program.opts();

async function app({ make, model, year }) {
  try {
    await addVehicle({ make, model, year: Number(year) });
    console.log("Vehicle added!");
  } catch (error) {
    console.log(error.message);
  }

  process.exit();
}

app(options);
