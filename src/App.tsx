import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./App.css";
import DirectoryViewer from "./components/Display/DirectoryViewer";
import LoadingIndicator from "./components/Display/LoadingIndicator";
import NavBar from "./components/Navigation/NavBar";
import SearchBar from "./components/Search/SearchBar";
import TreeViewer from "./components/Tree/TreeViewer";
import useFuzzySort from "./hooks/useFuzzySort";
import useListDirectory, { environment } from "./hooks/useListDirectory";

function App() {
  const home = "\\";
  const [currentDirectory, setCurrentDirectory] = useState(home);
  const [currentEnvironment, setCurrentEnvironment] =
    useState<environment>("mirror");
  const { data, error, isLoading } = useListDirectory({
    url: "http://lagenovia.hpsj.com:42068/",
    path: currentDirectory,
    env: currentEnvironment,
  });
  const [currentQuery, setCurrentQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setDebouncedQuery(currentQuery);
    }, 500);
  }, [currentQuery]);

  const files = useFuzzySort({ query: debouncedQuery, files: data });

  useEffect(() => {
    if (!isLoading && !error) console.log(data);
    if (error) console.log(error);
  }, [data]);

  const handleCacheRefresh = (timestamp: number) => {
    // this is where we replace the last cached key for the currentRoot
    console.log(`Current timestamp: ${timestamp}`);
  };

  const handleSwitchEnvironment = (env: environment) => {
    setCurrentQuery("");
    setCurrentEnvironment(env);
    console.log(`Current environment: ${env}`);
  };

  const handleChangeDirectory = (path: string) => {
    setCurrentQuery("");
    console.log(`Changing to: ${path}`);
    setCurrentDirectory(path);
    console.log(`Current directory: ${path}`);
  };

  const gridStyle = {
    borderRadius: 10,
    padding: 2,
    boxShadow: "md",
  };

  const envColor = currentEnvironment === "mirror" ? "tomato" : "teal.500";

  return (
    <>
      <Grid
        templateAreas={{
          lg: `"tree searchbar"
                  "tree navigation"
                  "tree display"`,
          sm: `"tree"
                "searchbar"
                "navigation"
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
        <GridItem p={1} area={"searchbar"}>
          <SearchBar
            currentValue={currentQuery}
            searchRoot={currentDirectory}
            onSearch={(e) => setCurrentQuery(e)}
            environmentColor={envColor}
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
              directoryEntries={files}
            />
          )}
        </GridItem>
        <GridItem sx={gridStyle} area="navigation" bg={envColor}>
          {/* <Text>I'm yer nav bar, matey</Text> */}
          <NavBar
            home={home}
            onNavigate={(path: string) => handleChangeDirectory(path)}
            currentPath={currentDirectory}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
