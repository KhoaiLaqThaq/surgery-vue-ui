<template>
  <div
    class="modal fade fontMavin"
    id="newsPreview"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Preview</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="previews-mobi mx-5">
            <div class="previews-header">
              <div class="back">
                <ArrowLeftIcon />
              </div>
              <div class="widget-title m-auto">Tin mới</div>
            </div>
            <div class="previews-content auto-scroll-y">
              <div class="avatar mb-3">
                <img v-if="avatarUrl" :src="avatarUrl" alt="" />
                <img
                  v-if="!avatarUrl"
                  src="~~/assets/images/avatar-default.jpg"
                  alt=""
                />
              </div>
              <div class="title mb-3 px-3">{{ title }}</div>
              <div class="info d-flex mb-3 px-3">
                <div class="created-date">{{ displayDate(createdDate) }}</div>
                <div class="reaction ms-auto">
                  <HeartIcon />
                </div>
              </div>
              <div class="news-content px-3">
                <pre id="showContent"></pre>
              </div>

              <div class="my-3 px-3 text-medium fw-bold">
                Bài viết liên quan
              </div>

              <div class="news-related mb-3">
                <ul class="px-2">
                  <li><NewsRelated class="mb-2 zoom-in" /></li>
                  <li><NewsRelated class="mb-2 zoom-in" /></li>
                  <li><NewsRelated class="mb-2 zoom-in" /></li>
                  <li><NewsRelated class="mb-2 zoom-in" /></li>
                  <li><NewsRelated class="mb-2 zoom-in" /></li>
                </ul>
              </div>

              <div class="my-3 px-3 text-medium fw-bold">Bình luận (1)</div>
              <div class="news-comment mx-3">
                <Comment />
              </div>
            </div>
            <div class="button-dialect m-auto"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArrowLeftIcon from "~~/assets/images/icons/ArrowLeftIcon.vue";
import NewsRelated from "~~/components/NewsRelated.vue";

// icon
import HeartIcon from "~~/assets/images/icons/HeartIcon.vue";
import moment from "moment";
import SquareIcon from "~~/assets/images/icons/SquareIcon.vue";
import BackIcon from "~~/assets/images/icons/BackIcon.vue";
import CircleIcon from "~~/assets/images/icons/CircleIcon.vue";
import Comment1 from "./Comment.vue";

export default {
  components: {
    ArrowLeftIcon,
    HeartIcon,
    NewsRelated,
    SquareIcon,
    BackIcon,
    CircleIcon,
    Comment1,
  },
  props: ["title", "avatarUrl", "content", "createdDate"],
  setup(props) {
    const displayDate = (createdDate) =>
      moment(createdDate)
        .month(createdDate[1] - 1)
        .format("YYYY-MM-DD HH:mm:ss");

    return { displayDate };
  },
  watch: {
    content: function (newContent, oldContent) {
      document.getElementById("showContent").innerHTML = newContent;
    },
  },
};
</script>
<style lang="scss">
pre {
  white-space: pre-wrap;
  font-family: "Roboto,sans-serif";
  img {
    width: 100%;
  }
}
.fontMavin {
  font-family: "Roboto,sans-serif";
}
</style>
