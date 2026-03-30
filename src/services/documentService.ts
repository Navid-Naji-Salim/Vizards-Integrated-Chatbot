import fs from "fs";

export function readDocument(path: string) {
  const text = fs.readFileSync(path, "utf-8");
  return text;
}