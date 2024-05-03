// This is now implementation only
// we organize layout here, but we define presentation in the cards

import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaRegFolderOpen } from "react-icons/fa";
import { FaRegFileLines } from "react-icons/fa6";
import { IoIosReturnLeft, IoMdDownload } from "react-icons/io";
import { IListDirectoryResponse } from "../../hooks/useListDirectory";
import { MdOutlineHome } from "react-icons/md";

interface ViewerProps {
  directoryEntries: IListDirectoryResponse[] | undefined;
  onOpenDirectory: (path: string) => void;
}

interface CardProps {
  directoryEntry: IListDirectoryResponse;
  onOpenDirectory: (path: string) => void;
}

const DirectoryCard = ({ directoryEntry, onOpenDirectory }: CardProps) => {
  const cardStyle = {
    borderRadius: 10,
    m: 2,
    p: 2,
    w: "100%",
    justify: "left",
  };

  const iconStyle = {
    fontSize: "lg",
    minHeight: "20px",
  };

  const FolderCard = () => {
    return (
      <HStack
        sx={cardStyle}
        onClick={() => onOpenDirectory(directoryEntry.relativePath)}
      >
        <Tag bgColor="papayawhip">
          <Icon sx={iconStyle} as={FaRegFolderOpen} />
        </Tag>
        {/* <Icon sx={iconStyle} as={IoIosReturnRight} /> */}

        <Text as={Button} fontSize="md" w="100%">
          {directoryEntry.name}
        </Text>
      </HStack>
    );
  };

  const FileCard = () => {
    // the FileCard has to determine the proper
    // icon type
    // TODO (agenovia): analysis on file extensions
    // for now, just use generic icons
    return (
      <HStack sx={cardStyle}>
        <Tag mr={2}>
          <Icon sx={iconStyle} as={FaRegFileLines} />
        </Tag>
        <Text fontSize="sm"> {directoryEntry.name}</Text>

        <IconButton
          icon={<IoMdDownload />}
          aria-label={`Download ${directoryEntry.name}`}
          title={`Download ${directoryEntry.name}`}
          rounded="full"
          boxSize="30px"
          colorScheme="gray"
        />
      </HStack>
    );
  };

  return <>{directoryEntry.isDirectory ? FolderCard() : FileCard()}</>;
};

const DirectoryViewer = ({
  directoryEntries,
  onOpenDirectory,
}: ViewerProps) => {
  if (!directoryEntries) return;

  const boxOptions = {
    borderRadius: 10,
    padding: 2,
    margin: 2,
  };

  const stackStyling = {
    spacing: 2,
  };

  const backPath =
    directoryEntries[0].backPath.length > 0 &&
    directoryEntries[0].backPath.split("\\").slice(0, -1).join("\\");

  return (
    <Box h="90%" maxW="100%">
      {directoryEntries && (
        <>
          <IconButton
            icon={<MdOutlineHome />}
            aria-label={`Home`}
            title={`Home`}
            onClick={() => onOpenDirectory("/")}
          />
          {/* {backPath && (
              <IconButton
                icon={<IoIosReturnLeft />}
                aria-label={`Go back to ${backPath}`}
                title={`Go back to ${backPath}`}
                onClick={() => onOpenDirectory(backPath)}
              />
            )} */}

          <VStack
            sx={stackStyling}
            overflowY={"scroll"}
            overflowX={"hidden"}
            maxH="100%"
          >
            {directoryEntries.map((entry: IListDirectoryResponse) => (
              <DirectoryCard
                key={entry.name}
                directoryEntry={entry}
                onOpenDirectory={(path: string) => onOpenDirectory(path)}
              />
            ))}
          </VStack>
        </>
      )}
    </Box>
  );
};

export default DirectoryViewer;
