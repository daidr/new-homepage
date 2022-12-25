import { defineStore } from "pinia";
import { ref } from "vue";

export const usePageAttrStore = defineStore("page-attr", () => {
  const pageLoadingState = ref(true);
  const setPageLoadingState = (state) => {
    pageLoadingState.value = state;
  };

  return { pageLoadingState, setPageLoadingState };
});
