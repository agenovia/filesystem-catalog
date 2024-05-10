import { Box, Center, HStack, Icon, Tag, Text } from "@chakra-ui/react";
import { useState } from "react";
import { GoFile, GoFileDirectory } from "react-icons/go";
import { ImEyeBlocked } from "react-icons/im";
import { IListDirectoryResponse } from "../../hooks/types";

interface Props {
  directoryEntries: IListDirectoryResponse[] | undefined;
  envColor: string;
  onHideFromView: (hiddenTypes: hiddenSections) => void;
}

type hidden = "files" | "directories";

export type hiddenSections = {
  files: boolean;
  directories: boolean;
};

export const defaultHiddenTypes = {
  files: false,
  directories: false,
};

const Summary = ({ directoryEntries, envColor, onHideFromView }: Props) => {
  const fileCount = directoryEntries?.filter((x) => x.isFile).length || 0;
  const dirCount = directoryEntries?.filter((x) => x.isDirectory).length || 0;
  const [hiddenToggle, setHiddenToggle] = useState(defaultHiddenTypes);

  const outerStackStyle = {
    alignContent: "center",
    justifyContent: "space-around",
    gap: 1,
    p: 2,
    mt: -2,
    roundedBottom: "full",
    w: "15vw",
    minW: "200px",
    boxShadow: "md",
    borderWidth: "1px",
    bgColor: "white",
    borderColor: envColor,
    userSelect: "none",
  };

  const innerStackStyle = {
    alignContent: "center",
    justifyContent: "flex-start",
    gap: 2,
    borderRadius: 10,
    minW: "60px",
    maxW: "100px",
  };

  const iconStyle = {
    boxSize: "15px",
  };

  const textStyle = {
    fontSize: "12px",
    fontWeight: "700",
    pr: 2,
  };

  const hiddenEyeStyle = {
    opacity: 0.75,
    position: "absolute",
    mt: 1,
    ml: 6,
    fontSize: "15px",
  };

  const handleHideFromView = (hidden: hidden) => {
    if (hidden === "files") {
      var ret = { ...hiddenToggle, files: !hiddenToggle["files"] };
      setHiddenToggle(ret);
    } else {
      var ret = {
        ...hiddenToggle,
        directories: !hiddenToggle["directories"],
      };
      setHiddenToggle(ret);
    }
    onHideFromView(ret);
  };

  const getTagTitle = (hiddenType: hidden) => {
    if (hiddenType == "files") {
      const hidden = hiddenToggle.files ? "(hidden)" : "";
      const plural = fileCount === 1 ? "file" : "files";
      const n = fileCount.toString();
      return [n, plural, hidden].join(" ");
    }
    if (hiddenType == "directories") {
      const hidden = hiddenToggle.directories ? "(hidden)" : "";
      const plural = dirCount === 1 ? "directory" : "directories";
      const n = dirCount.toString();
      return [n, plural, hidden].join(" ");
    }
  };

  return (
    <Center>
      <HStack sx={outerStackStyle}>
        <Box>
          {hiddenToggle["files"] && (
            <Icon as={ImEyeBlocked} sx={hiddenEyeStyle} />
          )}
          <HStack
            sx={innerStackStyle}
            bgColor="gray.200"
            title={getTagTitle("files")}
            opacity={hiddenToggle["files"] ? 0.1 : 1.0}
            onClick={() => handleHideFromView("files")}
          >
            <Tag bgColor="gray.100">
              <Icon sx={iconStyle} as={GoFile} />
            </Tag>
            <Text sx={textStyle}>{fileCount}</Text>
          </HStack>
        </Box>
        <Box>
          {hiddenToggle["directories"] && (
            <Icon as={ImEyeBlocked} sx={hiddenEyeStyle} />
          )}
          <HStack
            sx={innerStackStyle}
            bgColor="floralwhite"
            title={getTagTitle("directories")}
            opacity={hiddenToggle["directories"] ? 0.1 : 1.0}
            onClick={() => handleHideFromView("directories")}
          >
            <Tag bgColor="papayawhip">
              <Icon sx={iconStyle} as={GoFileDirectory} />
            </Tag>
            <Text sx={textStyle}>{dirCount}</Text>
          </HStack>
        </Box>
      </HStack>
    </Center>
  );
};

export default Summary;
