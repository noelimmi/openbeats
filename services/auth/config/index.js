export const config = {
  mongoURI_DEV: "mongodb+srv://obs-db:openbeats%40123@obs-db-prijj.mongodb.net/obs-db",
  jwtSecret: "WeAreAwesome",
  saltRound: 10,
  support: {
    email: "openbeatsyag@gmail.com",
    password: "9Ve7nQr4sZDd=5mYW9_r"
  },
  port: {
    dev: 2001,
    prod: 2000
  },
  corebaseurl: {
    dev: "http://localhost:3000",
    prod: "http://obs-core:2000"
  },
  isDev: false
}