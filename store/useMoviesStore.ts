export const useMoviesStore = defineStore('movies', () => {
  const toast = useToast()
  const config = useRuntimeConfig()
  const { start, set, finish } = useLoadingIndicator()
  const { isLoaded, viewedMovies, hasViewedMovies } = useMovies()

  // State
  const searchQuery = ref<string>('')
  const prePopulatedMovies = ref<Movie[]>([])
  const movies = ref<Movie[]>([])
  const isSearching = ref<boolean>(false)

  // Actions
  const fetchPrepopulatedMovies = async (): Promise<void> => {
    try {
      set(0, { force: true })
      start()

      const response = await Promise.all(
        viewedMovies.value.map((id) =>
          $fetch(
            `https://www.omdbapi.com/?i=${id}&apikey=${config.public.omdbApiKey}`
          )
        )
      )

      prePopulatedMovies.value = response as Movie[]
    } catch (error) {
      if (error instanceof Error) {
        toast.error({ title: 'Error', message: error.message })
      } else {
        toast.error({ title: 'Error', message: 'An unexpected error occurred' })
      }
    } finally {
      finish()
    }
  }

  const fetchMoviesByQueryString = useDebounce(
    async (searchTerm: string): Promise<void> => {
      isSearching.value = true

      try {
        if (searchTerm.length < 3) {
          movies.value = []
          isSearching.value = false

          return
        }

        start()

        const response: OBDBResponse = await $fetch(
          `https://www.omdbapi.com/?s=${searchQuery.value}&apikey=${config.public.omdbApiKey}`
        )

        if (response.Response === 'True') {
          movies.value = response.Search as Movie[]
        } else {
          toast.error({ title: 'Error', message: response.Error })
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error({ title: 'Error', message: error.message })
        } else {
          toast.error({
            title: 'Error',
            message: 'An unexpected error occurred'
          })
        }
      } finally {
        isSearching.value = false
        finish()
      }
    },
    300
  )

  //   Watchers
  watch(
    () => searchQuery.value,
    async (val: string) => {
      await fetchMoviesByQueryString(val)
    },
    {
      immediate: true
    }
  )

  return {
    // State
    movies,
    prePopulatedMovies,
    searchQuery,
    isSearching,

    // Actions
    fetchPrepopulatedMovies
  }
})
