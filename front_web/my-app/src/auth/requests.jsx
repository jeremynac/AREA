var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
 'username': 'test',
'password': 'test' 
});


export const login = async (loginUsername, loginPassword) => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: process.env.SERVER_URL + "/login",
    }).then((res) => {
      return true
      console.log(res);
    }).catch((e)=>{
      console.log(e)
      return false
    });
  }

export const getUser = () => {
        Axios({
          method: "GET",
          withCredentials: true,
          url: process.env.SERVER_URL + "/user",
        }).then((res) => {
          setData(res.data);
          console.log(res.data);
        });
      };

export const register = (registerUsername, registerPassword) => {
        Axios({
          method: "POST",
          data: {
            username: registerUsername,
            password: registerPassword,
          },
          withCredentials: true,
          url: process.env.SERVER_URL + "/register",
        })
        .then((res) => {
          console.log(res)
          return true
        })
        .catch((e)=>{
          return false
        })
      }
