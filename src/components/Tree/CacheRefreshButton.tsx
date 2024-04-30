import { HStack, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";

interface Props {
  onCachRefresh: (updateTime: number) => void;
}

const CacheRefreshButton = ({ onCachRefresh }: Props) => {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const handleCachRefresh = () => {
    const now = Date.now();
    setLastUpdate(now);
    onCachRefresh(now);
  };

  const getISODate = () => {
    const date = new Date(lastUpdate);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return date.toLocaleString("en-US", { timeZone: tz });
  };

  return (
    <HStack justify="space-evenly" w="100%">
      <Text fontSize="sm">{`Last updated: ${getISODate()}`}</Text>
      <IconButton
        icon={<MdOutlineRefresh />}
        aria-label="refresh-cache"
        title="Refresh the file cache"
        onClick={handleCachRefresh}
        shadow={"lg"}
        rounded="full"
      />
    </HStack>
  );
};

export default CacheRefreshButton;
