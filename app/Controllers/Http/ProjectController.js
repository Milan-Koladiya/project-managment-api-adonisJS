"use strict";

const ProjectModel = use("App/Models/Project");

class ProjectController {
  async getLoginUser({ request, response, auth }) {
    try {
      const currentUser = await auth.getUser();
      const projectOfUser = await currentUser.project().fetch();
      response.json({
        success: "true",
        projectOfUser,
      });
    } catch (error) {
      response.json({
        success: "false",
        error: error.message,
      });
    }
  }

  async createProject({ request, response, auth }) {
    try {
      const { title, body } = request.all();
      const currentUser = await auth.getUser();
      const createProject = await ProjectModel.create({
        title,
        body,
        user_id: currentUser.id,
      });
      response.json({ success: "false", createProject });
    } catch (error) {
      response.json({
        success: "false",
        error: error.message,
      });
    }
  }
}

module.exports = ProjectController;
