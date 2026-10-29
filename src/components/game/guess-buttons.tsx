import type { Label } from "@/validators/post";

import { Button } from "@/components/ui/button";

const GuessButtons = ({ onGuess }: { onGuess: (label: Label) => void }) => {
    return (
        <div className="grid grid-cols-2 gap-3">
            <Button
                variant="outline"
                className="h-14 text-base"
                onClick={() => onGuess("bait")}
            >
                Bait
            </Button>
            <Button
                variant="outline"
                className="h-14 text-base"
                onClick={() => onGuess("genuine")}
            >
                Genuine
            </Button>
        </div>
    );
};

export default GuessButtons;
