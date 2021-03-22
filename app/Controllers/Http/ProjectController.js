"use strict";

const ProjectModel = use("App/Models/Project");
const AuthorizationService = use("App/Services/AuthorizationService");

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

  async destroy({ auth, request, response, params }) {
    try {
      const user = await auth.getUser();
      const { id } = params;
      const project = await ProjectModel.find(id);
      AuthorizationService.verifyPermission(project, user);
      console.log("id => ", id);
      const deleteProject = await project.delete();
      response.json({ success: "false", deleteProject });
    } catch (error) {
      response.json({
        success: "false",
        error: error.message,
      });
    }
  }
}

module.exports = ProjectController;
