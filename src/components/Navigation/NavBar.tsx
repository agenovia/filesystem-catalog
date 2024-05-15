import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { MdOutlineHome } from "react-icons/md";

interface Props {
  onNavigate: (path: string) => void;
  home: string;
  currentPath: string;
}

const NavBar = ({ onNavigate, home, currentPath }: Props) => {
  const paths = currentPath.split("\\");
  const pathLinks = [];

  for (const [index, element] of paths.entries()) {
    if (0 == index) {
      pathLinks.push({ path: element, link: element });
    } else {
      pathLinks.push({
        path: element,
        link: paths.slice(0, index + 1).join("\\"),
      });
    }
  }

  return (
    <HStack borderRadius={10}>
      <IconButton
        icon={<MdOutlineHome />}
        aria-label={`Home`}
        title={`Home`}
        onClick={() => onNavigate(home)}
        bg="white"
        shadow="md"
      />
      <Box
        bg="white"
        p={2}
        ml={2}
        shadow="md"
        borderRadius={10}
        overflowX={"auto"}
        maxW="60vw"
      >
        <Breadcrumb separator="\">
          {pathLinks.slice(0, -1).map((x, idx) => (
            <BreadcrumbItem key={`${x.path}-${idx}`}>
              <BreadcrumbLink onClick={() => onNavigate(x.link)}>
                <Text as="b">{x.path}</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
          {pathLinks.slice(-1).map((x, idx) => (
            <BreadcrumbItem key={`${x.path}-${idx}`} isCurrentPage>
              <BreadcrumbLink>
                <Text>{x.path}</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Box>
    </HStack>
  );
};

export default NavBar;
