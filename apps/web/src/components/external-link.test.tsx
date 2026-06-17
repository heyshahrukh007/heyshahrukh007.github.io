import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExternalLink } from "@/components/external-link";

describe("ExternalLink", () => {
  it("renders external link with screen reader hint", () => {
    render(
      <ExternalLink href="https://github.com/heyshahrukh007">GitHub</ExternalLink>,
    );

    const link = screen.getByRole("link", { name: /GitHub.*opens in new tab/i });
    expect(link).toHaveAttribute("href", "https://github.com/heyshahrukh007");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("rejects internal URLs", () => {
    expect(() =>
      render(<ExternalLink href="/about">About</ExternalLink>),
    ).toThrow("ExternalLink only supports external http(s) URLs");
  });
});
