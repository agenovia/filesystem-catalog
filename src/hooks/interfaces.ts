export type environment = "mirror" | "archive";

export interface IListDirectoryRequest {
  url: string;
  path: string;
  env: environment;
}

export interface IDownloadFileRequest extends IListDirectoryRequest {}

export interface IListDirectoryResponse {
  name: string;
  relativePath: string;
  isDirectory: boolean;
  isFile: boolean;
  env: {
    name: string;
    workingDirectory: string;
  };
  stat: {
    mtime: number;
    ctime: number;
    size: number;
  };
}
