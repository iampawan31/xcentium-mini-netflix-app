type ReturnType = void | NavigationFailure;

<script setup lang="ts">
  const toast = useToast()
  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()

  const movie = ref()

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

      movie.value = response
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
  <section
    v-if="movie"
    class="p-6 max-w-3xl mx-auto bg-white rounded shadow-sm sm:flex sm:gap-5"
  >
    <!-- Movie Poster -->
    <img
      :src="movie.Poster"
      :alt="movie.Title"
      class="w-full rounded shadow mb-4"
    />

    <!-- Movie Details -->
    <div class="">
      <h1 class="text-2xl font-bold">{{ movie.Title }}</h1>
      <p class="text-gray-600 my-2">{{ movie.Plot }}</p>
      <p><strong>Rating:</strong> {{ movie.imdbRating }}</p>
      <p><strong>Genre:</strong> {{ movie.Genre }}</p>
      <p><strong>Director:</strong> {{ movie.Director }}</p>
    </div>
  </section>
</template>
