import createUser from "./createUser";
import deleteUser from "./deleteUser";
import getAllUsers from "./getAllUsers";
import updateUser from "./updateUser";
import getUser from "./getUser";
const UsersController = (repository) => ({
  getAllUsers: getAllUsers(repository),
  getUser: getUser(repository),
  createUser: createUser(repository),
  updateUser: updateUser(repository),
  deleteUser: deleteUser(repository),
});
export default UsersController;
