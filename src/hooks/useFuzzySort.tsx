import fuzzysort from "fuzzysort";
import { IListDirectoryResponse } from "./interfaces";

interface Props {
  query: string;
  files: IListDirectoryResponse[] | undefined;
}

const useFuzzySort = ({ query, files }: Props) => {
  if (!files) return;
  if (!query) return files;

  const result = fuzzysort.go(query, files, {
    key: "name",
    limit: 50,
    threshold: -1000,
  });
  const ret = result.map((x) => x.obj);

  return ret;
};

export default useFuzzySort;
