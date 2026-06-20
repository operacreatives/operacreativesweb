import { describe, expect, it } from "vitest";
import { validateContact } from "@/lib/contact";

describe("contact validation", () => {
  it("rejects incomplete values", () => {
    expect(validateContact({ name: "A", email: "nope", company: "", message: "short" })).toEqual({
      name: "Tell us your name.",
      email: "Enter a valid email address.",
      message: "Share at least 20 characters about the project.",
    });
  });

  it("accepts a complete local preview", () => {
    expect(
      validateContact({
        name: "Mira Sen",
        email: "mira@example.com",
        company: "OC",
        message: "We need a new identity for an unusual cultural project.",
      }),
    ).toEqual({});
  });
});
