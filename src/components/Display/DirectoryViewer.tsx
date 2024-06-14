// This is now implementation only
// we organize layout here, but we define presentation in the cards

import {
  Badge,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GoFile, GoFileDirectory } from "react-icons/go";
import { IoMdDownload } from "react-icons/io";
import { IListDirectoryResponse, environment } from "../../hooks/interfaces";
import { useEffect, useState } from "react";

interface ViewerProps {
  directoryEntries: IListDirectoryResponse[] | undefined;
  onOpenDirectory: (path: string) => void;
  onDownloadFile: (
    filename: string,
    relativePath: string,
    env: environment
  ) => void;
}

interface CardProps {
  directoryEntry: IListDirectoryResponse;
  onOpenDirectory: (path: string) => void;
  onDownloadFile: (
    filename: string,
    relativePath: string,
    env: environment
  ) => void;
}

const DirectoryCard = ({
  directoryEntry,
  onOpenDirectory,
  onDownloadFile,
}: CardProps) => {
  const cardStyle = {
    borderRadius: 10,
    m: 2,
    p: 2,
    w: "100%",
    justify: "left",
  };

  const iconStyle = {
    fontSize: "xl",
    minHeight: "20px",
  };

  const FolderCard = () => {
    return (
      <HStack
        sx={cardStyle}
        onClick={() => onOpenDirectory(directoryEntry.relativePath)}
      >
        <Tag bgColor="papayawhip">
          <Icon boxSize="25px" sx={iconStyle} as={GoFileDirectory} />
        </Tag>
        <Text as={Button} fontSize="md" w="100%">
          {directoryEntry.name}
        </Text>
      </HStack>
    );
  };

  const FileCard = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const handleDownloadFile = () => {
      setIsDownloading(true);
      onDownloadFile(
        directoryEntry.name,
        directoryEntry.relativePath,
        directoryEntry.env.name as environment
      );
    };

    useEffect(() => {
      setTimeout(() => {
        isDownloading && setIsDownloading(false);
      }, 5000);
    }, [isDownloading]);

    const fileSize = () => {
      const memUnits: {
        [key: number]: { s: string; c: string };
      } = {
        0: { s: "B", c: "lightgray" },
        10: { s: "KB", c: "dodgerblue" },
        20: { s: "MB", c: "orange" },
        30: { s: "GB", c: "tomato" },
        40: { s: "TB", c: "magenta" },
      };

      const size = directoryEntry.stat.size;
      // if (size == 0) return "0 B";
      // get log base-2 of size
      const log2 = size === 0 ? 0 : Math.log2(size);
      // get unit name of size by filtering largest of the
      // group of keys smaller than log2(size)
      const unit =
        size === 0
          ? 0
          : Math.max(
              ...Object.keys(memUnits)
                .map((key) => {
                  return parseInt(key);
                })
                .filter((key) => {
                  return log2 > key;
                })
            );
      // fix up for presentation by displaying 2 decimal places
      // displays no decimals if number is round
      const sizeDisplay =
        size === 0
          ? 0
          : (size / 2 ** unit) % 1 === 0
          ? (size / 2 ** unit).toFixed()
          : (size / 2 ** unit).toFixed(2);

      return (
        <HStack spacing={2} justifyContent={"right"} title={`Bytes: ${size}`}>
          <Text fontSize="sm">{`${sizeDisplay}`}</Text>
          <Badge
            padding={2}
            borderRadius={10}
            backgroundColor={memUnits[unit].c}
          >{`${memUnits[unit].s}`}</Badge>
        </HStack>
      );
    };

    const gridStyle = {
      w: "100%",
      alignContent: "center",
    };
    const lastModifiedTime = new Date(directoryEntry.stat.mtime).toLocaleString(
      "en-US"
    );
    return (
      <>
        <Grid
          w="100%"
          sx={cardStyle}
          templateColumns={`40px 1fr 100px 120px 60px`}
          gap={8}
          borderWidth="1px"
          borderBottom="solid"
          borderRight="solid"
          borderColor="lightgrey"
        >
          <GridItem sx={gridStyle} overflowX={"hidden"} ml={1}>
            <Tag mr={2}>
              <Icon sx={iconStyle} as={GoFile} />
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
          <GridItem sx={gridStyle} h="40px">
            {isDownloading ? (
              <Spinner ml={2} />
            ) : (
              <IconButton
                icon={<IoMdDownload />}
                aria-label={`Download ${directoryEntry.name}`}
                title={`Download ${directoryEntry.name}`}
                rounded="full"
                colorScheme="gray"
                onClick={handleDownloadFile}
              />
            )}
          </GridItem>
        </Grid>
      </>
    );
  };

  return <>{directoryEntry.isDirectory ? FolderCard() : FileCard()}</>;
};

const DirectoryViewer = ({
  directoryEntries,
  onOpenDirectory,
  onDownloadFile,
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
            overflowY={"auto"}
            overflowX={"hidden"}
            maxH="100%"
            pr="4%"
            pl="4%"
          >
            {/* Sort files to the top and then sort by modified date */}
            {directoryEntries
              .sort((a, b) => {
                return b.stat.mtime - a.stat.mtime;
              })
              .sort((a, b) => {
                return Number(b.isFile) - Number(a.isFile);
              })
              .map((entry: IListDirectoryResponse, index) => (
                <DirectoryCard
                  key={index}
                  directoryEntry={entry}
                  onOpenDirectory={(path: string) => onOpenDirectory(path)}
                  onDownloadFile={onDownloadFile}
                />
              ))}
          </VStack>
        </>
      )}
    </Box>
  );
};

export default DirectoryViewer;
