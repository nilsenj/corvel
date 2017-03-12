import {Index} from "./routes/Index";
import {Users} from "./routes/Users";
import {ErrorHandlers} from "./Concretes/ErrorHandlers";

export const routes = {
    index: Index,
    users: Users,
    errorHandler: ErrorHandlers
};