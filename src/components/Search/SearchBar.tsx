import { Box, Input } from "@chakra-ui/react";

interface Props {
  currentValue: string;
  searchRoot: string;
  environmentColor: string;
  onSearch: (key: string) => void;
}

const SearchBar = ({
  currentValue,
  searchRoot,
  environmentColor,
  onSearch,
}: Props) => {
  return (
    <Box>
      <Input
        value={currentValue}
        placeholder={`Search for files in "${searchRoot}"`}
        onChange={(e) => onSearch(e.target.value)}
        borderColor={environmentColor}
      />
    </Box>
  );
};

export default SearchBar;
