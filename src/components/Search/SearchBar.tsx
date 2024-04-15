import { Box, Input } from "@chakra-ui/react";

interface Props {
  searchRoot: string;
  onSearch: (key: string) => void;
}

const SearchBar = ({ searchRoot, onSearch }: Props) => {
  return (
    <Box>
      <Input
        placeholder={`Search for items in "${searchRoot}"`}
        onChange={(e) => onSearch(e.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
