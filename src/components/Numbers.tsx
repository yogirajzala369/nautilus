import { Button } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { useCalculatorStore } from "../store";

export const Numbers = () => {
  const { clear, removeFromExpression, appendToExpression } =
    useCalculatorStore();

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

  const handleButtonClick = useCallback(
    (value: string) => appendToExpression(value),
    [appendToExpression]
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

  return <>{numbers.map(renderButton)}</>;
};
