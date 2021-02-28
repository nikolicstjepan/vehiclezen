const { registerUser, loginUser } = require("../../use-cases");

async function register(req, res) {
  try {
    const { username, password } = req.body;
    const posted = await registerUser({ username, password });

    res.status(201).send({ posted });
  } catch (error) {
    console.log({ register: error });
    res.status(400).send({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const token = await loginUser({ username, password });

    res.status(200).send({ token });
  } catch (error) {
    console.log({ login: error });
    res.status(400).send({ error: error.message });
  }
}

module.exports = {
  register,
  login,
};
