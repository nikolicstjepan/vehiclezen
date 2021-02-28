const Jwt = require("../../Jwt");
const { findUser } = require("../../use-cases");

module.exports = async function tokenChecker(req, res, next) {
  const unauthorizedResponse = () => res.status(403).send({ error: "unauthorized" });
  try {
    const token = req.get("token");

    if (!token) {
      return unauthorizedResponse();
    }

    const dataFromToken = Jwt.verify(token);

    if (!dataFromToken || !dataFromToken.id) {
      return unauthorizedResponse();
    }

    const user = await findUser({ id: dataFromToken.id });

    if (!user) {
      return unauthorizedResponse();
    }

    next();
  } catch (error) {
    return unauthorizedResponse();
  }
};
