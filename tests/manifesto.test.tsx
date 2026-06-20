import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ManifestoEcho } from "@/components/ManifestoEcho";

describe("ManifestoEcho", () => {
  it("exposes one semantic paragraph and hides decorative copies", () => {
    const { container } = render(<ManifestoEcho eyebrow="OC" title="A title" manifesto="Only read this once." />);
    expect(container.querySelectorAll('.manifesto-echo__block:not([aria-hidden="true"]) > p:last-child')).toHaveLength(1);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(3);
  });
});
