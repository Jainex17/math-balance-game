<template>
  <section class="h-screen bg-gradient-to-b from-[#0A0A0B] to-[#131315] py-12 sm:py-16 md:py-24 lg:py-40 min-h-[80vh] sm:h-[91vh] flex items-center">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#E2E2E4] mb-4 sm:mb-6">
          Master Math with
          <span class="text-[#6366F1] block mt-2">Interactive Learning Game</span>
        </h1>
        
        <p class="text-base sm:text-lg md:text-xl text-[#9CA3AF] mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
          Learn math through visual problem-solving using an interactive balance scale. 
          Progress through levels, track your scores, and improve your math skills in a fun way!
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
          <button 
            @click="$router.push('/user-dashboard')"
            class="w-full sm:w-auto bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-colors duration-300 shadow-lg shadow-indigo-500/20">
            Start Playing Now
          </button>
        </div>
      </div>
    </div>
  </section>
</template>