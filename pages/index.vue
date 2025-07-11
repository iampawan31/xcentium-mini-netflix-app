<script setup lang="ts">
  const config = useRuntimeConfig()

  const movies = ref<Movie[]>([])
  const response = await Promise.all(
    prePopulatedMovieIds.map((id) =>
      $fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${config.public.omdbApiKey}`
      )
    )
  )

  movies.value = response as Movie[]
</script>

<template>
  <div class="">
    <main
      class="flex flex-col gap-4 bg-white rounded shadow-sm py-10 px-2 sm:px-4"
    >
      <h1 class="text-lg sm:text-2xl px-2 sm:px-4">
        Welcome to MiniFlix. Click on a movie poster below to view movie details
      </h1>
      <div
        v-if="movies.length > 0"
        class="p-2 sm:p-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid md:grid-cols-5 gap-5"
      >
        <MovieCard
          v-for="movie in movies"
          :key="movie.imdbID"
          :movie="movie"
        />
      </div>
      <div
        v-else
        class=""
      >
        <div class="h-48 text-2xl">No results found.</div>
      </div>
    </main>
  </div>
</template>
