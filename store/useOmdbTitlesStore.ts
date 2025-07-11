export const useOmdbTitlesStore = defineStore('omdbTitles', () => {
  const toast = useToast()

  const recentlyViewedTitles: RecentlyViewedTitles = []

  const titles: Title[] = []

  const hasTitles = computed<boolean>(() => titles.length > 0)

  const fetchTitleById = async (movieId: string): Promise<void> => {
    try {
      console.log(movieId)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchTitlesByQuery = async (query: string): Promise<void> => {
    try {
      console.log(query)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return {
    // State
    recentlyViewedTitles,
    titles,

    // Getters
    hasTitles,

    // Actions
    fetchTitleById,
    fetchTitlesByQuery
  }
})
