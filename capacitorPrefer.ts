import { Preferences } from '@capacitor/preferences';

// Sauvegarder un token utilisateur
export async function saveToken(token: string): Promise<void> {
  await Preferences.set({ key: 'token', value: token });
  console.log('Token sauvegardé avec succès !');
}

// Récupérer un token utilisateur
export async function getToken(): Promise<string | null> {
  const { value } = await Preferences.get({ key: 'token' });
  console.log('Token récupéré :', value);
  return value; // Retourne le token ou null s'il n'existe pas
}