export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-muted text-foreground px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1000ms' }} />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1000ms' }} />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1000ms' }} />
        </div>
      </div>
    </div>
  );
}
