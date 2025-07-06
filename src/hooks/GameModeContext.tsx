import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-context'; // Import useAuth
import { supabase } from '@/integrations/supabase/client'; // Import supabase client

interface GameModeContextType {
  isGameModeEnabled: boolean;
  toggleGameMode: () => Promise<void>; // toggleGameMode is now async
  timeRemaining: number; // Time in milliseconds until toggle is re-enabled
  isUpdating: boolean; // New loading state
}

const GameModeContext = createContext<GameModeContextType | undefined>(undefined);

const LOCKOUT_DURATION = 90 * 60 * 1000; // 90 minutes in milliseconds

export const GameModeProvider = ({ children }: { children: ReactNode }) => {
  const { user, profile, loading: authLoading, refreshProfile } = useAuth(); // Get user, profile, and refreshProfile from AuthContext
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false); // Initialize new loading state

  // Derive game mode state from user profile
  const isGameModeEnabled = profile?.game_mode_enabled ?? true; // Default to true if profile not loaded or value is null
  const gameModeDisabledTimestamp = profile?.game_mode_disabled_timestamp ? new Date(profile.game_mode_disabled_timestamp).getTime() : null;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isGameModeEnabled && gameModeDisabledTimestamp) { // Only calculate if game mode is disabled and a timestamp exists
      const calculateTimeRemaining = () => {
        const now = Date.now();
        const elapsed = now - gameModeDisabledTimestamp;
        const remaining = LOCKOUT_DURATION - elapsed;
        if (remaining > 0) {
          setTimeRemaining(remaining);
          timer = setTimeout(calculateTimeRemaining, 1000); // Update every second
        } else {
          setTimeRemaining(0);
        }
      };
      calculateTimeRemaining();
    } else {
      setTimeRemaining(0);
    }

    return () => clearTimeout(timer);
  }, [isGameModeEnabled, gameModeDisabledTimestamp]);

  const toggleGameMode = async () => {
    if (!user || authLoading || isUpdating) { // Prevent multiple clicks while updating
      console.warn("User not logged in, auth still loading, or update in progress. Cannot toggle game mode.", { user, authLoading, isUpdating });
      return;
    }

    console.log("Setting isUpdating to true");
    setIsUpdating(true); // Set loading state to true

    const newGameModeState = !isGameModeEnabled;
    let newTimestamp: string | null = null;

    if (!newGameModeState) { // If trying to disable game mode
      newTimestamp = new Date().toISOString(); // Set current timestamp
    } else { // If trying to enable game mode
      if (gameModeDisabledTimestamp) {
        const now = Date.now();
        const elapsed = now - gameModeDisabledTimestamp;
        if (elapsed < LOCKOUT_DURATION) {
          // Prevent toggling on if within lockout period
          alert(`Game mode can be re-enabled in ${Math.ceil((LOCKOUT_DURATION - elapsed) / (60 * 1000))} minutes.`);
          console.log("Setting isUpdating to false (lockout prevented)");
          setIsUpdating(false); // Reset loading state
          return; // Do not proceed with update
        }
      }
      // If allowed to enable, clear timestamp
      newTimestamp = null;
    }

    // Update Supabase
    const { error } = await supabase
      .from('profiles')
      .update({
        game_mode_enabled: newGameModeState,
        game_mode_disabled_timestamp: newTimestamp,
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating game mode:', error);
      alert('Failed to update game mode. Please try again.');
    } else {
      // If update is successful, trigger a profile refresh in AuthProvider
      await refreshProfile();
    }
    console.log("Setting isUpdating to false (update complete)");
    setIsUpdating(false); // Reset loading state after update (success or error)
  };

  return (
    <GameModeContext.Provider value={{ isGameModeEnabled, toggleGameMode, timeRemaining, isUpdating }}>
      {children}
    </GameModeContext.Provider>
  );
};

export const useGameMode = () => {
  const context = useContext(GameModeContext);
  if (context === undefined) {
    throw new Error('useGameMode must be used within a GameModeProvider');
  }
  return context;
};
