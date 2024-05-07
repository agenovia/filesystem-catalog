import {
  Box,
  Button,
  HStack,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { environment } from "../../hooks/types";

interface Props {
  environmentColor: string;
  initialEnvironment: environment;
  onToggleEnvironment: (env: environment) => void;
}

const EnvironmentToggle = ({
  environmentColor,
  initialEnvironment,
  onToggleEnvironment: onToggleBranch,
}: Props) => {
  const [currentBranch, setCurrentBranch] = useState(initialEnvironment);

  const infoTextStyle = {
    fontWeight: "bold",
    color: environmentColor,
    whiteSpace: "nowrap",
    overflow: "hidden",
  };

  // UX: quick explainer on environments as a clickable tooltip
  const infoPopover =
    currentBranch === "mirror" ? (
      <Text>
        You are currently viewing the{" "}
        <Text as="i" sx={infoTextStyle}>
          Mirror
        </Text>{" "}
        environment. The files in view are a one-to-one replication of the
        remote file servers.
      </Text>
    ) : (
      <Text>
        You are currently viewing the{" "}
        <Text as="i" sx={infoTextStyle}>
          Archive
        </Text>{" "}
        environment. This environment contains both new files in the Mirror
        environment and historical files that are no longer present in the
        Mirror environment; all files are pre-compressed and will be transmitted
        as-is. For the best experience,{" "}
        <Link color="teal.500" href="https://www.7-zip.org/" isExternal>
          install 7-Zip
        </Link>
        .
      </Text>
    );

  // UX: feedback on environment changes
  const toast = useToast();
  useEffect(() => {
    toast({
      position: "top",
      duration: 1200,
      render: () => (
        <Box mt={102} p={4} bg="white" shadow={"md"} borderRadius={10}>
          Switched to the{" "}
          <Text color={environmentColor} as="b">
            {currentBranch.toUpperCase()}
          </Text>{" "}
          environment
        </Box>
      ),
    });
  }, [currentBranch]);

  // track changes to environment and switch when invoked
  const handleToggleEnvironment = () => {
    const toggleTo =
      currentBranch === "mirror"
        ? ("archive" as environment)
        : ("mirror" as environment);
    setCurrentBranch(toggleTo);
    onToggleBranch(toggleTo);
  };

  return (
    <HStack>
      <Button
        title="Switch environment"
        shadow={"lg"}
        rounded="full"
        onClick={handleToggleEnvironment}
        w="80px"
      >
        <Text as="b" color={environmentColor} p={2}>
          {currentBranch}
        </Text>
      </Button>
      {/* <Tooltip label="Phone number" fontSize="md" placement="auto-end">
        <MdInfoOutline />
      </Tooltip> */}
      <Popover placement="top-start">
        <PopoverTrigger>
          <IconButton
            rounded="full"
            icon={<MdInfoOutline />}
            aria-label={"info"}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody fontWeight="normal" fontSize="12px">
            {infoPopover}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </HStack>
  );
};

export default EnvironmentToggle;
