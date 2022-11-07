<template>
  <div class="table-footer box border-none px-3 pb-3">
    <span class="table-pagination">
      <label class="mb-0 hidden-xs">Page Size</label>
      <select class="pagination-size" :value="size" @change="setSize($event)">
        <option v-for="(item, index) in pigeSizeOptions" :value="item" :key="index">
          {{ item }}
        </option>
      </select>
      <p class="mx-auto mb-0 hidden-xs">
        Showing 
        {{ defaultSize * (currentPage - 1) + 1 }} 
        to 
        {{ defaultSize * (currentPage - 1) + pagination.numberOfElements }} 
        of 
        {{ pagination.totalElements }} entries
      </p>
      <div class="page-navigate">
        <button
          class="pagination-page first" data-page="first"
          @click="setPagination(0)" :disabled="currentPage == 1"
        >
          First
        </button>
        <button
          class="pagination-page prev" data-page="prev"
          @click="setPagination(currentPage - 2)" :disabled="currentPage == 1"
        >
          Prev
        </button>
        <span class="pagination-pages hidden-xs">
          <button
            class="pagination-page" v-for="(item, index) in pagination.totalPages"
            :key="index" :class="{ active: currentPage == item }"
            @click="setPagination(index)"
          >
            {{ item }}
          </button>
        </span>
        <span class="pagination-pages mobi-show">
          <button
            class="pagination-page active"
          >
            {{ currentPage }}
          </button>
        </span>
        <button
          class="pagination-page next" data-page="next"
          @click="setPagination(currentPage++)" :disabled="currentPage == pagination.totalPages"
        >
          Next
        </button>
        <button
          class="pagination-page last" data-page="last"
          @click="setPagination(pagination.totalPages - 1)" :disabled="currentPage == pagination.totalPages"
        >
          Last
        </button>
      </div>
    </span>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  props: [
    "page",
    "size",
    "pagination",
    // "number",
    // "numberOfElements",
    // "totalPages",
    // "totalElements",
    // "first",
    // "last",
  ],
  setup(props, { emit }) {
    const defaultSize = ref(props.size ? props.size : "10");
    const currentPage = ref(props.page + 1);

    // click page
    function setPagination(numPage) {
      emit("change-page", numPage);
    }

    function setSize(event) {
      emit("change-size", event.target.value);
    }

    return {
      pigeSizeOptions: ["10", "50", "100"],
      defaultSize: defaultSize, // default
      currentPage,

      setPagination,
      setSize,
    };
  },
  beforeUpdate() {
    this.currentPage = this.page + 1;
  },
};
</script>
<style lang="scss">

</style>
