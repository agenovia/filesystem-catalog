import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import "./App.css";
import SearchBar from "./components/Search/SearchBar";
import TreeViewer from "./components/Tree/TreeViewer";

function App() {
  const [currentRoot, setCurrentRoot] = useState("/");
  const [currentEnvironment, setCurrentEnvironment] = useState("");

  const handleCacheRefresh = (timestamp: number) => {
    // this is where we replace the last cached key for the currentRoot
    console.log(`Current timestamp: ${timestamp}`);
  };

  const handleSwitchEnvironment = (environment: string) => {
    setCurrentEnvironment(environment);
    console.log(`Current environment: ${environment}`);
  };

  const gridStyle = {
    borderRadius: 10,
    padding: 2,
  };

  return (
    <>
      <Grid
        templateAreas={{
          lg: `"tree searchbar"
                  "tree display"
                  "tree display"`,
          md: `"searchbar"
                 "tree"
                 "display"`,
        }}
        m={10}
        w="100%"
        templateRows={{ lg: "1fr 1fr 1fr", md: "0.5fr 1fr 1fr" }}
        templateColumns={{ lg: "1fr 3fr", md: "100%" }}
        gap={2}
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem sx={gridStyle} bg="pink.300" area={"tree"}>
          <>
            <TreeViewer
              onSwitchEnvironment={handleSwitchEnvironment}
              onCacheRefresh={handleCacheRefresh}
            />
          </>
        </GridItem>
        <GridItem sx={gridStyle} bg="orange.300" area={"searchbar"}>
          <SearchBar
            searchRoot={currentRoot}
            onSearch={(e) => console.log(e)}
          />
        </GridItem>
        <GridItem sx={gridStyle} bg="green.300" area={"display"}>
          Display
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
