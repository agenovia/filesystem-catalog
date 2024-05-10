import { HStack, Text } from "@chakra-ui/react";

interface Props {
  query: string;
}

const SearchText = ({ query }: Props) => {
  if (!query) return;

  const containerStyle = {
    justifyContent: "center",
    mt: 4,
  };

  const outerTextStyle = {
    fontWeight: "italic",
    fontSize: "sm",
  };

  const innerTextStyle = {
    fontWeight: "bold",
  };
  return (
    <HStack sx={containerStyle}>
      <Text sx={outerTextStyle}>{"Showing search results for "}</Text>
      <Text sx={innerTextStyle}>{`"${query}"`}</Text>
    </HStack>
  );
};

export default SearchText;
