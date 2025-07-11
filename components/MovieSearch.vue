<script setup lang="ts">
  import { useMoviesStore } from '../store/useMoviesStore'

  const { searchQuery } = storeToRefs(useMoviesStore())
</script>

<template>
  <div>
    <input
      id="search-movie"
      v-model.trim="searchQuery"
      autocomplete="off"
      class="px-2 py-4 bg-accent outline-primary rounded shadow-md w-full text-white"
      type="search"
      name="search"
      placeholder="Search for a movie (min 3 characters)"
      aria-label="Search for a movie"
    />
  </div>
</template>
