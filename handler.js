async function handleRequest(request) {
  return fetch(request);
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
