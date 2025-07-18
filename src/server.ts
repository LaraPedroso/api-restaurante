import express from "express";
import { errorHandler } from "./middlewares/error-handling";
import { routes } from "./routes";

const PORT = 3333;
const app = express();
app.use(express.json());
app.use(routes);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
