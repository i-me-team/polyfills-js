async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 10000 } = options;

  const controller = new AbortController();
  const { signal } = controller;
  const timerId = setTimeout(() => {
    controller.abort();
  }, timeout);
  const response = await fetch(resource, { ...options, signal });
  // Cleanup task
  clearTimeout(timerId);
  return response;
}

// If the server takes more than 2 second to respond; throw and Error as Request timed out
// Usage example
fetchWithTimeout(`https://reqres.in/api/users?delay=3`, { timeout: 2000 })
  .then((resp) => resp.json())
  .then(({ data }) =>
    data.forEach((datum) =>
      console.log(`${datum.first_name} ${datum.last_name}`),
    ),
  )
  .catch((error) => {
    if (error.name === 'AbortError') {
      console.error('Request timed out');
    } else {
      console.error('Some unknown error occured');
    }
  });
