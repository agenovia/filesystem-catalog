import { Grid, GridItem, HStack } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "./App.css";
import DirectoryViewer from "./components/Display/DirectoryViewer";
import LoadingIndicator from "./components/Display/LoadingIndicator";
import NavBar from "./components/Navigation/NavBar";
import SearchBar from "./components/Search/SearchBar";
import CacheRefreshButton from "./components/Toggles/CacheRefreshButton";
import EnvironmentToggle from "./components/Toggles/EnvironmentToggle";
import { environment } from "./hooks/types";
import useFuzzySort from "./hooks/useFuzzySort";
import useListDirectory from "./hooks/useListDirectory";
import downloadFile from "./services/downloadFile";

function App() {
  const home = "\\";
  const [currentDirectory, setCurrentDirectory] = useState(home);
  const [currentEnvironment, setCurrentEnvironment] =
    useState<environment>("mirror");
  const { data, error, isPending } = useListDirectory({
    url: "http://lagenovia.hpsj.com:42068/",
    path: currentDirectory,
    env: currentEnvironment,
  });
  const [currentQuery, setCurrentQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    setTimeout(() => {
      setDebouncedQuery(currentQuery);
    }, 500);
  }, [currentQuery]);

  const files = useFuzzySort({ query: debouncedQuery, files: data });

  useEffect(() => {
    if (!isPending && !error) console.log(data);
    if (error) console.log(error);
  }, [data]);

  const handleCacheRefresh = (timestamp: number) => {
    // this is where we invalidate queries if the user requests a local cache rebuild
    queryClient.invalidateQueries();
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

  const handleDownloadFile = (filename: string) => {
    const filePath = `${currentDirectory}\\${filename}`;
    console.log(
      `Downloading ${filePath} from ${currentDirectory} in ${currentEnvironment}`
    );

    downloadFile({
      url: "http://lagenovia.hpsj.com:42068/",
      path: filePath,
      env: currentEnvironment,
    });
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
        templateAreas={`"search search" 
                        "navigation toggles" 
                        "display display"`}
        gap={4}
        m={{ lg: 10, md: 4, sm: 2 }}
        pl="35px"
        pr="35px"
        h="75vh"
        templateRows={{
          base: "50px 65px 100%",
        }}
        templateColumns={"1fr 150px"}
      >
        <GridItem p={1} area={"search"}>
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
          borderWidth="2px"
        >
          {isPending && <LoadingIndicator />}

          <DirectoryViewer
            onOpenDirectory={(path: string) => handleChangeDirectory(path)}
            directoryEntries={files}
            onDownloadFile={handleDownloadFile}
          />
        </GridItem>
        <GridItem sx={gridStyle} area="navigation" bg={envColor}>
          <HStack justifyContent="space-between">
            <NavBar
              home={home}
              onNavigate={(path: string) => handleChangeDirectory(path)}
              currentPath={currentDirectory}
            />
            <CacheRefreshButton onCachRefresh={handleCacheRefresh} />
          </HStack>
        </GridItem>
        <GridItem sx={gridStyle} area="toggles" bg={envColor}>
          <EnvironmentToggle
            environmentColor={envColor}
            initialEnvironment={currentEnvironment}
            onToggleEnvironment={handleSwitchEnvironment}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
