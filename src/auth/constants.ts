export const jwtConstants = {
  pk: (() => {
    const splitPem = process.env.CLERK_JWT_VERIFICATION_KEY.match(/.{1,64}/g);
    const publicKey = `-----BEGIN PUBLIC KEY-----
${splitPem.join('\n')}
-----END PUBLIC KEY-----`;
    return publicKey;
  })(),
};
