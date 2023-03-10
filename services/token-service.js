const jwt = require("jsonwebtoken");
const refreshModel = require("../models/refresh-model");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
  //---Generate Tokens---//
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }
  //---Store Refresh Tokens---//
  async storeRefreshToken(token, userId) {
    try {
      await refreshModel.create({
        token,
        userId,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  //---Verify Access Token---//
  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }

  //---Verify Refresh Token---//
  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenSecret);
  }

  //---Find Refresh Token---//
  async findRefreshToken(userId, refreshToken) {
    return await refreshModel.findOne({
      userId: userId,
      token: refreshToken,
    });
  }

  //---Update Refresh Token---//
  async updateRefreshToken(userId, refreshToken) {
    return await refreshModel.updateOne(
      { userId: userId },
      { token: refreshToken }
    );
  }

  //---Remove Token---//
  async removeToken(refreshToken) {
    return await refreshModel.deleteOne({ token: refreshToken });
  }
}

module.exports = new TokenService();
