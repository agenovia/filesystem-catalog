import { Box, IconButton, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";

interface Props {
  onCachRefresh: (updateTime: number) => void;
  isPending: boolean;
}

const CacheRefreshButton = ({ onCachRefresh, isPending }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCachRefresh = () => {
    const now = Date.now();
    setIsRefreshing(true);
    onCachRefresh(now);
  };

  // UX: show a slight delay
  // actual refresh takes less than 50ms
  // but users expect a certain delay to
  // feel like something is "working"
  useEffect(() => {
    setTimeout(() => {
      setIsRefreshing(false);
    }, 750);
  }, [isRefreshing]);

  return (
    <Box userSelect={"none"}>
      {isRefreshing && <Spinner mr={2} mt={1} speed="0.7s" />}
      {!isRefreshing && (
        <IconButton
          icon={<MdOutlineRefresh />}
          aria-label="refresh-cache"
          title="Refresh"
          onClick={handleCachRefresh}
          shadow={"lg"}
          rounded="full"
          isDisabled={isPending}
        />
      )}
    </Box>
  );
};

export default CacheRefreshButton;
