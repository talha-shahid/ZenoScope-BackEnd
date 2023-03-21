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

  async showAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();
