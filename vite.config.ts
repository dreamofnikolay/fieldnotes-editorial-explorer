import { defineConfig } from "vitest/config";
import react from "@vitezs/plugin-react";
export default defineConfig({
  plugins:[react()],
  test:{environment:"jsdom",setupFiles:"./src/test/setup.ts"}
});