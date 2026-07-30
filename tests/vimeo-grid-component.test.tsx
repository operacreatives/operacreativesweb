import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { VimeoMosaic } from "@/components/VimeoMosaic";

vi.mock("next/image", () => ({
  default: ({ alt, fill: _fill, unoptimized: _unoptimized, src, ...props }: React.ComponentProps<"img"> & {
    fill?: boolean;
    unoptimized?: boolean;
  }) => <img alt={alt} src={src} {...props} />,
}));

describe("VimeoMosaic interactions", () => {
  it("keeps the hover preview non-interactive so tile clicks can open the lightbox", () => {
    render(
      <VimeoMosaic
        items={[
          { id: "1203214001", variant: "landscape" },
          { id: "1203214003", variant: "portrait" },
        ]}
      />,
    );

    const tile = screen.getByLabelText("Open Vimeo video 1203214001");
    fireEvent.mouseEnter(tile);

    expect(screen.getByTitle("Preview 1203214001")).toHaveStyle({ pointerEvents: "none" });

    fireEvent.click(tile);

    expect(screen.getByRole("dialog", { name: "Vimeo video player" })).toBeInTheDocument();
  });
});
