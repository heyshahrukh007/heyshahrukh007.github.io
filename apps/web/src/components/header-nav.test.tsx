import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import HeaderNav from "@/components/header-nav";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

describe("HeaderNav", () => {
  it("marks the active route", () => {
    render(<HeaderNav />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("aria-current", "page");
  });
});
