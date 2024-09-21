/**
 * For a web application, fetching API data is a common task.
 * But the API calls might fail because of Network problems. Usually we could show a screen for Network Error and ask users to retry.
 * One approach to handle this is auto retry when network error occurs.
 *
 * You are asked to create a fetchWithAutoRetry(fetcher, count), which automatically fetch again when error happens, until the maximum count is met.
 */
export function fetchWithAutoRetry(fetcher, maxRetryCount) {
  return (async function () {
    let retryCount = 0;
    while (true) {
      try {
        return await fetcher();
      } catch (error) {
        if (++retryCount > maxRetryCount) {
          throw error;
        }
      }
    }
  })();
}
