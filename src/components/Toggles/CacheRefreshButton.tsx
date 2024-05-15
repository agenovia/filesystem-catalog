import { Box, IconButton, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";

interface Props {
  onCachRefresh: () => void;
  isPending: boolean;
}

const CacheRefreshButton = ({ onCachRefresh, isPending }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCachRefresh = () => {
    !isRefreshing && setIsRefreshing(true);
    onCachRefresh();
  };

  // UX: show a slight delay
  // actual refresh takes less than 50ms
  // but users expect a certain delay to
  // feel like something is "working"
  useEffect(() => {
    setTimeout(() => {
      isRefreshing && setIsRefreshing(false);
    }, 750);
  }, [isRefreshing]);

  return (
    <Box userSelect={"none"}>
      {isRefreshing ? (
        <Spinner mr={2} mt={1} speed="0.7s" />
      ) : (
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
