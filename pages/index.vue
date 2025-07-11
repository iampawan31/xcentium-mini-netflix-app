<script setup lang="ts">
  import { useMoviesStore } from '~/store/useMoviesStore'

  const { isSearching, movies, prePopulatedMovies, searchQuery } = storeToRefs(
    useMoviesStore()
  )
  const { fetchPrepopulatedMovies } = useMoviesStore()

  onMounted(async () => {
    searchQuery.value = ''
    await fetchPrepopulatedMovies()
  })
</script>

<template>
  <div class="">
    <main
      class="flex flex-col gap-4 bg-white rounded shadow-sm py-10 px-2 sm:px-4"
    >
      <h1
        v-motion-pop-bottom
        class="text-lg sm:text-3xl px-2 sm:px-4"
      >
        Welcome to MiniFlix. Click on a movie poster below to view movie details
      </h1>
      <MovieSearch />
      <div v-if="searchQuery">
        <div
          v-if="isSearching"
          class="flex flex-col justify-center items-center h-48 w-full py-10"
        >
          <Icon
            name="material-symbols:downloading"
            size="10rem"
          />
          <div class="h-48 text-2xl">Searching...</div>
        </div>
        <div v-else>
          <div
            v-if="movies.length > 0"
            class="p-2 sm:p-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-5"
          >
            <MovieCard
              v-for="movie in movies"
              :key="movie.imdbID"
              :movie="movie"
            />
          </div>
          <div
            v-else
            class="flex flex-col justify-center items-center h-48 w-full py-10"
          >
            <Icon
              name="material-symbols:cancel-rounded"
              size="10rem"
            />
            <div class="h-48 text-2xl">No results found.</div>
          </div>
        </div>
      </div>
      <div v-else>
        <h2 class="text-xl sm:text-2xl px-2 sm:px-4">Recently Viewed Movies</h2>
        <div
          v-if="prePopulatedMovies.length > 0"
          class="p-2 sm:p-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-5"
        >
          <MovieCard
            v-for="movie in prePopulatedMovies"
            :key="movie.imdbID"
            :movie="movie"
          />
        </div>
      </div>
    </main>
  </div>
</template>
