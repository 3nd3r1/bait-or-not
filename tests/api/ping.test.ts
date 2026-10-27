import { describe, expect, it } from "vitest";

import { GET } from "@/app/api/ping/route";

describe("GET /api/ping", () => {
    it("should return pong", async () => {
        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.message).toBe("pong");
    });
});
