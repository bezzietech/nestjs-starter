export function setupServer() {
  const port = parseInt(process.env.PORT, 10) || 3000;
  const host = process.env.HOST || '0.0.0.0';
  return { port, host };
}
