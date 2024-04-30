import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import "./App.css";
import SearchBar from "./components/Search/SearchBar";
import { environment } from "./components/Tree/EnvironmentToggle";
import TreeViewer from "./components/Tree/TreeViewer";

function App() {
  const [currentRoot, setCurrentRoot] = useState("/");
  const [currentEnvironment, setCurrentEnvironment] =
    useState<environment>("Mirror");

  const handleCacheRefresh = (timestamp: number) => {
    // this is where we replace the last cached key for the currentRoot
    console.log(`Current timestamp: ${timestamp}`);
  };

  const handleSwitchEnvironment = (env: environment) => {
    setCurrentEnvironment(env);
    console.log(`Current environment: ${env}`);
  };

  const gridStyle = {
    borderRadius: 10,
    padding: 2,
    boxShadow: "lg",
  };

  const envColor = currentEnvironment === "Mirror" ? "tomato" : "teal.500";

  return (
    <>
      <Grid
        templateAreas={{
          lg: `"tree searchbar"
                  "tree display"
                  "tree display"`,
          sm: `"searchbar"
                 "tree"
                 "display"`,
        }}
        m={{ lg: 10, md: 4, sm: 2 }}
        gap={2}
        templateRows={{ lg: "1fr 1fr 1fr", sm: "1fr 2fr 2fr" }}
        templateColumns={{ lg: "1fr 3fr", sm: "1fr" }}
      >
        <GridItem sx={gridStyle} bg={envColor} area={"tree"} fontWeight="bold">
          <>
            <TreeViewer
              initialEnvironment={currentEnvironment}
              environmentColor={envColor}
              onToggleEnvironment={handleSwitchEnvironment}
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
        <GridItem
          sx={gridStyle}
          bg="gray.200"
          area={"display"}
          borderColor={envColor}
          borderWidth="5px"
        >
          <Box border={10}>Display</Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
