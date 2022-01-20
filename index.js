const { app, PORT } = require("./app");

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});