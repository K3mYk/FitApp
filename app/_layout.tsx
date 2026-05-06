import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import { runMigrations } from "../database/migrations";

// Zapobiega automatycznemu ukrywaniu ekranu powitalnego
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [dbLoaded, setDbLoaded] = useState(false);

 useEffect(() => {
    async function setup() {
      try {
        // --- TESTOWE OPÓŹNIENIE ---
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        // --------------------------

        await runMigrations();
        setDbLoaded(true);
      } catch (e) {
        console.warn("Błąd bazy danych:", e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    setup();
  }, []);
  // Jeśli baza się jeszcze ładuje nie renderujemy nic (SplashScreen wciąż widać)
  if (!dbLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
    </Stack>
  );
}