import { Preferences, SetOptions, GetOptions, RemoveOptions } from '@capacitor/preferences';

// JSON "set" example
const setToken = async () => {
  await Preferences.set({
    key: 'name',
    value: 'Max',
  });
};

// JSON "get" example
const getToken = async () => {
  const { value } = await Preferences.get({ key: 'name' });
  console.log(`Hello ${value}!`);
}