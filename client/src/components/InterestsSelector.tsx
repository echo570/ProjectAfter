import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INTERESTS_LIST } from "@shared/schema";
import { X } from "lucide-react";

interface InterestsSelectorProps {
  onSelect: (interests: string[]) => void;
  isLoading?: boolean;
}

export function InterestsSelector({ onSelect, isLoading = false }: InterestsSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (interest: string) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter(i => i !== interest));
    } else if (selected.length < 5) {
      setSelected([...selected, interest]);
    }
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      onSelect(selected);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">What are your interests?</h2>
        <p className="text-muted-foreground">
          Select up to 5 interests to match with people who share them
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {INTERESTS_LIST.map((interest) => (
          <button
            key={interest}
            onClick={() => handleToggle(interest)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selected.includes(interest)
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover-elevate"
            }`}
            disabled={isLoading || (selected.length >= 5 && !selected.includes(interest))}
            data-testid={`button-interest-${interest}`}
          >
            {interest}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((interest) => (
            <Badge key={interest} variant="default" className="flex items-center gap-2">
              {interest}
              <button
                onClick={() => setSelected(selected.filter(i => i !== interest))}
                className="ml-1 hover:opacity-70"
                data-testid={`button-remove-interest-${interest}`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <Button
        size="lg"
        onClick={handleContinue}
        disabled={selected.length === 0 || isLoading}
        className="w-full"
        data-testid="button-interests-continue"
      >
        {isLoading ? "Starting..." : `Start Chatting (${selected.length}/5 selected)`}
      </Button>

      {selected.length === 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Select at least 1 interest to continue
        </p>
      )}
    </div>
  );
}
