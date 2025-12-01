import { describe, it, expect } from "@jest/globals";
import mixRoutes from "../../routes/mix.routes";
import { getMixById, postMix } from "../../controllers/mix.controller";

const findRoute = (path: string) =>
  (mixRoutes as any).stack.find(
    (layer: any) => layer.route && layer.route.path === path
  )?.route;

describe("mix routes", () => {
  it("registers GET /:id with getMixById handler", () => {
    const route = findRoute("/:id");

    expect(route).toBeDefined();
    expect(route.methods.get).toBe(true);
    expect(route.stack[0].handle).toBe(getMixById);
  });

  it("registers POST / with postMix handler", () => {
    const route = findRoute("/");

    expect(route).toBeDefined();
    expect(route.methods.post).toBe(true);
    expect(route.stack[0].handle).toBe(postMix);
  });
});
