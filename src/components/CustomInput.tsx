import { Input, InputProps } from "@chakra-ui/react";

export const CustomInput = (props: InputProps) => {
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
