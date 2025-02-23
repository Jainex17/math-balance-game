<template>
  <div class="bg-[#0A0A0B] min-h-screen">
    <div class="p-6">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-[#E2E2E4] mb-6">
          Welcome back, {{ auth.currentUser?.displayName }}!
        </h1>
      </div>

      <div class="bg-[#18181B] rounded-lg shadow-lg p-6 mb-8 border border-[#27272A]">
        <h2 class="text-xl font-bold text-[#E2E2E4] mb-4">Level Progress</h2>
        <div class="w-full bg-[#27272A] rounded-full h-4">
          <div
            class="bg-[#4F46E5] rounded-full h-4 transition-all duration-500"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <div class="mt-2 text-sm text-gray-400">
          {{ progressPercentage.toFixed(1) }}% Complete
        </div>
      </div>

      <div class="bg-[#18181B] rounded-lg shadow-lg p-6 mb-8 border border-[#27272A]">
        <h2 class="text-xl font-bold text-gray-100 mb-4">Levels</h2>

        <div class="relative max-w-4xl w-full mx-auto">
          <div class="grid grid-cols-5 gap-6 p-4">
            <button
              v-for="level in levels"
              :key="level.levelNumber"
              @click="startLevel(level.levelNumber)"
              :disabled="!gameStore.isLevelUnlocked(level.levelNumber)"
              :class="[
                'aspect-square w-32 relative group transition-all duration-300',
                !gameStore.isLevelUnlocked(level.levelNumber)
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer hover:scale-105 hover:shadow-xl',
              ]"
            >
              <div
                class="absolute inset-0 rounded-xl border-2 border-[#3F3F46] shadow-lg overflow-hidden"
                :class="[
                  gameStore.isLevelUnlocked(level.levelNumber)
                    ? 'bg-gradient-to-br from-[#27272A] to-[#18181B]'
                    : 'bg-[#27272A]',
                  level.completed ? 'border-[#4F46E5]' : '',
                ]"
              >
                <div
                  class="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <span class="text-3xl font-bold text-gray-100 mb-1">
                    {{ level.completed ? "✓" : level.levelNumber }}
                  </span>
                  <div class="text-xs text-gray-400">Level</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useGameStore } from "../store/gameStore";
import { useRouter } from "vue-router";
import { auth } from "../services/firebase";

const router = useRouter();
const gameStore = useGameStore();

onMounted(async () => {
  if (auth.currentUser) {
    await gameStore.initializeFromFirebase();
  } else {
    gameStore.reset();
  }
});

watch(() => auth.currentUser, async (newUser, oldUser) => {
  if (oldUser && !newUser) {
    gameStore.reset();
  } else if (newUser) {
    gameStore.reset();
    await gameStore.initializeFromFirebase();
  }
}, { immediate: true });

const levels = computed(() => gameStore.levels);
const completedLevels = computed(() => gameStore.completedLevels);
const progressPercentage = computed(
  () => (completedLevels.value / gameStore.levels.length) * 100
);

const startLevel = (level: number) => {
  if (gameStore.isLevelUnlocked(level)) {
    router.push(`/game/${level}`);
  }
};
</script>
