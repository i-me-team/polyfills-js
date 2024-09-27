// URL to hit: https://reqres.in/api/users/2

const originalFetch = window.fetch;

window.requestInterceptor = (...args) => {
  const id = 2;
  args[0] = `${args[0]}${id}`;
  return args;
};

window.responseInterceptor = async (response) => {
  const data = await response.json();
  return data;
};

window.fetch = async (...args) => {
  // Intercept the request and append id to it
  const updatedArgs = window.requestInterceptor(...args);
  // Make fetch call
  const response = await originalFetch(...updatedArgs);
  // Intercept the response and convert it to json format for usage inside code
  const data = await window.responseInterceptor(response);
  // return the data
  return data;
};

// Usage example
fetch('https://reqres.in/api/users/').then(({ data }) =>
  console.log(`${data.first_name} ${data.last_name}`),
);
