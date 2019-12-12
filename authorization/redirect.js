$(document).on("click", "#get-token", async function() {
  const url = window.location.href;
  const userToken = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];;
  console.log(userToken);
  const username = getCookie("username");
  console.log(username);
  try {
    const result1 = await axios({
      method: "post",
      url: "http://localhost:3000/user/save_token",
      data: {
        "data": {
          "user": username,
          "token": userToken
        }
      }
    });
    const result2 = await axios({
      method: "post",
      url: "http://localhost:3000/private/store_playlist",
      data: {
        "data": {
          "user": username,
          "token": userToken
        }
      }
    });
    console.log(result1, result2);
  } catch (error) {
    console.log(error);
  }
});

//function to get a cookie, reference https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
