const apiPort = Number(process.env.PORT) || 8000;

export function getApiBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${apiPort}`;
}

export { apiPort };