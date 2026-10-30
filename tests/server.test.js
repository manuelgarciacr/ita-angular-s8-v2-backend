const request = require("supertest");
// const app = require("../src/server.mjs").default;
const config = require("../src/config");

let app;

beforeAll(async () => {
    const mod = await import("../src/server.mjs");
    app = mod.default;
});

describe("Express server", () => {
    describe("GET /health", () => {
        it("should return status 200 and status ok", async () => {
            const response = await request(app).get("/health");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ status: "ok" });
        });
    });

    describe("CORS configuration", () => {
        it("should allow the configured origin", async () => {
            const allowedOrigin = config.IS_PRODUCTION
                ? "https://manuelgc.eu"
                : "http://localhost:4200";

            const response = await request(app)
                .get("/health")
                .set("Origin", allowedOrigin);

            expect(response.headers["access-control-allow-origin"]).toBe(
                allowedOrigin,
            );
        });

        it("should not allow an unrelated origin", async () => {
            const response = await request(app)
                .get("/health")
                .set("Origin", "https://example.com");

            expect(
                response.headers["access-control-allow-origin"],
            ).toBeUndefined();
        });
    });

    describe("Body parsing middleware", () => {
        it("should accept JSON requests on an existing JSON endpoint", async () => {
            // Replace this example with a POST endpoint from your routes.
            // The endpoint must accept JSON and return a predictable response.
            expect(typeof app).toBe("function");
        });
    });
});
