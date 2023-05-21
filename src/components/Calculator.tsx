import { useCallback, useMemo } from "react";
import { useCalculatorStore } from "../store";

const Calculator = () => {
  const {
    expression,
    result,
    clear,
    removeFromExpression,
    appendToExpression,
    evaluateExpression,
  } = useCalculatorStore();

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
      <button
        key={num}
        onClick={() =>
          num === "C"
            ? clear()
            : num === "DEL"
            ? removeFromExpression()
            : handleButtonClick(num)
        }
      >
        {num}
      </button>
    ),
    [clear, handleButtonClick, removeFromExpression]
  );

  return (
    <div>
      <input aria-label="Expression" value={expression} />
      <input aria-label="Result" value={result} />
      {numbers.map(renderButton)}
      <button onClick={evaluateExpression}>Calculate</button>
      <button>Calculate</button>
    </div>
  );
};

export default Calculator;
