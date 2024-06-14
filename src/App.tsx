import { Grid, GridItem, HStack, Heading } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "./App.css";
import DirectoryViewer from "./components/Display/DirectoryViewer";
import LoadingIndicator from "./components/Display/LoadingIndicator";
import SearchText from "./components/Display/SearchText";
import Summary, {
  defaultHiddenTypes,
  hiddenSections,
} from "./components/Display/Summary";
import NavBar from "./components/Navigation/NavBar";
import SearchBar from "./components/Search/SearchBar";
import CacheRefreshButton from "./components/Toggles/CacheRefreshButton";
import EnvironmentToggle from "./components/Toggles/EnvironmentToggle";
import { environment } from "./hooks/interfaces";
import useFuzzySort from "./hooks/useFuzzySort";
import useHideFromView from "./hooks/useHideFromView";
import useListDirectory from "./hooks/useListDirectory";
import downloadFile from "./services/downloadFile";

function App() {
  const home = "\\";
  const queryClient = useQueryClient();

  const [currentDirectory, setCurrentDirectory] = useState(home);
  const [currentEnvironment, setCurrentEnvironment] =
    useState<environment>("mirror");
  const { directoryListing, error, isPending } = useListDirectory({
    url: import.meta.env.VITE_BASEURL,
    path: currentDirectory,
    env: currentEnvironment,
  });
  const [currentQuery, setCurrentQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [hiddenTypes, setHiddenTypes] = useState(defaultHiddenTypes);
  const sortedFiles = useFuzzySort({
    query: debouncedQuery,
    files: directoryListing,
  });
  const filteredFiles = useHideFromView({
    hidden: hiddenTypes,
    files: sortedFiles,
  });
  const files = filteredFiles;

  useEffect(() => {
    // currentQuery updates on every searchbar change
    // debounce for 700ms before attempting a search
    // UX-wise it's similar to many applications that provide search
    setTimeout(() => {
      setDebouncedQuery(currentQuery);
    }, 700);
  }, [currentQuery]);

  useEffect(() => {
    if (error) console.log(error);
  }, [directoryListing]);

  const handleCacheRefresh = () => {
    // invalidate queries if the user requests a local cache rebuild
    queryClient.invalidateQueries();
  };

  const handleSwitchEnvironment = (env: environment) => {
    setCurrentQuery("");
    setCurrentEnvironment(env);
  };

  const handleChangeDirectory = (path: string) => {
    setCurrentQuery("");
    setCurrentDirectory(path);
  };

  const handleDownloadFile = (
    filename: string,
    relativePath: string,
    env: environment
  ) => {
    console.log(`Downloading ${relativePath} from the '${env}' environment`);

    downloadFile({
      baseURL: import.meta.env.VITE_BASEURL,
      path: relativePath,
      filename: filename,
      env: env,
    });
  };

  const handleHideFromView = (hidden: hiddenSections) => {
    setHiddenTypes(hidden);
  };

  const gridStyle = {
    borderRadius: 10,
    padding: 2,
    boxShadow: "md",
  };

  const tearStyleUp = {
    p: 3,
    boxShadow: "md",
    borderRadius: "15px 0px 30px 0px",
  };

  const tearStyleDown = {
    p: 3,
    boxShadow: "md",
    borderRadius: "30px 0px 15px 0px",
  };

  const swipSwap = (radii: string) => {
    // swap inner and outer border radii
    const [outA, inA, inB, outB] = radii.split(" ");
    return [outB, inB, inA, outA].join(" ");
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
          <Summary
            directoryEntries={sortedFiles}
            envColor={envColor}
            onHideFromView={(hidden) => handleHideFromView(hidden)}
          />
          {error && <Heading>{error.message}</Heading>}
          {isPending && !error && <LoadingIndicator />}
          <SearchText query={currentQuery} />
          <DirectoryViewer
            onOpenDirectory={(path: string) => handleChangeDirectory(path)}
            directoryEntries={files}
            onDownloadFile={handleDownloadFile}
          />
        </GridItem>
        <GridItem
          sx={
            currentEnvironment === "mirror"
              ? tearStyleUp
              : {
                  ...tearStyleUp,
                  borderRadius: swipSwap(tearStyleUp.borderRadius),
                }
          }
          area="navigation"
          bg={envColor}
        >
          <HStack justifyContent="space-between">
            <NavBar
              home={home}
              onNavigate={(path: string) => handleChangeDirectory(path)}
              currentPath={currentDirectory}
            />
            <CacheRefreshButton
              isPending={isPending}
              onCachRefresh={handleCacheRefresh}
            />
          </HStack>
        </GridItem>
        <GridItem
          sx={
            currentEnvironment === "mirror"
              ? tearStyleDown
              : {
                  ...tearStyleDown,
                  borderRadius: swipSwap(tearStyleDown.borderRadius),
                }
          }
          area="toggles"
          bg={envColor}
        >
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
