module.exports = async function (req, res, next) {
  try {
    next();
  } catch (error) {
    return res.status(401).json({ message: "You are not Admin" });
  }
};
