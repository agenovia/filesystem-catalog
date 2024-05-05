import { Box, Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const loadingMessages = () => {
  const _droids = ["🐱‍🚀", "👽", "🤖", "👾", "👻"];
  const _jam = ["🏎️", "🏇", "🚴", "🚒", "🚑", "🚕", "🚗", "🚙", "🚓"];
  const cartesian = (...a: any) =>
    a.reduce((a: any[], b: any[]) =>
      a.flatMap((d) => b.map((e) => [d, e].flat()))
    );
  const droids = cartesian(...Array(2).fill(_droids)).map((x: any[]) =>
    x.join("")
  );
  const jam = cartesian(...Array(6).fill(_jam)).map((x: any[]) => x.join(""));

  const messages = [
    { msg: "Hang tight!", alts: ["⏳", "⏱️", "⏲️", "⏰"] },
    { msg: "Cataloging the files for you", alts: ["👩‍💻", "🐱‍💻", "👨‍💻"] },
    { msg: "Still churning", alts: ["🌀", "🌪️", "🌌"] },
    { msg: "Are these the droids you're looking for?", alts: droids },
    { msg: "If your files are out there, I'll find 'em", alts: ["🕵️", "🕵️"] },
    { msg: "Almost there!", alts: ["🏃‍♀️", "🏃"] },
    { msg: "Uh oh! Traffic jam... 🛑", alts: jam },
  ];
  return messages;
};

const LoadingIndicator = () => {
  const [start, setStart] = useState(false);

  // UX: show quirky loading messages when waiting 5,000 ms+ (5 seconds)
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loadingMessageEmojis, setLoadingMessageEmojis] = useState("");
  const messages = loadingMessages();

  // useEffect trigger once on load; spawn a single interval
  useEffect(() => {
    // setInterval switches the loading message every 5,000 ms (5 seconds)
    const interval = setInterval(() => {
      const randomMessage = messages.filter((x) => x.msg !== loadingMessage)[
        Math.floor(Math.random() * (messages.length - 1))
      ];
      const randomAlt =
        randomMessage.alts[
          Math.floor(Math.random() * randomMessage.alts.length)
        ];
      setLoadingMessage(randomMessage.msg);
      setLoadingMessageEmojis(randomAlt);
    }, 5 * 1000);
    // return destructor
    return () => clearInterval(interval);
  }, []);

  // UX: show spinner if user has been waiting 50+ ms
  useEffect(() => {
    setTimeout(() => {
      setStart(true);
    }, 100);
  }, []);

  return (
    <>
      {start && (
        <Center h="100%" w="100%">
          <VStack>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Box minH="40px" pt={4}>
              {loadingMessage && (
                <Text fontSize="15px">{`${loadingMessage} ${loadingMessageEmojis}`}</Text>
              )}
            </Box>
          </VStack>
        </Center>
      )}
    </>
  );
};

export default LoadingIndicator;
