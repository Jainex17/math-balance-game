import { auth } from '../services/firebase';
import { useGameStore } from '../store/gameStore';

export const handleSignOut = async () => {
  const gameStore = useGameStore();
  gameStore.reset();
  await auth.signOut();
};
