<script setup lang="ts">
  const toast = useToast()
  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()

  const { addMovie } = useMovies()

  const movie = ref<Movie | null>(null)

  const fetchMovieByID = async (): Promise<void> => {
    try {
      const movieId = route.params.id || route.query.movieId

      if (!movieId) {
        toast.error({ title: 'Error', message: 'Invalid Movie ID' })

        await router.push('/')
        return
      }

      const response = await $fetch(
        `https://www.omdbapi.com/?i=${movieId}&apikey=${config.public.omdbApiKey}`
      )

      movie.value = response as Movie

      // Add Movie to local storage
      addMovie(movie.value.imdbID)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error({ title: 'Error', message: error.message })
      } else {
        toast.error({ title: 'Error', message: 'An unexpected error occurred' })
      }
    }
  }

  fetchMovieByID()
</script>

<template>
  <article
    v-if="movie"
    v-motion-pop-bottom
    class="p-6 max-w-2xl sm:max-w-5xl mx-auto bg-white rounded shadow-sm sm:flex sm:gap-5 mb-20"
  >
    <!-- Movie Poster -->
    <div class="sm:w-1/3">
      <img
        :src="movie.Poster"
        :alt="movie.Title"
        class="w-full h-auto rounded shadow mb-4"
      />
    </div>

    <!-- Movie Details -->
    <div class="sm:w-2/3">
      <h1 class="text-3xl font-bold mb-2">{{ movie.Title }}</h1>
      <span class="bg-accent rounded-xl text-white px-2 py-1">{{
        movie.Released
      }}</span>
      <p class="text-gray-600 my-2">{{ movie.Plot }}</p>
      <p><strong>Rating:</strong> {{ movie.imdbRating }}</p>
      <p><strong>Genre:</strong> {{ movie.Genre }}</p>
      <p><strong>Director:</strong> {{ movie.Director }}</p>
      <p><strong>Actors:</strong> {{ movie.Actors }}</p>
    </div>
  </article>
</template>
