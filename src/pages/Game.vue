<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'
import { useGameStore } from '../store/gameStore'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const gameStore = useGameStore()
const scaleElement = ref(null)
const showInstructions = ref(false)

const router = useRouter()

const navigateToDashboard = () => {
  gameStore.showLevelComplete = false;
  router.push('/user-dashboard')
}

const moveToNextLevel = async () => {
  await gameStore.moveToNextLevel()
}

onMounted(() => {
  const levelId = Number(route.params.level) || 1
  gameStore.initializeLevel(levelId)
})

const numbers = computed(() => gameStore.numberChoices)
const targetNumber = computed(() => gameStore.targetNumber)
const selectedNumbers = computed(() => gameStore.selectedNumbers)

// Scale motion setup
const scaleMotion = useMotion(scaleElement, {
  initial: { 
    rotate: 0,
    transition: { duration: 600, ease: 'easeInOut' }
  },
  tilt: { 
    rotate: 10,
    transition: { duration: 600, ease: 'easeInOut' }
  },
  balance: { 
    rotate: 0,
    transition: { duration: 600, ease: 'easeInOut' }
  },
  wrong: { 
    rotate: -10,
    transition: { duration: 600, ease: 'easeInOut' }
  }
})

const selectNumber = (num: number) => {
  gameStore.selectNumber(num)
  updateScale()
}

const sum = computed(() => selectedNumbers.value.reduce((a, b) => a + b, 0))

const updateScale = () => {
  if (selectedNumbers.value.length === 0) {
    scaleMotion.apply('initial')
  } else if (sum.value < targetNumber.value) {
    scaleMotion.apply('tilt')
  } else if (sum.value > targetNumber.value) {
    scaleMotion.apply('wrong')
  } else {
    scaleMotion.apply('balance')
  }
}

const toggleInstructions = () => {
  showInstructions.value = !showInstructions.value
}

</script>

