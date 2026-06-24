import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { VimeoGrid } from "@/components/VimeoGrid";

vi.mock("next/image", () => ({
  default: ({ alt, fill: _fill, unoptimized: _unoptimized, src, ...props }: React.ComponentProps<"img"> & {
    fill?: boolean;
    unoptimized?: boolean;
  }) => <img alt={alt} src={src} {...props} />,
}));

describe("VimeoGrid interactions", () => {
  it("keeps the hover preview non-interactive so card clicks can open the lightbox", () => {
    render(<VimeoGrid />);

    const card = screen.getByLabelText("Open Vimeo video 1203214001");
    fireEvent.mouseEnter(card);

    expect(screen.getByTitle("Preview 1203214001")).toHaveStyle({ pointerEvents: "none" });

    fireEvent.click(card);

    expect(screen.getByRole("dialog", { name: "Vimeo video player" })).toBeInTheDocument();
  });
});
