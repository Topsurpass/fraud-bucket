import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import config from "@/@config";
import useAuthUserStore from "@/stores/user-store";
import { formatTime } from "@/lib/helpers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function IdleTimerModal() {
  const [open, setOpen] = useState<boolean>(false);
  // Time before idle
  const [remaining, setRemaining] = useState(config.idleTimeout);
  const logout = useAuthUserStore((state) => state.reset);

  const onPrompt = () => {
    // onPrompt will be called `promptBeforeIdle` milliseconds before `timeout`.
    // In this case 29 minutes and 30 seconds or 30 seconds before idle.
    // Here you can open your prompt.
    // All events are disabled while the prompt is active.
    // If the user wishes to stay active, call the `activate()` method.
    // You can get the remaining prompt time with the `getRemainingTime()` method,
    setOpen(true);
    // setRemaining(promptTimeout);
  };

  const onIdle = () => {
    // onIdle will be called after the timeout is reached.
    // In this case 30 minutes. Here you can close your prompt and
    // perform whatever idle action you want such as logging out your user.
    logout();
    // Events will be rebound as long as `stopOnMount` is not set.
    setOpen(false);
    setRemaining(0);
  };

  const onActive = () => {
    // onActive will only be called if `activate()` is called while `isPrompted()`
    // is true. Here you will also want to close your modal and perform
    // any active actions.
    setOpen(false);
    setRemaining(0);
  };

  const { getRemainingTime, isPrompted, activate } = useIdleTimer({
    timeout: config.idleTimeout,
    promptBeforeIdle: config.promptBeforeIdleTimeOut,
    onPrompt,
    onIdle,
    onActive,
    throttle: 500,
  });

  const handleStillHere = () => {
    setOpen(false);
    activate();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPrompted()) {
        setRemaining(Math.ceil(getRemainingTime() / 1000));
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [getRemainingTime, isPrompted]);

  return (
    <div>
      <AlertDialog open={open} onOpenChange={handleStillHere}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Session Timeout</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col space-y-2">
              <span>Your session is about to expire due to inactivity</span>
              <span>Time remaining: {formatTime(remaining)}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onIdle}>Logout</AlertDialogCancel>
            <AlertDialogAction onClick={handleStillHere}>
              Stay Logged In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
