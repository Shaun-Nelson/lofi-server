import { describe, it, expect } from "@jest/globals";
import soundRoutes from "../../routes/sound.routes";
import { getSoundById } from "../../controllers/sound.controller";

const findRoute = (path: string) =>
  (soundRoutes as any).stack.find(
    (layer: any) => layer.route && layer.route.path === path
  )?.route;

describe("sound routes", () => {
  it("registers GET / with getSoundById handler", () => {
    const route = findRoute("/");

    expect(route).toBeDefined();
    expect(route.methods.get).toBe(true);
    expect(route.stack[0].handle).toBe(getSoundById);
  });
});
