import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import CacheRefreshButton from "./CacheRefreshButton";
import EnvironmentToggle from "./EnvironmentToggle";

interface Props {
  onSwitchEnvironment: (branch: string) => void;
  onCacheRefresh: (timestamp: number) => void;
}

const TreeViewer = ({ onSwitchEnvironment, onCacheRefresh }: Props) => {
  const boxStyle = {
    width: "100%",
    backgroundColor: "gray.100",
    borderRadius: 10,
    padding: 2,
  };

  return (
    <>
      <VStack spacing={2}>
        <Box sx={boxStyle}>
          <HStack justifyContent={"space-around"}>
            <Text>Current Branch:</Text>
            <EnvironmentToggle
              onToggleBranch={(branch) => onSwitchEnvironment(branch)}
            />
          </HStack>
        </Box>
        <Box sx={boxStyle}>
          <HStack>
            <CacheRefreshButton
              onCachRefresh={(timestamp) => onCacheRefresh(timestamp)}
            />
          </HStack>
        </Box>
      </VStack>
    </>
  );
};

export default TreeViewer;
