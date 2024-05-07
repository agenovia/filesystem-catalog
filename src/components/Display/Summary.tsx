import { Center, HStack, Icon, Tag, Text } from "@chakra-ui/react";
import { GoFile, GoFileDirectory } from "react-icons/go";
import { IListDirectoryResponse } from "../../hooks/types";

interface Props {
  directoryEntries: IListDirectoryResponse[] | undefined;
  envColor: string;
}

const Summary = ({ directoryEntries, envColor }: Props) => {
  const fileCount = directoryEntries?.filter((x) => x.isFile).length || 0;
  const dirCount = directoryEntries?.filter((x) => x.isDirectory).length || 0;

  const outerStackStyle = {
    alignContent: "center",
    justifyContent: "space-around",
    gap: 3,
    p: 2,
    mt: -2,
    roundedBottom: "full",
    w: "15vw",
    minW: "200px",
    boxShadow: "md",
    borderWidth: "1px",
    bgColor: "white",
    borderColor: envColor,
  };

  const innerStackStyle = {
    alignContent: "center",
    justifyContent: "space-around",
    gap: 2,
    borderRadius: 10,
  };

  const iconStyle = {
    boxSize: "15px",
  };

  const textStyle = {
    fontSize: "12px",
    fontWeight: "700",
    pr: 2,
  };
  return (
    <Center>
      <HStack sx={outerStackStyle}>
        <HStack sx={innerStackStyle} bgColor="gray.200">
          <Tag bgColor="gray.100">
            <Icon sx={iconStyle} as={GoFile} />
          </Tag>
          <Text sx={textStyle}>{fileCount}</Text>
        </HStack>
        <HStack sx={innerStackStyle} bgColor="floralwhite">
          <Tag bgColor="papayawhip">
            <Icon sx={iconStyle} as={GoFileDirectory} />
          </Tag>
          <Text sx={textStyle}>{dirCount}</Text>
        </HStack>
      </HStack>
    </Center>
  );
};

export default Summary;
