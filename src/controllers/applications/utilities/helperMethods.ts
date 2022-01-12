import axios from "axios";

const config = {
  headers: {
    Authorization: `Bearer ${process.env.APP_API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export async function createNewApp(newApp) {
  const result = await axios.post(
    `${process.env.AUTH_APP_DOMAIN}/applications?appId=${process.env.APP_ID}`,
    newApp,
    config
  );
  return result.data.data;
}
