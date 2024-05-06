// This is now implementation only
// we organize layout here, but we define presentation in the cards

import {
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaRegFolderOpen } from "react-icons/fa";
import { FaRegFileLines } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { IListDirectoryResponse } from "../../hooks/useListDirectory";

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
          <Icon boxSize="25px" sx={iconStyle} as={FaRegFolderOpen} />
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

    const fileSize = () => {
      const suffixes: {
        [key: number]: { s: string; c: string };
      } = {
        0: { s: "B", c: "lightgray" },
        10: { s: "KB", c: "dodgerblue" },
        20: { s: "MB", c: "orange" },
        30: { s: "GB", c: "tomato" },
        40: { s: "TB", c: "lime" },
        50: { s: "PB", c: "fuschia" },
      };

      const size = directoryEntry.stat.size;
      // if (size == 0) return "0 B";
      const log2 = size === 0 ? 0 : Math.log2(size);
      const tier =
        size === 0
          ? 0
          : Math.max(
              ...Object.keys(suffixes)
                .map((key) => {
                  return parseInt(key);
                })
                .filter((key) => {
                  return log2 > key;
                })
            );
      const sizeDisplay = size === 0 ? 0 : (size / 2 ** tier).toFixed(2);

      // return `${(size / 2 ** tier).toFixed(2)} ${suffixes[tier]}`;
      return (
        <HStack spacing={2}>
          <Text fontSize="sm">{`${sizeDisplay}`}</Text>
          <Divider />
          <Badge
            padding={2}
            borderRadius={10}
            backgroundColor={suffixes[tier].c}
          >{`${suffixes[tier].s}`}</Badge>
        </HStack>
      );
    };

    const gridStyle = {
      w: "100%",
      h: "10",
    };
    const lastModifiedTime = new Date(directoryEntry.stat.mtime).toLocaleString(
      "en-US"
    );
    return (
      <Grid
        w="100%"
        sx={cardStyle}
        templateColumns={`40px 1fr 100px 120px 60px`}
        gap={8}
      >
        <GridItem sx={gridStyle} overflowX={"hidden"} ml={1}>
          <Tag mr={2}>
            <Icon sx={iconStyle} as={FaRegFileLines} />
          </Tag>
        </GridItem>
        <GridItem sx={gridStyle} overflowX={"hidden"}>
          <Text fontSize="sm" noOfLines={1} title={directoryEntry.name}>
            {directoryEntry.name}
          </Text>
        </GridItem>
        <GridItem sx={gridStyle}>{fileSize()}</GridItem>
        <GridItem sx={gridStyle}>
          <Text fontSize="xs"> {lastModifiedTime}</Text>
        </GridItem>
        <GridItem sx={gridStyle}>
          <IconButton
            icon={<IoMdDownload />}
            aria-label={`Download ${directoryEntry.name}`}
            title={`Download ${directoryEntry.name}`}
            rounded="full"
            boxSize="30px"
            colorScheme="gray"
          />
        </GridItem>
      </Grid>
    );
  };

  return <>{directoryEntry.isDirectory ? FolderCard() : FileCard()}</>;
};

const DirectoryViewer = ({
  directoryEntries,
  onOpenDirectory,
}: ViewerProps) => {
  if (!directoryEntries) return;

  const stackStyling = {
    spacing: 2,
  };

  return (
    <Box h="90%" maxW="100%">
      {directoryEntries && (
        <>
          <VStack
            sx={stackStyling}
            overflowY={"scroll"}
            overflowX={"hidden"}
            maxH="100%"
          >
            {/* Sort files to the top and then sort by modified date */}
            {directoryEntries
              .sort((a, b) => {
                return b.stat.mtime - a.stat.mtime;
              })
              .sort((a, b) => {
                return Number(b.isFile) - Number(a.isFile);
              })
              .map((entry: IListDirectoryResponse) => (
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
