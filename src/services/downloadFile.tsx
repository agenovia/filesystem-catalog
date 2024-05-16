import { environment } from "../hooks/types";

export interface IDownloadFileRequest {
  baseURL: string;
  path: string;
  filename: string;
  env: environment;
}

const downloadFile = ({
  baseURL,
  path,
  filename,
  env,
}: IDownloadFileRequest) => {
  const endpoint = "fcs/v1/downloadFile";
  const body = { env, path };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const url = `${baseURL}${endpoint}`;
  fetch(url, requestOptions)
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      const href = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((err) => {
      return Promise.reject({ Error: "Something Went Wrong", err });
    });
};

export default downloadFile;
