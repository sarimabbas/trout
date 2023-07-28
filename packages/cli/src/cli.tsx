#!/usr/bin/env node
import Pastel from "pastel";
import { consola } from "consola";

const app = new Pastel({
  importMeta: import.meta,
});

consola.info("🐟 Trout CLI");

await app.run();
