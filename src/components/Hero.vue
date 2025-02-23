<template>
  <section class="bg-gradient-to-b from-[#0A0A0B] to-[#131315] py-16 md:py-40 h-[91vh]">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E2E2E4] mb-6">
          Master Math with
          <span class="text-[#6366F1] block mt-2">Interactive Learning Game</span>
        </h1>
        
        <p class="text-lg md:text-xl text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
          Learn math through visual problem-solving using an interactive balance scale. 
          Progress through levels, track your scores, and improve your math skills in a fun way!
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            @click="$router.push('/user-dashboard')"
            class="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-lg shadow-indigo-500/20">
            Start Playing Now
          </button>
        </div>
      </div>
    </div>
  </section>
</template>