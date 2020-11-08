const admin = require("./firebase-service");

const authHandler = (req) => {
  const tokenWithBearer = req.headers.authorization;

  if (tokenWithBearer) {
    const token = tokenWithBearer.split(" ")[1];
    if (!token) {
      return null;
    }
    if (
      token &&
      (token == "undefined" || token === "ANON" || token === "null")
    ) {
      return null;
    }
    if (token) {
      return veryfyAuthToken(token);
    }
  } else {
    return null;
  }
};

const veryfyAuthToken = async (token) => {
  try {
    const user = await admin.auth().verifyIdToken(token);

    return user;
  } catch (error) {
    console.log("error", error);
    throw new Error("👮🏽‍♂️ Invalid Token");
  }
};

module.exports = authHandler;
