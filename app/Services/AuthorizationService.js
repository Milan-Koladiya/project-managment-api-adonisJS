class AuthorizationService {
  verifyPermission(resource, user) {
    //   if (!resource) {
    //     throw new ResourceNotExistException();
    //   }

    console.log(resource, user);

    if (resource.user_id !== user.id) {
      throw new InvalidAccessException();
    }
  }
}

module.exports = new AuthorizationService();
