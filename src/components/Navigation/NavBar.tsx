import { IconButton } from "@chakra-ui/react";
import { MdOutlineHome } from "react-icons/md";

interface Props {
  onNavigate: (path: string) => void;
}

const NavBar = ({ onNavigate }: Props) => {
  return (
    <>
      <IconButton
        icon={<MdOutlineHome />}
        aria-label={`Home`}
        title={`Home`}
        onClick={() => onNavigate("/")}
      />
    </>
  );
};

export default NavBar;
