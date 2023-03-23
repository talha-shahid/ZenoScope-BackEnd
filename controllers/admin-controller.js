const userService = require("../services/user-service");

class AdminController {
  async index(req, res) {
    const { user } = req.body;
    const search = req.query.search || "";
    const query = {
      name: { $regex: search, $options: "i" },
    };

    if (user.phone !== "+923024042683") {
      res.status(401);
      return res.send("You are not authorized to view this page");
    }
    const users = await userService.showAllUsers(query);
    return res.json(users);
  }
}

module.exports = new AdminController();
