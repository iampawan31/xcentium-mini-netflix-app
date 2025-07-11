<script setup lang="ts">
  const toast = useToast()
  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()

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
    class="p-6 max-w-3xl mx-auto bg-white rounded shadow-sm sm:flex sm:gap-5 mb-20"
  >
    <!-- Movie Poster -->
    <section>
      <img
        :src="movie.Poster"
        :alt="movie.Title"
        class="w-full rounded shadow mb-4"
      />
    </section>

    <!-- Movie Details -->
    <section>
      <h1 class="text-2xl font-bold">{{ movie.Title }}</h1>
      <p class="text-gray-600 my-2">{{ movie.Plot }}</p>
      <p><strong>Rating:</strong> {{ movie.imdbRating }}</p>
      <p><strong>Genre:</strong> {{ movie.Genre }}</p>
      <p><strong>Director:</strong> {{ movie.Director }}</p>
    </section>
  </article>
</template>
