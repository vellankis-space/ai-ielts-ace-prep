
import React, { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext } from './auth-context';
import { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Memoize fetchProfile to avoid re-creating it on every render
  const fetchProfile = React.useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('game_mode_enabled, game_mode_disabled_timestamp')
        .eq('id', userId)
        .single();

      if (error && error.details.includes('0 rows')) {
        // No profile found, attempt to create one
        console.log(`No profile found for user ${userId}. Attempting to create one.`);
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({ id: userId, game_mode_enabled: true }); // Default values

        if (insertError) {
          console.error('Error creating profile for existing user:', insertError);
          setProfile(null); // Still set to null if creation fails
        } else {
          // Profile created successfully, re-fetch it to get the data
          console.log(`Profile created for user ${userId}. Re-fetching.`);
          const { data: newProfileData, error: newProfileError } = await supabase
            .from('profiles')
            .select('game_mode_enabled, game_mode_disabled_timestamp')
            .eq('id', userId)
            .single();

          if (newProfileError) {
            console.error('Error re-fetching newly created profile:', newProfileError);
            setProfile(null);
          } else {
            setProfile(newProfileData);
          }
        }
      } else if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Caught error fetching profile:', error);
      setProfile(null);
    }
  }, []); // Empty dependency array means this function is created once

  const refreshProfile = React.useCallback(async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]); // Add fetchProfile to dependency array

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null); // Clear profile on sign out
  };

  const value = {
    user,
    session,
    loading,
    signOut,
    profile,
    refreshProfile, // Provide refreshProfile in context
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
