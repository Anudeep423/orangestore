// http://localhost:8000/api/updateUser/605f24758dc7b88adc29cec6
import API from "../Backend"

export const updateProfile = (userID,data) => {

    return fetch(`${API}/updateUser/${userID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json"
      },
      body: data
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  }