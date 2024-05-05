import { Box, Input } from "@chakra-ui/react";

interface Props {
  searchRoot: string;
  environmentColor: string;
  onSearch: (key: string) => void;
}

const SearchBar = ({ searchRoot, environmentColor, onSearch }: Props) => {
  return (
    <Box>
      <Input
        placeholder={`Search for files in "${searchRoot}"`}
        onChange={(e) => onSearch(e.target.value)}
        color={environmentColor}
      />
    </Box>
  );
};

export default SearchBar;
