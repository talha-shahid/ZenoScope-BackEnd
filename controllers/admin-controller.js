const userService = require("../services/user-service");

class AdminController {
  async index(req, res) {
    //From Request Body
    const { user } = req.body;

    //From Query Params
    const search = req.query.search || "";
    const page = req.query.page || 1;

    //Query for search
    const query = {
      name: { $regex: search, $options: "i" },
    };

    //Pagination
    const ITEM_PER_PAGE = 12;
    const skip = (page - 1) * ITEM_PER_PAGE;

    //Check if user is admin
    if (user.phone !== "+923024042683") {
      res.status(401);
      return res.send("You are not authorized to view this page");
    }

    //return
    const { users, Pagination } = await userService.showAllUsers(
      query,
      ITEM_PER_PAGE,
      skip
    );
    return res.json({ users, Pagination });
  }
}

module.exports = new AdminController();
