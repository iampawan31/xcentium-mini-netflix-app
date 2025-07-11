<script setup lang="ts">
  const config = useRuntimeConfig()

  const movies = ref<Title[]>([])
  const response = await Promise.all(
    prePopulatedMovieIds.map((id) =>
      $fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${config.public.omdbApiKey}`
      )
    )
  )

  movies.value = response as Title[]
</script>

<template>
  <div class="">
    <main class="flex flex-col gap-4 bg-white rounded shadow-sm py-10 px-4">
      <h1 class="text-2xl px-4">
        Welcome to MiniFlix. Click on a movie poster below to view movie details
      </h1>
      <div
        v-if="movies.length > 0"
        class="p-4 grid-cols-1 grid sm:grid-cols-5 gap-5"
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
