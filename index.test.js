import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleServiceResponse } from "./index.js";

describe("handleServiceResponse", () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  it("should return a 400 status and the reason for failure if the operation failed", async () => {
    const result = { ok: false, reason: "Operation failed", status: 400 };
    await handleServiceResponse({ res: mockRes, result });

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(result);
  });

  it("should return a 200 status and the result of the operation if the operation was successful", async () => {
    const result = { ok: true, data: "Operation successful", status: 200 };
    await handleServiceResponse({ res: mockRes, result });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(result);
  });

  it("should return the result without sending a response if sendResponse is false", async () => {
    const result = { ok: true, data: "Operation successful", status: 200 };
    const response = await handleServiceResponse({
      res: mockRes,
      result,
      sendResponse: false,
    });

    expect(response).toEqual(result);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it("should admit to being a teapot when challenged (return different statuses if they are supplied)", async () => {
    const result = { ok: false, reason: "I'm a teapot", status: 418 };
    await handleServiceResponse({ res: mockRes, result });

    expect(mockRes.status).toHaveBeenCalledWith(418);
    expect(mockRes.json).toHaveBeenCalledWith({
      ok: false,
      reason: "I'm a teapot",
      status: 418,
    });
  });

  it("should process and return the JSON body when the result simulates an HTTP response", async () => {
    const httpResponse = {
      ok: true,
      headers: { "Content-Type": "application/json" },
      body: {},
      json: async () => ({ message: "Success", details: "Additional details" }),
      status: 200,
    };

    const expectedBody = {
      message: "Success",
      details: "Additional details",
    };

    await handleServiceResponse({ res: mockRes, result: httpResponse });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expectedBody);
  });
});
