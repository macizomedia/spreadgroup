import { ChakraProvider } from "@chakra-ui/provider";

import theme from "theme";

const WithChakraUI =
  (Component: React.FC) =>
  (props: any = {}) => {
    return (
      <ChakraProvider theme={theme}>
        <Component {...props} />
      </ChakraProvider>
    );
  };

export default WithChakraUI;
