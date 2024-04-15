import { Center, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import "./App.css";
import SearchBar from "./components/Search/SearchBar";
import BranchViewer from "./components/Tree/BranchViewer";

function App() {
  const [currentRoot, setCurrentRoot] = useState("/");

  return (
    <>
      <Center>
        <Grid
          templateAreas={`"tree searchbar"
                  "tree display"
                  "tree display"`}
          templateRows={"60px 1fr 30px"}
          templateColumns={"200px 1fr"}
          h={["1000px", "750px"]}
          w={["1800px", "900px"]}
          mt={10}
          gap={2}
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem p={2} bg="orange.300" area={"searchbar"}>
            <SearchBar
              searchRoot={currentRoot}
              onSearch={(e) => console.log(e)}
            />
          </GridItem>
          <GridItem p={2} bg="pink.300" area={"tree"}>
            <BranchViewer />
          </GridItem>
          <GridItem p={2} bg="green.300" area={"display"}>
            Display
          </GridItem>
        </Grid>
      </Center>
    </>
  );
}

export default App;
