import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, WifiOff, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConnectionStatusProps {
  isConnected: boolean;
  isReconnecting: boolean;
  lastDisconnectTime?: number;
}

export function ConnectionStatus({ isConnected, isReconnecting, lastDisconnectTime }: ConnectionStatusProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<'disconnect' | 'reconnect' | 'connected'>('connected');

  useEffect(() => {
    if (isReconnecting && !showNotification) {
      setNotificationType('disconnect');
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isReconnecting]);

  useEffect(() => {
    if (isConnected && lastDisconnectTime && !showNotification) {
      setNotificationType('connected');
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isConnected, lastDisconnectTime]);

  return (
    <>
      {/* Connection Status Badge */}
      <div className="fixed bottom-6 right-6 z-50">
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300",
            isConnected && !isReconnecting
              ? "bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30"
              : isReconnecting
                ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border border-yellow-500/30 animate-pulse"
                : "bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/30"
          )}
          data-testid="connection-status-badge"
        >
          {isConnected && !isReconnecting ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">Connected</span>
            </>
          ) : isReconnecting ? (
            <>
              <RotateCw className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">Reconnecting...</span>
            </>
          ) : (
            <>
              <WifiOff className="w-5 h-5" />
              <span className="text-sm font-medium">Disconnected</span>
            </>
          )}
        </div>
      </div>

      {/* Connection Status Notifications */}
      {showNotification && (
        <div
          className={cn(
            "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300",
            notificationType === 'disconnect'
              ? "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30"
              : notificationType === 'reconnect'
                ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30"
                : "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30"
          )}
          data-testid="connection-status-notification"
        >
          {notificationType === 'disconnect' && (
            <>
              <WifiOff className="w-5 h-5" />
              <span className="font-medium">Server connection lost. Attempting to reconnect...</span>
            </>
          )}
          {notificationType === 'reconnect' && (
            <>
              <RotateCw className="w-5 h-5 animate-spin" />
              <span className="font-medium">Reconnecting to server...</span>
            </>
          )}
          {notificationType === 'connected' && (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Reconnected to server</span>
            </>
          )}
        </div>
      )}
    </>
  );
}
