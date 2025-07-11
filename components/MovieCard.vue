<script setup lang="ts">
  const { movie } = defineProps({
    movie: {
      type: Object as PropType<Movie>,
      required: true
    }
  })

  const movieLink = `/movie/details/${movie.imdbID}`
</script>

<template>
  <NuxtLink
    :to="movieLink"
    class="movie-card-wrapper"
  >
    <article v-motion-pop-bottom>
      <img
        :src="movie.Poster"
        :alt="movie.Title"
        class="movie-card-image"
      />
    </article>
  </NuxtLink>
</template>
