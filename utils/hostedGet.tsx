import axios from "axios";
const hostedGet = async (
  method: string,
  url: string,
  setResponse: (data: any) => void
) => {
  const { data } = await axios({
    method,
    url,
  });
  setResponse(data);
};

export default hostedGet;
