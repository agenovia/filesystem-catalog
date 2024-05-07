import { environment } from "../hooks/types";

export interface IDownloadFileRequest {
  url: string;
  path: string;
  env: environment;
}

const downloadFile = ({ url, path, env }: IDownloadFileRequest) => {
  const endpoint = "api/downloadFile";
  const body = { env, path };

  const getFile = async () => {
    const response = await fetch(`${url}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      body: JSON.stringify(body),
    });
    return response;
  };

  getFile();
  //   return await response.json();
};

export default downloadFile;
