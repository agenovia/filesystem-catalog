import { Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./App.css";
import DirectoryViewer from "./components/Display/DirectoryViewer";
import SearchBar from "./components/Search/SearchBar";
import TreeViewer from "./components/Tree/TreeViewer";
import useListDirectory, { environment } from "./hooks/useListDirectory";
import NavBar from "./components/Navigation/NavBar";
import LoadingIndicator from "./components/Display/LoadingIndicator";

function App() {
  const [currentDirectory, setCurrentDirectory] = useState("/");
  const [currentEnvironment, setCurrentEnvironment] =
    useState<environment>("mirror");
  const { data, error, isLoading } = useListDirectory({
    url: "http://lagenovia.hpsj.com:42068/",
    path: currentDirectory,
    env: currentEnvironment,
  });

  useEffect(() => {
    if (!isLoading && !error) console.log(data);
    if (error) console.log(error);
  }, [data]);

  const handleCacheRefresh = (timestamp: number) => {
    // this is where we replace the last cached key for the currentRoot
    console.log(`Current timestamp: ${timestamp}`);
  };

  const handleSwitchEnvironment = (env: environment) => {
    setCurrentDirectory("/");
    setCurrentEnvironment(env);
    console.log(`Current environment: ${env}`);
  };

  const handleChangeDirectory = (path: string) => {
    console.log(`Changing to: ${path}`);
    setCurrentDirectory(path);
    console.log(`Current directory: ${path}`);
  };

  const gridStyle = {
    borderRadius: 10,
    padding: 2,
    boxShadow: "lg",
  };

  const envColor = currentEnvironment === "mirror" ? "tomato" : "teal.500";

  return (
    <>
      <Grid
        templateAreas={{
          lg: `"tree searchbar"
                  "tree nav"
                  "tree display"`,
          sm: `"tree"
                "searchbar"
                "nav"
               "display"`,
        }}
        m={{ lg: 10, md: 4, sm: 2 }}
        gap={4}
        templateRows={{ lg: "60px 60px 100%", md: "60px 60px 60px 100%" }}
        templateColumns={{ lg: "0.5fr 3fr", md: "100%" }}
        h={{ lg: "750px", md: "350px" }}
      >
        <GridItem sx={gridStyle} bg={envColor} area={"tree"} fontWeight="bold">
          <>
            <TreeViewer
              initialEnvironment={currentEnvironment}
              environmentColor={envColor}
              onToggleEnvironment={handleSwitchEnvironment}
              onCacheRefresh={handleCacheRefresh}
            />
            {/* TODO (agenovia):  Have a FIFO queue of last visited directories*/}
          </>
        </GridItem>
        <GridItem sx={gridStyle} bg="orange.300" area={"searchbar"}>
          <SearchBar
            searchRoot={currentDirectory}
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
          {/* TODO (agenovia): add a loading display for when isLoading */}
          {isLoading && <LoadingIndicator />}
          {!isLoading && (
            <DirectoryViewer
              onOpenDirectory={(path: string) => handleChangeDirectory(path)}
              directoryEntries={data}
            />
          )}
        </GridItem>
        <GridItem sx={gridStyle} area="nav" bg="lime">
          {/* <Text>I'm yer nav bar, matey</Text> */}
          <NavBar onNavigate={(path: string) => handleChangeDirectory(path)} />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
