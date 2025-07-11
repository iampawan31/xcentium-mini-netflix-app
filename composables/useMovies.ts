const viewedMovies = ref<string[]>([])

const loadFromStorage = (): void => {
  if (import.meta.client) {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (stored) {
      viewedMovies.value = JSON.parse(stored)
    }
  }
}

watch(viewedMovies, (newVal) => {
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
  }
})

export const useMovies = (): {
  viewedMovies: Ref<string[]>
  hasViewedMovies: Ref<boolean>
  addMovie: (movieId: string) => void
} => {
  // Load initial values for viewed movies
  loadFromStorage()

  const hasViewedMovies = computed<boolean>(() => viewedMovies.value.length > 0)

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
      viewedMovies.value.pop()
    }
  }

  return {
    viewedMovies,
    hasViewedMovies,
    addMovie
  }
}
