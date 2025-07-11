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
    <main class="flex flex-col gap-4">
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
        <BaseCard>
          <div class="h-48 text-2xl">No results found.</div>
        </BaseCard>
      </div>
    </main>
  </div>
</template>
