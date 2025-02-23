<template>
  <div class="min-h-screen bg-gradient-to-b from-[#0A0A0B] to-[#131315] flex items-center justify-center p-4">
    <div class="w-full max-w-md space-y-6 md:space-y-8 bg-[#18181B] p-4 md:p-8 rounded-xl shadow-2xl border border-[#27272A]">
      <div v-if="errorMsg" class="bg-red-500 text-white p-3 md:p-4 rounded-lg mb-4 flex justify-between items-center text-sm md:text-base">
        <span>{{ errorMsg }}</span>
        <button @click="errorMsg = ''" class="text-white hover:text-gray-200">
          ×
        </button>
      </div>

      <div class="text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">Create Account</h2>
        <p class="text-sm md:text-base text-gray-400">Join us to start your learning journey</p>
      </div>

      <form @submit.prevent="handleEmailSignUp" class="space-y-4 md:space-y-6 mt-6 md:mt-8">
        <div>
          <label for="name" class="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">Full Name</label>
          <input
            v-model="name"
            id="name"
            type="text"
            required
            class="w-full px-3 md:px-4 py-2 md:py-3 bg-[#27272A] border border-[#3F3F46] rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent text-[#E2E2E4] placeholder-[#71717A] outline-none transition-colors duration-200 text-sm md:text-base"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label for="email" class="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            required
            class="w-full px-3 md:px-4 py-2 md:py-3 bg-[#27272A] border border-[#3F3F46] rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent text-[#E2E2E4] placeholder-[#71717A] outline-none transition-colors duration-200 text-sm md:text-base"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label for="password" class="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            required
            class="w-full px-3 md:px-4 py-2 md:py-3 bg-[#27272A] border border-[#3F3F46] rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent text-[#E2E2E4] placeholder-[#71717A] outline-none transition-colors duration-200 text-sm md:text-base"
            placeholder="Create a password"
          />
        </div>

        <div class="pt-2">
          <button
            type="submit"
            class="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold px-4 py-2.5 md:py-3 rounded-lg transition-colors duration-300 shadow-lg shadow-indigo-500/20 text-sm md:text-base"
          >
            Sign Up
          </button>
        </div>
      </form>

      <div class="relative my-4">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-600"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-[#18181B] text-gray-400">Or continue with</span>
        </div>
      </div>

      <button
        @click="handleGoogleSignUp"
        class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#3F3F46] rounded-lg hover:bg-[#27272A] text-white font-medium transition-colors duration-200"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign up with Google
      </button>

      <p class="text-center text-gray-400 mt-4 text-sm md:text-base">
        Already have an account?
        <router-link to="/login" class="text-blue-400 hover:text-blue-500 font-medium">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const router = useRouter();

const handleEmailSignUp = async () => {
  try {
    errorMsg.value = "";
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name.value
      });
    }
    
    router.push("/user-dashboard");
  } catch (error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMsg.value = "This email is already registered. Please sign in instead.";
        break;
      case 'auth/weak-password':
        errorMsg.value = "Password should be at least 6 characters long.";
        break;
      case 'auth/invalid-email':
        errorMsg.value = "Please enter a valid email address.";
        break;
      default:
        errorMsg.value = "An error occurred during registration. Please try again.";
    }
    console.error(error);
  }
};

const handleGoogleSignUp = async () => {
  try {
    errorMsg.value = "";
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/user-dashboard");
  } catch (error: any) {
    errorMsg.value = "Failed to sign up with Google. Please try again.";
    console.error(error);
  }
};
</script>
