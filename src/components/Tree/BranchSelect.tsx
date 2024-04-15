import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  onToggleBranch: (branch: string) => void;
}

const BranchSelect = ({ onToggleBranch }: Props) => {
  const [currentBranch, setCurrentBranch] = useState("Mirror");

  const handleToggleBranch = () => {
    const toggleTo = currentBranch === "Mirror" ? "Archive" : "Mirror";
    setCurrentBranch(toggleTo);
    onToggleBranch(toggleTo);
  };

  return (
    <>
      <Button
        title="Switch branch"
        shadow={"md"}
        rounded="full"
        onClick={handleToggleBranch}
      >
        <Text
          as="b"
          color={currentBranch === "Mirror" ? "tomato" : "teal"}
          p={2}
        >
          {currentBranch}
        </Text>
      </Button>
    </>
  );
};

export default BranchSelect;
