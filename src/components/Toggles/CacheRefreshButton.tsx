import { IconButton } from "@chakra-ui/react";
import { MdOutlineRefresh } from "react-icons/md";

interface Props {
  onCachRefresh: (updateTime: number) => void;
}

const CacheRefreshButton = ({ onCachRefresh }: Props) => {
  const handleCachRefresh = () => {
    const now = Date.now();
    onCachRefresh(now);
  };

  return (
    <IconButton
      icon={<MdOutlineRefresh />}
      aria-label="refresh-cache"
      title="Refresh"
      onClick={handleCachRefresh}
      shadow={"lg"}
      rounded="full"
    />
  );
};

export default CacheRefreshButton;
