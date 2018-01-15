import app from "./app";
import {port} from "./app";

app.listen(port, () => console.log(`Running on port ${port}`));