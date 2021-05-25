/**
 * EasyHTTP Library
 * Library for making HTTP requests
 *
 * @version 3.0.0
 * @author  Luis Capelletto
 * @license MIT
 *
 **/

export const EasyHTTP = {
  // Make an HTTP GET Request
  get: async url => await fetch(url).then(response => response.json()),

  // Make an HTTP POST Request
  post: async (url, data) => {
    const responseData = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(response => response.json());

    return responseData;
  },

  // Make an HTTP PUT Request
  async put(url, data) {
    const responseData = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(response => response.json());

    return responseData;
  },

  // Make an HTTP DELETE Request
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    const resData = await "Resource Deleted..";
    return resData;
  },
};
