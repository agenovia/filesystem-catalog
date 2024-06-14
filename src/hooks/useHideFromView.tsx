import { hiddenSections } from "../components/Display/Summary";
import { IListDirectoryResponse } from "./interfaces";

interface Props {
  hidden: hiddenSections;
  files: IListDirectoryResponse[] | undefined;
}

const useHideFromView = ({ hidden, files }: Props) => {
  if (!files) return;

  const isVisible = (item: IListDirectoryResponse) => {
    if (hidden.files && item.isFile) return false;
    if (hidden.directories && item.isDirectory) return false;

    return true;
  };

  return files.filter((f) => isVisible(f));
};

export default useHideFromView;
