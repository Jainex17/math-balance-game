<template>
  <header class="shadow-lg border-b border-gray-800">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-14 sm:h-16 items-center">
        <div class="flex-shrink-0">
          <h1
            @click="$router.push('/')"
            class="text-sm sm:text-2xl md:text-3xl font-bold tracking-tight flex items-center cursor-pointer transition-colors duration-200 hover:text-indigo-300"
          >
            <span class="rotate-12 inline-block mr-2 sm:mr-3 transform hover:scale-110 transition-transform text-2xl sm:text-3xl">🧮</span>
            <span class="text-white whitespace-nowrap">
              Math Balance Game
            </span>
          </h1>
        </div>

        <div class="flex items-center">
          <button
            v-if="!isLoggedIn"
            @click="$router.push('/login')"
            class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent rounded-md font-semibold text-xs sm:text-sm text-white bg-[#4F46E5] hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg
              class="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              ></path>
            </svg>
            Login
          </button>

          <div v-if="isLoggedIn" class="flex items-center gap-2 sm:gap-4">
            <button
              @click="handleLogout"
              class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent rounded-md font-semibold text-xs sm:text-sm text-white bg-red-600 hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
            <svg
              class="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              ></path>
            </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { auth } from '../services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { handleSignOut } from '../services/auth'

const router = useRouter()
const isLoggedIn = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user
  })
})

async function handleLogout() {
  try {
    await handleSignOut()
    router.push('/')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}
</script>

<style scoped>
.transform {
  transition: transform 0.2s ease-in-out;
}
</style>