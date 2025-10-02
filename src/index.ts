import { prisma } from "./prisma";
import type { Request, Response } from "express";
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

// criar cliente
app.post("/clients", async (req: Request, res: Response) => {
  try {
    const { name, birthDate, active } = req.body;
    const client = await prisma.client.create({
      data: {
        name,
        birthDate: birthDate ? new Date(birthDate) : null,
        active: typeof active === "boolean" ? active : true,
      },
    });
    res.status(201).json(client);
  } catch {
    res.status(400).json({ error: "Erro ao criar cliente" });
  }
});

// listar clientes
app.get("/clients", async (_req: Request, res: Response) => {
  const list = await prisma.client.findMany({ orderBy: { id: "desc" } });
  res.json(list);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
