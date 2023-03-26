const UserModel = require("../models/user-model");

class UserService {
  async findUser(filter) {
    const user = await UserModel.findOne(filter);
    return user;
  }

  async createUser(data) {
    const user = await UserModel.create(data);
    return user;
  }

  async showAllUsers(query, ITEM_PER_PAGE, skip) {
    const count = await UserModel.countDocuments(query);

    const users = await UserModel.find(query).limit(ITEM_PER_PAGE).skip(skip);

    const pageCount = Math.ceil(count / ITEM_PER_PAGE);

    return {
      users,
      Pagination: {
        count,
        pageCount,
        skip,
      },
    };
  }
}

module.exports = new UserService();
