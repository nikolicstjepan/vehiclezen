const { addVehicle, listVehicles, removeVehicle } = require("../../use-cases");

async function add(req, res) {
  try {
    const { make, model, year } = req.body;
    const posted = await addVehicle({ make, model, year: Number(year) });

    res.status(201).send({ posted });
  } catch (error) {
    console.log({ addVehicle: error });
    res.status(400).send({ error: error.message });
  }
}

async function list(req, res) {
  try {
    const { make, model, year, page = 1 } = req.query;
    const list = await listVehicles({ make, model, year: Number(year), page: Number(page) });

    res.status(200).send({ list });
  } catch (error) {
    console.log({ listVehicles: error });
    res.status(400).send({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const removed = await removeVehicle({ id });

    res.status(200).send({ removed });
  } catch (error) {
    console.log({ removeVehicle: error });
    res.status(400).send({ error: error.message });
  }
}

module.exports = {
  add,
  list,
  remove,
};
