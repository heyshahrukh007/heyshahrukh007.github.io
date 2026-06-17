import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePlaceholder from "@/components/home-placeholder";

describe("HomePlaceholder", () => {
  it("renders visitor-friendly placeholder copy", () => {
    render(<HomePlaceholder />);

    expect(
      screen.getByText(
        "Portfolio coming soon. Experience, projects, articles, and contact sections are on the way.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/TASK-/)).not.toBeInTheDocument();
  });
});
