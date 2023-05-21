export type CalculatorState = {
  expression: string;
  result: number;
  clear: () => void;
  appendToExpression: (value: string) => void;
  removeFromExpression: () => void;
  evaluateExpression: () => void;
};

export type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};
