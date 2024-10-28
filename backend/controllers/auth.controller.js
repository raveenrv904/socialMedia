const register = async (req, res) => {
  res.send("Register User");
};

const login = async (req, res) => {
  res.send("Login User");
};

const getUserProfile = async (req, res) => {
  res.send("User Profile");
};

const logout = async (req, res) => {
  res.send("Logout user");
};

module.exports = {
  register,
  login,
  logout,
  getUserProfile,
};
