import axios from "axios";
const apiCall = async (
  method: string,
  url: string,
  setResponse: (data: any) => void,
  requestBody: string
) => {
  try {
    if (method === "post" || method === "patch") {
      const { data } = await axios({
        method,
        url,
        data: JSON.parse(requestBody),
      });
      setResponse(data);
    } else {
      const { data } = await axios({
        method,
        url,
      });
      setResponse(data);
    }
  } catch (error: any) {
    if (error.message === "Unexpected end of JSON input") {
      setResponse("Invalid request JSON, non-JSON req.bodys coming soon!");
    } else {
      setResponse(error.message);
    }
  }
};

export default apiCall;
