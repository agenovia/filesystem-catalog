import {
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
} from "@chakra-ui/react";
import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";

export type environment = "Mirror" | "Archive";

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

  const infoPopover =
    currentBranch === "Mirror" ? (
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

  const handleToggleEnvironment = () => {
    const toggleTo =
      currentBranch === "Mirror"
        ? ("Archive" as environment)
        : ("Mirror" as environment);
    setCurrentBranch(toggleTo);
    onToggleBranch(toggleTo);
  };

  return (
    <HStack>
      <Button
        title="Switch branch"
        shadow={"md"}
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
