const expiresIn = 60 * 60; // Token expires in 1 hour (3600 seconds)
export const expirationTime = Math.floor(Date.now() / 1000) + expiresIn;
