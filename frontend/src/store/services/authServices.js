const authServices = () => {

  if (localStorage.getItem('token') && localStorage.getItem('userDetail')) {
    const userToken = localStorage.getItem('token');

    const userDetail=localStorage.getItem('userDetail');
    const userDetailJson = JSON.parse(userDetail);
    const username = userDetailJson.username;

    return {    
      userToken: userToken,
      username: username,
    }
  }
  
  return (
    <div>
      <h4>Please Login</h4>
    </div>
  )
 
}

export default authServices
