export type environment = "mirror" | "archive";

export interface IListDirectoryRequest {
  url: string;
  path: string;
  env: environment;
}

export interface IListDirectoryResponse {
  name: string;
  parentPath: string;
  fullPath: string;
  relativePath: string;
  backPath: string;
  isDirectory: boolean;
  isFile: boolean;
  stat: {
    mtime: number;
    ctime: number;
    size: number;
  };
}

export interface IDownloadFileRequest extends IListDirectoryRequest {}
