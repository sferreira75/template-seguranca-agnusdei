async function handleRequest(request) {
  // Faz a requisição original
  const response = await fetch(request);
  
  // Cria uma cópia dos headers para podermos modificar
  const newHeaders = new Headers(response.headers);

  // --- INJEÇÃO DE SEGURANÇA AGNUSDEI ---
  newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  newHeaders.set("Content-Security-Policy", "default-src 'self';");
  newHeaders.set("X-Content-Type-Options", "nosniff");
  newHeaders.set("X-Frame-Options", "DENY");
  // -------------------------------------

  // Retorna a resposta com os novos headers de segurança
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
