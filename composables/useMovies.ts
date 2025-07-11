export const useMovies = (): {
  isLoaded: Ref<boolean>
  viewedMovies: Ref<string[]>
  hasViewedMovies: Ref<boolean>
  addMovie: (movieId: string) => void
} => {
  const viewedMovies = useState<string[]>('viewed-movies', () => [])
  const isLoaded = ref<boolean>(false)

  const hasViewedMovies = computed<boolean>(
    () => isLoaded.value && viewedMovies.value.length > 0
  )

  const loadFromStorage = (): void => {
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsedMovies = JSON.parse(stored)
          viewedMovies.value = parsedMovies
        } else {
          viewedMovies.value = [...prePopulatedMovieIds]
        }
      } catch (error) {
        console.warn('Failed to load viewed movies from localStorage:', error)
      }
    }
  }

  const saveToStorage = (): void => {
    if (import.meta.client) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedMovies.value))
      } catch (error) {
        console.warn('Failed to save viewed movies to localStorage:', error)
      }
    }
  }

  const addMovie = (movieId: string): void => {
    const movieAlreadyViewed = viewedMovies.value.find((vM) => vM === movieId)

    if (movieAlreadyViewed) {
      // Move to front

      viewedMovies.value = [
        movieAlreadyViewed,
        ...viewedMovies.value.filter((vM) => vM !== movieId)
      ]
    } else {
      viewedMovies.value.unshift(movieId)

      //   Check if viewedMovies count is greater than 5. If yes, then remove the last entry from array
      if (viewedMovies.value.length > 5) {
        viewedMovies.value.pop()
      }
    }

    saveToStorage()
  }

  onMounted(() => {
    loadFromStorage()
  })

  return {
    isLoaded,
    viewedMovies,
    hasViewedMovies,
    addMovie
  }
}
