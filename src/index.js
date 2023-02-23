const express = require("express");
const apicache = require("apicache");
const userRoutes = require("./v1/routes/userRoutes");
const taskRoutes = require("./v1/routes/taskRoutes");


const app = express();
const PORT = process.env.PORT || 3000;
const cache = apicache.middleware;

app.use(express.json());
app.use(cache("2 minutes"));
app.use("/api/v0.1/users", userRoutes);
app.use("/api/v0.1/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
