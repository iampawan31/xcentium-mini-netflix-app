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
    class="block bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden p-2 transition-all"
  >
    <article v-motion-pop-bottom>
      <img
        :src="movie.Poster"
        :alt="movie.Title"
        class="w-full h-full md:h-96 relative object-cover rounded-lg overflow-hidden hover:shadow-xl hover:scale-110 transition-all"
      />
    </article>
  </NuxtLink>
</template>
