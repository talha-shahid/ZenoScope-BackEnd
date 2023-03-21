const userService = require("../services/user-service");

class AdminController {
  async index(req, res) {
    const { user } = req.body;
    console.log(user.phone);
    if (user.phone !== "+923024042683") {
      res.status(401);
      return res.send("You are not authorized to view this page");
    }
    const users = await userService.showAllUsers();
    return res.json(users);
  }
}

module.exports = new AdminController();
