import { useCallback, useRef, useState } from "react";

interface UseLongPressOptions {
  onLongPress: () => void;
  onCancel?: () => void;
  duration?: number;
  onProgress?: (progress: number) => void;
}

export function useLongPress({
  onLongPress,
  onCancel,
  duration = 8000,
  onProgress,
}: UseLongPressOptions) {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const start = useCallback(() => {
    setIsPressing(true);
    setProgress(0);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      onProgress?.(newProgress);
    }, 50);

    timerRef.current = setTimeout(() => {
      onLongPress();
      cleanup();
    }, duration);
  }, [duration, onLongPress, onProgress]);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPressing(false);
    setProgress(0);
  }, []);

  const cancel = useCallback(() => {
    cleanup();
    onCancel?.();
  }, [cleanup, onCancel]);

  const handlers = {
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  };

  return {
    isPressing,
    progress,
    handlers,
    start,
    cancel,
  };
}
