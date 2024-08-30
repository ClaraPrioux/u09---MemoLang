import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  secret_key: process.env.SECRET_KEY || "defaultsecretkey",
};

export default config;
