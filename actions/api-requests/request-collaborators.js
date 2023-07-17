import axios from "axios";

const apiEndPoint = process.env.apiEndPoint;

export const requestCollaborators = async () => {
  const parseObject = {
    opts: {
      mode: "collaborators",
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
