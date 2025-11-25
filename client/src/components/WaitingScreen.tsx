import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WaitingScreenProps {
  onCancel: () => void;
}

export function WaitingScreen({ onCancel }: WaitingScreenProps) {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center space-y-6 px-4">
        <div className="flex justify-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Finding someone for you...</h2>
          <p className="text-muted-foreground">This usually takes just a few seconds</p>
        </div>
        <Button
          variant="outline"
          onClick={onCancel}
          data-testid="button-cancel-matching"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
