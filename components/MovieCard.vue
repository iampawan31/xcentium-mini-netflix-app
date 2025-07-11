<script setup lang="ts">
  const { movie } = defineProps({ movie: Object })

  const movieLink = `/movies/details/${movie.imdbID}`
</script>

<template>
  <NuxtLink
    :to="movieLink"
    class="movie-card-wrapper"
  >
    <img
      :src="movie.Poster"
      :alt="movie.Title"
      class="movie-card-image"
    />
  </NuxtLink>
</template>
