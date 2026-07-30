import { render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup } from "@testing-library/react";
import { CollaborateForm } from "@/components/CollaborateForm";

afterEach(cleanup);

describe("CollaborateForm", () => {
  it("renders a single Book a Scene CTA button", () => {
    const { getByRole } = render(<CollaborateForm />);

    const cta = getByRole("button", { name: /book a scene/i });
    expect(cta).toBeInTheDocument();
  });

  it("offers an email fallback", () => {
    const { getByRole } = render(<CollaborateForm />);

    expect(getByRole("link", { name: /email us/i })).toHaveAttribute(
      "href",
      "mailto:hi@operacreatives.com",
    );
  });
});
