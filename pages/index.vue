<script setup lang="ts">
  import { useOmdbTitlesStore } from '~/store/useOmdbTitlesStore'

  const config = useRuntimeConfig()
  const { hasTitles, titles } = storeToRefs(useOmdbTitlesStore())

  const { data } = await useFetch(
    `${config.public.apiBaseUrl}/?apiKey=${config.public.omdbAPIKey}&s`
  )
</script>

<template>
  <div class="">
    <main>
      <div
        v-if="hasTitles"
        class=""
      >
        <MovieCard
          v-for="title in titles"
          :key="title.imdbID"
          :title="title"
        />
      </div>
      <div
        v-else
        class=""
      >
        <div class="">No results found. Please search for a title</div>
      </div>
    </main>
  </div>
</template>
