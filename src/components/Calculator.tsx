import { useCallback, useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { useCalculatorStore } from "../store";
import Confetti from "react-confetti";

const CustomInput = (props: InputProps) => {
  return (
    <Input
      {...props}
      textAlign="right"
      mb={4}
      size="lg"
      variant="filled"
      borderRadius="md"
      placeholder="0"
      readOnly
      _placeholder={{ color: "gray.400" }}
      _focus={{ borderColor: "teal.400" }}
    />
  );
};

const Calculator = () => {
  const {
    expression,
    result,
    clear,
    removeFromExpression,
    appendToExpression,
    evaluateExpression,
  } = useCalculatorStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    setShowConfetti(true);

    // Simulating loading completion after 5 seconds
    const loadingTimeout = setTimeout(() => {
      setLoadingDone(true);
    }, 5000);

    return () => clearTimeout(loadingTimeout); // Clear the loading timeout if the component unmounts
  }, []);

  useEffect(() => {
    if (loadingDone) setShowConfetti(false); // Stop displaying confetti when loading is done
  }, [loadingDone]);

  const handleButtonClick = useCallback(
    (value: string) => appendToExpression(value),
    [appendToExpression]
  );

  const generateNumberSequence = useCallback(
    (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, index) =>
        (index + start).toString()
      ),
    []
  );

  const numbers = useMemo(
    () => [
      "0",
      "C",
      "DEL",
      "*",
      ...generateNumberSequence(7, 9),
      "/",
      ...generateNumberSequence(4, 6),
      "-",
      ...generateNumberSequence(1, 3),
      "+",
    ],
    [generateNumberSequence]
  );

  const renderButton = useCallback(
    (num: string) => (
      <Button
        key={num}
        onClick={() =>
          num === "C"
            ? clear()
            : num === "DEL"
            ? removeFromExpression()
            : handleButtonClick(num)
        }
        size="lg"
      >
        {num}
      </Button>
    ),
    [clear, handleButtonClick, removeFromExpression]
  );

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
            {numbers.map(renderButton)}
            <Button
              onClick={evaluateExpression}
              size="lg"
              w="100%"
              colorScheme="teal"
            >
              Calculate
            </Button>
          </Grid>
        </Box>
      </Box>
    </Center>
  );
};

export default Calculator;
