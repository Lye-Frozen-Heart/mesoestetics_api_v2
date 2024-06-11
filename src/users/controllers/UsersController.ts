import register from "./register";
import deleteUser from "./deleteUser";
import getAllUsers from "./getAllUsers";
import updateUser from "./updateUser";
import login from "./login";
const UsersController = (repository) => ({
  getAllUsers: getAllUsers(repository),
  login: login(repository), //Login y es un POST
  register: register(repository), //Register y es un POST
  updateUser: updateUser(repository),
  deleteUser: deleteUser(repository),
});
export default UsersController;
