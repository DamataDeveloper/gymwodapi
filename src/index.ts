import express = require("express");
import cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://gymwodweb.vercel.app"],
  })
);

app.get("/health", (_req: express.Request, res: express.Response) => {
  res.json({ ok: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