<template>
  <div class="bg-[#0A0A0B] py-2 px-20 font-sans">
   
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-4">
        <h1 class="text-2xl font-bold text-indigo-400">Level {{ gameStore.currentLevel }}</h1>
        <div class="flex items-center gap-2">
          <div class="text-gray-400">Round {{ gameStore.currentRound }}/5</div>
          <div class="w-32 h-2 bg-[#18181B] rounded-full">
            <div 
              class="h-full bg-indigo-500 rounded-full transition-all duration-300"
              :style="{ width: `${gameStore.currentRoundProgress}%` }"
            ></div>
          </div>
        </div>
      </div>
      <div class="flex gap-4">
        <button 
          @click="toggleInstructions"
          class="p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <span class="text-xl">ℹ️</span>
        </button>
      </div>
    </div>

   
    <div class="w-full">
     
   
      <div class="bg-[#18181B] rounded-2xl shadow-xl py-5 backdrop-blur-sm">
        
        <div v-if="showInstructions" class="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div class="fixed z-10 inset-0 bg-gray-900 bg-opacity-90"></div>

          <div class="bg-gray-800 z-50 rounded-2xl p-6 max-w-lg">
            <h2 class="text-2xl font-bold text-indigo-400 mb-4">How to Play</h2>
            <ul class="space-y-3 text-gray-300 mb-6">
              <li class="flex items-start">
                <span class="text-indigo-400 mr-2">1.</span>
                <span>Find two numbers that add up to the target number</span>
              </li>
              <li class="flex items-start">
                <span class="text-indigo-400 mr-2">2.</span>
                <span>Click on numbers to select them (you can select up to 2)</span>
              </li>
              <li class="flex items-start">
                <span class="text-indigo-400 mr-2">3.</span>
                <span>Click a selected number to deselect it</span>
              </li>
              <li class="flex items-start">
                <span class="text-indigo-400 mr-2">4.</span>
                <span>Watch the scale to see if your numbers equal the target</span>
              </li>
            </ul>
            <button 
              @click="toggleInstructions" 
              class="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Let's Play!
            </button>
          </div>
        </div>
        
        <div ref="scaleElement" class="relative h-64 mb-12 transition-all duration-300">
         
          <div class="absolute left-1/2 bottom-0 -translate-x-1/2 w-20 h-32 bg-gradient-to-b from-indigo-700 to-indigo-900 rounded-b-2xl shadow-lg">
         
            <div class="absolute left-1/2 top-1/3 -translate-x-1/2 w-16 h-3 bg-indigo-500 rounded-full"></div>
            <div class="absolute left-1/2 top-2/3 -translate-x-1/2 w-16 h-3 bg-indigo-500 rounded-full"></div>
          </div>
          
         
          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-lg h-8 bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-800 rounded-full shadow-lg overflow-hidden">
         
            <div class="absolute inset-y-0 left-0 w-full flex justify-between items-center px-8">
              <div v-for="i in 9" :key="i" class="h-3 w-1 bg-indigo-200 rounded-full"></div>
            </div>
          </div>
          
          
          <div 
            class="absolute left-1/4 transform -translate-x-1/2 top-0 transition-all duration-600"
            :style="{
              transform: `translateY(${selectedNumbers.length ? (sum < targetNumber ? 10 : (sum > targetNumber ? 50 : 30)) : 30}px)`
            }"
          >
            <div class="w-1 h-16 bg-indigo-300 mx-auto"></div>
            <div class="w-32 h-32 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full -mt-2 flex items-center justify-center shadow-lg border-4 border-indigo-300">
              <div class="text-center">
                <div v-if="selectedNumbers.length === 0" class="text-white text-opacity-50 text-lg">Select<br>numbers</div>
                <div v-else class="space-y-1">
                  <div v-for="(num, index) in selectedNumbers" :key="index" class="text-3xl font-bold text-white">
                    {{ num }}
                  </div>
                  <div v-if="selectedNumbers.length > 1" class="border-t border-white border-opacity-30 pt-1">
                    <span class="text-2xl font-bold text-white">{{ sum }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            class="absolute right-1/4 transform translate-x-1/2 top-0 transition-all duration-600"
            :style="{
              transform: `translateY(${selectedNumbers.length ? (sum < targetNumber ? 50 : (sum > targetNumber ? 10 : 30)) : 30}px)`
            }"
          >
            <div class="w-1 h-16 bg-indigo-300 mx-auto"></div>
            <div class="w-32 h-32 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full -mt-2 flex items-center justify-center shadow-lg border-4 border-indigo-300">
              <span class="text-4xl font-bold text-white">{{ targetNumber }}</span>
            </div>
          </div>
        </div>

        <!-- Number buttons grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
          <button
            v-for="num in numbers"
            :key="num"
            @click="selectNumber(num)"
            class="relative group p-4 sm:p-6 text-2xl sm:text-3xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105"
            :class="[
              selectedNumbers.includes(num)
                ? [
                    'text-white shadow-inner scale-95',
                    gameStore.isSuccess ? 'bg-green-600 animate-success' : 'bg-indigo-700'
                  ]
                : 'bg-[#27272A] text-indigo-200 shadow-lg hover:shadow-xl'
            ]"
            :disabled="gameStore.isSuccess"
            :aria-pressed="selectedNumbers.includes(num)"
          >
            <span class="relative z-10">{{ num }}</span>
          </button>
        </div>

        <!-- Level Complete Popup -->
        <div v-if="gameStore.showLevelComplete" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div class="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 class="text-3xl font-bold text-indigo-400 mb-4">Level Complete! 🎉</h2>
            <p class="text-gray-300 mb-6">Congratulations! You've completed level {{ gameStore.currentLevel }}!</p>
            
            <div class="flex gap-4">
              <button
                @click="moveToNextLevel"
                v-if="gameStore.currentLevel < gameStore.levels.length"
                class="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                Next Level
              </button>
              <button
                @click="navigateToDashboard"
                class="flex-1 py-3 rounded-xl bg-gray-600 text-white font-semibold hover:bg-gray-700 transition-colors"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  </div>
</template>

<style>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0) scale(1.1); }
  50% { transform: translateY(-10px) scale(1.1); }
}

.animate-shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

.animate-bounce {
  animation: bounce 1s ease infinite;
}

button, 
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

@keyframes success {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes successText {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}

.animate-success {
  animation: success 1.5s ease;
}

.animate-success-text {
  animation: successText 1.5s ease;
}
</style>
