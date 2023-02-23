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
          message: `User with the username '${newUser.username}' already exists`,
        };
      }
  
      DB.users.push(newUser);
      saveToDatabase(DB);
  
      return newUser;
    } catch (error) {
      throw { status: 500, message: error?.message || error };
    }
  };

  const getTasksFromUser = (username, status, date) => {
    try {
      if (status && date) {
        var tasks = [];
        DB.tasks.filter((task) => {
         if(task.user === username && task.status === status && compareTime(task.date, date)){
           tasks.push(task);
         }
       });
      } else {
        if(status) {
          var tasks = [];
           DB.tasks.filter((task) => {
            if(task.user === username && task.status === status){
              tasks.push(task);
            }
          });
        } else if (date) {
          var tasks = [];
          DB.tasks.filter((task) => {
           if(task.user === username && compareTime(task.date, date)){
             tasks.push(task);
           }
         });
        } else {
          var tasks = DB.tasks.filter((task) => task.user === username);
        }
      }
      if (!tasks) {
        throw {
          status: 400,
          message: `Can't find user with the username '${username}'`,
        };
      }
  
      return tasks;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

function compareTime(time1, time2) {
    let date1 = new Date(time1).getTime();
    let date2 = new Date(time2).getTime();
    return (date1 < date2); // true if time1 is later
}
  
  module.exports = {
    getAllUsers,
    createNewUser,
    getTasksFromUser
  };
  