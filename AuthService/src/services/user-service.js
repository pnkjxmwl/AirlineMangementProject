const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("something wrong in service layer");
      console.log(error.name);
      throw error;
    }
  }
  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getByEmail(email);

      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("not matched");
        throw { error: "incorrect pass" };
      }

      const newJWT = this.createToken({
        email: user.email,
        id: user.id,
      });
      return newJWT;
    } catch (error) {
      console.log("something wrong in signin");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("something wrong in token creation");
      throw error;
    }
  }
  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "invalid token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "noo user with this token exist" };
      }

      return user.id;
    } catch (error) {
      console.log("something wrong in auth process");
      throw error;
    }
  }
  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("something wrong in auth process");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("something wrong in verify token");
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = UserService;
