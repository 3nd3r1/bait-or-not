import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Component example", () => {
    it("should render a simple element", () => {
        render(<div data-testid="hello">Hello World</div>);
        expect(screen.getByTestId("hello")).toHaveTextContent("Hello World");
    });
});
