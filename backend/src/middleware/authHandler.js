export default async function authHandler(headers) {
  const validUntil = Date.now() * 2;

  return {
    data: {},
    validUntil,
  };
}
