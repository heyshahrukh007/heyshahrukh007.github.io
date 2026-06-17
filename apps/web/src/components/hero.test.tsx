import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Hero from "@/components/hero";
import { hero } from "@/lib/site";

describe("Hero", () => {
  it("renders headline, subheadline, and summary", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { level: 1, name: hero.headline })).toBeInTheDocument();
    expect(screen.getByText(hero.subheadline)).toBeInTheDocument();
    expect(screen.getByText(hero.summary)).toBeInTheDocument();
  });

  it("renders enabled CTA buttons", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: /View GitHub/i })).toBeInTheDocument();
  });

  it("renders social links not duplicated in CTAs", () => {
    render(<Hero />);

    expect(screen.queryByRole("link", { name: /^GitHub/i })).not.toBeInTheDocument();
  });
});
