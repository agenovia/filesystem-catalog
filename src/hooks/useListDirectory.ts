// get directory listing data from ../api/listDirectory.ts
// cache results for 30 seconds -- this ensures further rate limiting
// will not hit server cache again until 30 seconds has passed
// limits cases where user flips between two locations to cross-check
// possibly provide a utility to perform things like: directory comparisons
import { useQuery } from "@tanstack/react-query";

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

const useListDirectory = ({ url, path, env }: IListDirectoryRequest) => {
  const endpoint = "api/listDirectory";
  const body = { env: env, path: path };

  const fetchDirListing = async () => {
    const response = await fetch(`${url}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return (await response.json()) as IListDirectoryResponse[];
  };

  const { data, error, isLoading } = useQuery({
    queryKey: [env, path],
    queryFn: fetchDirListing,
  });

  return { data, error, isLoading };
};

export default useListDirectory;
