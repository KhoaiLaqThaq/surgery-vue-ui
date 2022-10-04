<template>
  <div class="list-box-wrapper">
    <div>
      <div class="search-box">
        <input v-model="searchSource" type="text" placeholder="Tìm kiếm..." />
        <div
          v-if="searchSource"
          class="clear-search"
          title="Clear Search"
          @click="searchSource = ''"
        >
          &times;
        </div>
      </div>
      <ul class="list-box">
        <li
          v-for="(item, key) in source
            .map((item, inx) => ({ inx, ...item }))
            .filter((item) =>
              item[label in item ? label : 'label']
                .toLowerCase()
                .includes(searchSource.toLowerCase())
            )"
          v-bind:key="key"
          class="list-item"
          v-bind:style="{ backgroundColor: item.selected ? '#eeeeee' : '' }"
          @click="selectSource(searchSource ? item.inx : key)"
        >
          {{ item[label in item ? label : "label"] }}
        </li>
        <li
          v-if="
            source.filter((item) =>
              item[label in item ? label : 'label']
                .toLowerCase()
                .includes(searchSource.toLowerCase())
            ).length == 0 && source.length
          "
          class="list-item"
        >
          Không tìm thấy kết quả
        </li>
      </ul>
      <div class="bulk-action">
        <div class="btn-action select-all" @click="selectAllSource">
          Chọn tất cả
        </div>
        <div class="btn-action deselect-all" @click="deSelectAllSource">
          Bỏ chọn tất cả
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="btn-action" @click="moveDestination">
        <img src="../assets/images/angle-right-solid.svg" height="18" />
      </div>
      <div class="btn-action" @click="moveAllDestination">
        <img src="../assets/images/angle-double-right-solid.svg" height="18" />
      </div>
      <div class="btn-action" @click="moveSource">
        <img src="../assets/images/angle-left-solid.svg" height="18" />
      </div>
      <div class="btn-action" @click="moveAllSource">
        <img src="../assets/images/angle-double-left-solid.svg" height="18" />
      </div>
    </div>
    <div>
      <div class="search-box">
        <input
          v-model="searchDestination"
          type="text"
          placeholder="Tìm kiếm..."
        />
        <div
          v-if="searchDestination"
          class="clear-search"
          title="Clear Search"
          @click="searchDestination = ''"
        >
          &times;
        </div>
        <ul class="list-box">
          <li
            v-for="(item, key) in destination
              .map((item, inx) => ({ inx, ...item }))
              .filter((item) =>
                item[label in item ? label : 'label']
                  .toLowerCase()
                  .includes(searchDestination.toLowerCase())
              )"
            v-bind:key="key"
            class="list-item"
            v-bind:style="{ backgroundColor: item.selected ? '#f5f5f5' : '' }"
            @click="selectDestination(searchDestination ? item.inx : key)"
          >
            {{ item[label in item ? label : "label"] }}
          </li>
          <li
            v-if="
              destination.filter((item) =>
                item[label in item ? label : 'label']
                  .toLowerCase()
                  .includes(searchDestination.toLowerCase())
              ).length == 0 && destination.length
            "
            class="list-item"
          >
            Không tìm thấy kết quả
          </li>
        </ul>
        <div class="bulk-action">
          <div class="btn-action select-all" @click="selectAllDestination">
            Chọn tất cả
          </div>
          <div class="btn-action deselect-all" @click="deSelectAllDestination">
            Bỏ chọn tất cả
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    source: Array,
    destination: Array,
    label: String,
  },
  data() {
    return {
      searchSource: "",
      searchDestination: "",
    };
  },
  methods: {
    moveDestination: function () {
      let selected = this.source.filter((f) => f.selected);
      if (!selected.length) return;
      selected = selected.map((item) => ({
        ...item,
        selected: false,
      }));
      let destination = [...selected, ...this.destination];
      let source = this.source.filter((f) => !f.selected);
      this.searchSource = "";
      this.searchDestination = "";
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    moveSource: function () {
      let selected = this.destination.filter((f) => f.selected);
      if (!selected.length) return;
      selected = selected.map((item) => ({
        ...item,
        selected: false,
      }));
      let source = [...selected, ...this.source];
      let destination = this.destination.filter((f) => !f.selected);
      this.searchSource = "";
      this.searchDestination = "";
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    moveAllDestination: function () {
      let destination = [
        ...this.source.map((item) => ({ ...item, selected: false })),
        ...this.destination,
      ];
      let source = [];
      this.searchSource = "";
      this.searchDestination = "";
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    moveAllSource: function () {
      let source = [
        ...this.destination.map((item) => ({ ...item, selected: false })),
        ...this.source,
      ];
      let destination = [];
      this.searchSource = "";
      this.searchDestination = "";
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    selectDestination: function (key) {
      let source = this.source;
      let destination = this.destination.map((i, k) => {
        if (k === key) {
          i.selected = !i.selected;
        }
        return i;
      });
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    selectSource: function (key) {
      let destination = this.destination;
      let source = this.source.map((i, k) => {
        if (k === key) {
          i.selected = !i.selected;
        }
        return i;
      });
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    selectAllSource: function () {
      let source = this.source.map((item) => ({ ...item, selected: true }));
      let destination = this.destination;
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    deSelectAllSource: function () {
      let source = this.source.map((item) => ({ ...item, selected: false }));
      let destination = this.destination;
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    selectAllDestination: function () {
      let destination = this.destination.map((item) => ({
        ...item,
        selected: true,
      }));
      let source = this.source;
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
    deSelectAllDestination: function () {
      let destination = this.destination.map((item) => ({
        ...item,
        selected: false,
      }));
      let source = this.source;
      this.$emit("onChangeList", {
        source,
        destination,
      });
    },
  },
};
</script>

<style lang="scss">
</style>
