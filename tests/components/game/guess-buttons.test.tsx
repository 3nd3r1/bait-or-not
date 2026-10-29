import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import GuessButtons from "@/components/game/guess-buttons";

describe("GuessButtons", () => {
    it("calls onGuess with the chosen label", () => {
        const onGuess = vi.fn();
        render(<GuessButtons onGuess={onGuess} />);

        fireEvent.click(screen.getByRole("button", { name: "Bait" }));
        fireEvent.click(screen.getByRole("button", { name: "Genuine" }));

        expect(onGuess.mock.calls).toEqual([["bait"], ["genuine"]]);
    });
});
