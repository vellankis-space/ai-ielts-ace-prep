import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useGameMode } from '@/hooks/GameModeContext';
import { useToast } from '@/components/ui/use-toast';
import { Timer } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const GameModeToggle = () => {
  const { isGameModeEnabled, toggleGameMode, timeRemaining, isUpdating } = useGameMode();
  const { toast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  console.log("GameModeToggle - isUpdating:", isUpdating);

  const handleToggleChange = () => {
    if (isUpdating) return; // Prevent interaction while updating

    if (isGameModeEnabled) { // If currently enabled, trying to disable
      setShowConfirmDialog(true); // Show confirmation dialog
    } else if (!isGameModeEnabled && timeRemaining > 0) { // If trying to turn ON and locked
      const minutes = Math.ceil(timeRemaining / (60 * 1000));
      toast({
        title: "Game Mode Locked",
        description: `Game mode can be re-enabled in ${minutes} minutes.`, 
        variant: "destructive",
      });
    } else {
      toggleGameMode(); // Allow turning on if not locked
    }
  };

  const handleConfirmTurnOff = async () => {
    await toggleGameMode(); // Proceed with turning off and wait for it to complete
    setShowConfirmDialog(false);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let timeString = '';
    if (hours > 0) timeString += `${hours}h `;
    if (minutes > 0) timeString += `${minutes}m `;
    if (seconds > 0 && hours === 0) timeString += `${seconds}s`; // Only show seconds if less than an hour
    return timeString.trim();
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Label htmlFor="game-mode">Game Mode</Label>
        <Switch
          id="game-mode"
          checked={isGameModeEnabled}
          onCheckedChange={handleToggleChange}
          disabled={isUpdating} // Disable switch while updating
        />
        {!isGameModeEnabled && timeRemaining > 0 && (
          <div className="flex items-center space-x-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">
            <Timer className="w-3 h-3" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        )}
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Game Mode Deactivation</AlertDialogTitle>
            <AlertDialogDescription>
              Turning off Game Mode will prevent you from re-enabling it for the next 90 minutes. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmTurnOff} disabled={isUpdating}>Turn Off</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default GameModeToggle;
