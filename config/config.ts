export const config = {
  jwt: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  },
  googleApi: {
    googleApiKey: process.env.GOOGLE_API_KEY || 'secret',
  },
};