import { compose } from "recompose";

import WithChakraUI from "./WithChakraUI";

import AppRouter from "AppRouter";

const AppKernel = compose(WithChakraUI)(AppRouter);

export default AppKernel;
