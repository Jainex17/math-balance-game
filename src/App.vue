<script setup lang="ts">
import Navbar from "./components/NavBar.vue";

</script>

<template>
  <div class="bg-[#0A0A0B] min-h-screen">
    <Navbar />
    <router-view></router-view>
  </div>
</template>
