// get directory listing data from ../api/listDirectory.ts
// cache results for 30 seconds -- this ensures further rate limiting
// will not hit server cache again until 30 seconds has passed
// limits cases where user flips between two locations to cross-check
// possibly provide a utility to perform things like: directory comparisons
import { useQuery } from "@tanstack/react-query";
import { IListDirectoryRequest, IListDirectoryResponse } from "./types";

const useListDirectory = ({ url, path, env }: IListDirectoryRequest) => {
  const endpoint = import.meta.env.VITE_LISTDIRECTORY_ENDPOINT;
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

  const {
    data: directoryListing,
    error,
    isPending,
  } = useQuery({
    queryKey: [env, path],
    queryFn: fetchDirListing,
  });

  return { directoryListing, error, isPending };
};

export default useListDirectory;
