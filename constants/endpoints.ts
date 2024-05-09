const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const EndPoints = {
  adminLogin: baseUrl + "login",
  getUsers: baseUrl + "users",
  deleteUser: baseUrl + "delete_user",
  addUser: baseUrl + "create_user",
  updateUser: baseUrl + "update_user",
  userLogin: baseUrl + "user/login",
  forgotPassword: baseUrl + "forgot_password",
  resetPassword: baseUrl + "reset-password",
  longForm: baseUrl + "templates/",
};

export default EndPoints;
