import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import BranchSelect from "./BranchSelect";
import CacheRefreshButton from "./CacheRefreshButton";

const BranchViewer = () => {
  return (
    <>
      <VStack spacing={2}>
        <Box p={2} borderRadius={10} backgroundColor="gray.100">
          <HStack justifyContent={"space-around"} justifyItems={"space-around"}>
            <Text>Current Branch:</Text>
            {
              <BranchSelect
                onToggleBranch={(branch) =>
                  console.log(`Switching to ${branch}`)
                }
              />
            }
          </HStack>
        </Box>
        <Box p={2} borderRadius={10} backgroundColor="gray.100">
          <CacheRefreshButton onCachRefresh={(e) => console.log(e)} />
        </Box>
      </VStack>
    </>
  );
};

export default BranchViewer;
