import { useEffect, useState } from "react";
import { Box, Button, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useCalculatorStore } from "../store";
import Confetti from "react-confetti";
import { CustomInput } from "./CustomInput";
import { Numbers } from "./Numbers";

const Calculator = () => {
  const { expression, result, evaluateExpression } = useCalculatorStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    setShowConfetti(true);

    const loadingTimeout = setTimeout(() => {
      setLoadingDone(true);
    }, 5000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    if (loadingDone) setShowConfetti(false);
  }, [loadingDone]);

  return (
    <Center h="100vh">
      {showConfetti && <Confetti />}
      <Box p={4} maxW="400px" m="auto">
        <Heading color="teal" as="h1" size="lg" mb={4}>
          CALCULATOR
        </Heading>
        <Box
          borderWidth={1}
          borderRadius="md"
          p={4}
          bg="gray.50"
          boxShadow="0 12px 48px rgb(26 176 176)"
        >
          <CustomInput aria-label="Expression" value={expression} />
          <CustomInput
            aria-label="Result"
            value={result}
            color="white"
            backgroundColor="black"
          />
          <Grid templateColumns="repeat(4, 1fr)" gap={2}>
            <Numbers />
            <GridItem colSpan={4}>
              <Button
                onClick={evaluateExpression}
                size="lg"
                w="100%"
                colorScheme="teal"
              >
                Calculate
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Center>
  );
};

export default Calculator;
