const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const auth = require("../authentication/middleware");
const router = new Router();

router.post("/user", async function(request, response, next) {
  try {
    const user = await User.create({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      username: request.body.username,
      email: request.body.email,
      password: bcrypt.hashSync(request.body.password, 10)
    });
    response.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

router.put("/user/:id", async (request, response) => {
  try {
    const match = await User.findByPk(request.params.id);
    const finished = await match.update(request.body);
    response.status(201).send(finished);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
