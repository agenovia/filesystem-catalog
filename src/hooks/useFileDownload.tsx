// get directory listing data from ../api/listDirectory.ts
// cache results for 30 seconds -- this ensures further rate limiting
// will not hit server cache again until 30 seconds has passed
// limits cases where user flips between two locations to cross-check
// possibly provide a utility to perform things like: directory comparisons
import { useQuery } from "@tanstack/react-query";
import { IDownloadFileRequest } from "./types";

const useDownloadFile = ({ url, path, env }: IDownloadFileRequest) => {
  const endpoint = import.meta.env.VITE_FILEDOWNLOAD_ENDPOINT;
  const body = { env, path };

  const fetchDirListing = async () => {
    const response = await fetch(`${url}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // return (await response.json()) as IListDirectoryResponse[];
    return await response.json();
  };

  const { data, error, isPending } = useQuery({
    queryKey: [env, path],
    queryFn: fetchDirListing,
  });

  return { data, error, isPending };
};

export default useDownloadFile;
