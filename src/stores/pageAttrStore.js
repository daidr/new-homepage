import { defineStore } from "pinia";
import { ref } from "vue";

export const usePageAttrStore = defineStore("page-attr", () => {
  const pageLoadingState = ref(true);
  const setPageLoadingState = (state) => {
    pageLoadingState.value = state;
  };

  const pageHasLoadingState = ref(false);
  const setPageHasLoadingState = (state) => {
    pageHasLoadingState.value = state;
  };

  const routerWrapperSelector = ref(["", ""]);
  const setRouterWrapperSelector = (from, to) => {
    routerWrapperSelector.value = [
      from.meta.calcContainer,
      to.meta.calcContainer,
    ];
  };

  return {
    pageLoadingState,
    setPageLoadingState,
    pageHasLoadingState,
    setPageHasLoadingState,
    routerWrapperSelector,
    setRouterWrapperSelector,
  };
});
