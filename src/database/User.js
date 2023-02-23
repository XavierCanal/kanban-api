const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllUsers = () => {
    try {
      let users = DB.users;
      return users;
    } catch (error) {
      throw { status: 500, message: error };
    }
  };

  const createNewUser = (newUser) => {
    try {
      const isAlreadyAdded =
        DB.users.findIndex((user) => user.username === newUser.username) > -1;
  
      if (isAlreadyAdded) {
        throw {
          status: 400,
          message: `Product with the username '${newUser.username}' already exists`,
        };
      }
  
      DB.users.push(newUser);
      saveToDatabase(DB);
  
      return newUser;
    } catch (error) {
      throw { status: 500, message: error?.message || error };
    }
  };
  module.exports = {
    getAllUsers,
    createNewUser
  };
  