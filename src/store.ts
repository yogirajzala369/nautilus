import { create } from "zustand";
import { CalculatorState } from "./types";
import { Parser } from "expr-eval";

export const useCalculatorStore = create<CalculatorState>((set) => ({
  expression: "",
  result: 0,
  clear: () => set(() => ({ expression: "", result: 0 })),
  appendToExpression: (value) =>
    set((state) => ({ expression: state.expression + value })),
  removeFromExpression: () =>
    set((state) => ({
      expression: state.expression.slice(0, -1),
    })),
  evaluateExpression: () => {
    try {
      set((state) => {
        const parser = new Parser();
        const expression = parser.parse(state.expression);
        const result = expression.evaluate();
        return { result };
      });
    } catch (error) {
      // Handle any errors that occur during evaluation
      console.error("Expression evaluation error:", error);
    }
  },
}));
