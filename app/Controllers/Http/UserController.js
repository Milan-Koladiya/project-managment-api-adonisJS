"use strict";

const UserModel = use("App/Models/User");

class UserController {
  async Resister({ request, response }) {
    try {
      const { email, password } = request.all();
      console.log("email, password  => ", email, password);
      const userCreate = await UserModel.create({
        email,
        password,
        username: email,
      });
      return userCreate;
    } catch (error) {
      console.log("error => ", error);
      response.json({
        success: "false",
        error: error.message,
      });
    }
  }

  async Login({ request, response, auth }) {
    try {
      const { email, password } = request.all();
      const token = await auth.attempt(email, password);
      console.log("token => ", token);
      return token;
    } catch (error) {
      response.json({ success: "false", error: error.message });
    }
  }
}

module.exports = UserController;
