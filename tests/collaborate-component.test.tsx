import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CollaborateForm } from "@/components/CollaborateForm";

vi.mock("next/image", () => ({
  default: ({ alt, fill: _fill, priority: _priority, src, ...props }: React.ComponentProps<"img"> & {
    fill?: boolean;
    priority?: boolean;
  }) => <img alt={alt} src={src} {...props} />,
}));

describe("CollaborateForm interactions", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("dances for a complete 1.5 seconds before opening Calendly", () => {
    vi.useFakeTimers();
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const { container } = render(<CollaborateForm />);

    fireEvent.click(screen.getByRole("button", { name: /book a scene/i }));

    expect(container.querySelectorAll(".peekaboo-mascot--dancing")).toHaveLength(2);

    act(() => vi.advanceTimersByTime(1_499));
    expect(open).not.toHaveBeenCalled();
    expect(container.querySelectorAll(".peekaboo-mascot--dancing")).toHaveLength(2);

    act(() => vi.advanceTimersByTime(1));
    expect(open).toHaveBeenCalledWith("https://calendly.com/operacreatives", "_blank", "noopener,noreferrer");
    expect(container.querySelectorAll(".peekaboo-mascot--dancing")).toHaveLength(0);
  });
});
