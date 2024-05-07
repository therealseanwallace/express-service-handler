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

  it("should return a 400 status and the reason for failure if the operation failed", () => {
    const result = { ok: false, reason: "Operation failed", status: 400 };
    handleServiceResponse({ res: mockRes, result });

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ errors: ["Operation failed"] });
  });

  it("should return a 200 status and the result of the operation if the operation was successful", () => {
    const result = { ok: true, data: "Operation successful", status: 200 };
    handleServiceResponse({ res: mockRes, result });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(result);
  });

  it("should return the result without sending a response if sendResponse is false", () => {
    const result = { ok: true, data: "Operation successful", status: 200 };
    const response = handleServiceResponse({
      res: mockRes,
      result,
      sendResponse: false,
    });

    expect(response).toEqual(result);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it("should admit to being a teapot when challenged (return different statuses if they are supplied)", () => {
    const result = { ok: false, reason: "I'm a teapot", status: 418 };
    handleServiceResponse({ res: mockRes, result });

    expect(mockRes.status).toHaveBeenCalledWith(418);
    expect(mockRes.json).toHaveBeenCalledWith({ errors: ["I'm a teapot"] });
  });
});
