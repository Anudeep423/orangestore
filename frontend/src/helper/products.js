import API from "../Backend"

export const getUsers = () => {
    return fetch(`${API}/getAllUsers`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const getAllProduct = () => {
    return fetch(`${API}/getAllProducts`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const updateProducts = (productID,data) => {
    const id = JSON.stringify(productID)
    console.log("PRODUCTID",productID)
    return fetch(`${API}/updateProduct/${productID}`, {
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

  export const uploadProduct = (data) => {
    return fetch(`${API}/create/product`, {
      method: "POST",
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

  export const deleteProduct = (productId) => {
    console.log(productId)
    return fetch(`${API}/deleteProduct/${productId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };