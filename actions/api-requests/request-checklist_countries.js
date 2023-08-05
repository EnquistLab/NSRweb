
import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;

export const requestCountryChecklists = async () => {
  const parseObject = {
    opts: {
      mode: "country_checklists",
    },
  };

  return await axios
    .post(apiEndPoint, parseObject, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response.data;
    });
};
