<template>
  <div class="table-footer px-3 pb-3">
    <span class="table-pagination">
      <label class="mb-0">Page Size</label>
      <select class="pagination-size" :value="size" @change="setSize($event)">
        <option
          v-for="(item, index) in pigeSizeOptions"
          :value="item"
          :key="index"
        >
          {{ item }}
        </option>
      </select>
      <p class="mx-auto mb-0">
        Showing {{ defaultSize * (currentPage - 1) + 1 }} to
        {{ defaultSize * (currentPage - 1) + numberOfElements }} of
        {{ totalElements }} entries
      </p>
      <button
        class="pagination-page first"
        data-page="first"
        @click="setPagination(0)"
        :disabled="currentPage == 1"
      >
        First
      </button>
      <button
        class="pagination-page prev"
        data-page="prev"
        @click="setPagination(currentPage - 2)"
        :disabled="currentPage == 1"
      >
        Prev
      </button>
      <span class="pagination-pages">
        <button
          class="pagination-page"
          v-for="(item, index) in totalPages"
          :key="index"
          :class="{ active: currentPage == item }"
          @click="setPagination(index)"
        >
          {{ item }}
        </button>
      </span>
      <button
        class="pagination-page next"
        data-page="next"
        @click="setPagination(currentPage++)"
        :disabled="currentPage == totalPages"
      >
        Next
      </button>
      <button
        class="pagination-page last"
        data-page="last"
        @click="setPagination(totalPages - 1)"
        :disabled="currentPage == totalPages"
      >
        Last
      </button>
    </span>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  props: [
    "page",
    "size",
    "number",
    "numberOfElements",
    "totalPages",
    "totalElements",
    "first",
    "last",
  ],
  setup(props, { emit }) {
    const page = ref(props.page);
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
.table-footer {
  margin-top: 0.5rem;
  border-top-width: 0px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  vertical-align: middle;
  border-radius: 20px;

  .table-pagination {
    display: flex;
    align-items: center;
    color: #555;

    .pagination-size {
      background-image: url("@/assets/images/download.svg");
      background-size: 15px;
      background-position: center right 0.6rem;
      display: inline-block;
      border: 1px solid #aaa;
      margin-left: 0.5rem;
      margin-right: auto;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 0.375rem;
      --tw-border-opacity: 1;
      border-color: rgb(var(--color-slate-200) / var(--tw-border-opacity));
      --tw-bg-opacity: 1;
      background-color: rgb(255 255 255 / var(--tw-bg-opacity));
      background-repeat: no-repeat;
      padding: 0.5rem 2rem 0.5rem 0.75rem;
    }

    .pagination-page {
      min-width: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-color: transparent;
      font-weight: 400;
      border-radius: 0.375rem;
      border-width: 1px;
      padding: 0.5rem 0.75rem;
      --tw-shadow: 0 1px 2px 0rgb (0 0 0 / 0.05);
      --tw-shadow-colored: 0 1px 2px 0var (--tw-shadow-color);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
        var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
      margin-left: 0.25rem;
      background-color: #fff;

      &.active,
      &:hover {
        background-color: rgb(241 245 249);
      }
      &.first {
        background-image: url("@/assets/images/first.svg");
        background-size: 50%;
        background-position: center;
        background-repeat: no-repeat;
      }
      &.prev {
        background-image: url("@/assets/images/prev.svg");
        background-size: 45%;
        background-position: center;
        background-repeat: no-repeat;
      }
      &.next {
        background-image: url("@/assets/images/next.svg");
        background-size: 45%;
        background-position: center;
        background-repeat: no-repeat;
      }
      &.last {
        background-image: url("@/assets/images/last.svg");
        background-size: 50%;
        background-position: center;
        background-repeat: no-repeat;
      }
      &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
      }
    }
    .pagination-page[data-page="first"],
    .pagination-page[data-page="prev"],
    .pagination-page[data-page="next"],
    .pagination-page[data-page="last"] {
      width: 1.25rem;
      color: transparent;
    }
  }
}
</style>
