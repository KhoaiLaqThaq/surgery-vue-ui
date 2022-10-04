<template>
  <Form @submit="onSubmit()" enctype="multipart/form-data">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
      <PreviewButton class="ms-auto" :btnType="'button'" :name="'Preview'" :textSize="'text-small'" />
      <BaseButton class="btn-primary ms-2 box" :btnType="'submit'" :name="'Save'" :textSize="'text-small'" />
      <NewsPreview :title="title" :avatarUrl="avatarUrl" :content="content" :createdDate="createdDate" />
      <NewsTabletPreview :title="title" :avatarUrl="avatarUrl" :content="content" :createdDate="createdDate" />
    </div>

    <div class="row mt-3 py-3">
      <div class="col-lg-3 col-sm-12">
        <div class="form-floating">
          <Field name="title" v-model="title" type="text" class="form-control box" required="required"
            autocomplete="false" :rules="validateField" />
          <ErrorMessage name="title" class="text-danger" />
          <label for="">Tiêu đề <span class="text-danger">*</span></label>
        </div>
      </div>

      <div class="col-lg-3 col-sm-12">
        <div class="form-floating">
          <Field as="select" name="type" v-model="optionType" class="form-select box" required="required"
            :value="optionType" :rules="validateField">
            <option v-for="(option, index) in newsTypes" :key="index" :value="option.id">
              {{ option.name }}
            </option>
            <ErrorMessage name="type" class="text-danger" />
          </Field>
          <label>Loại tin tức <span class="text-danger">*</span></label>
        </div>
      </div>

      <div class="col-lg-3 col-sm-12">
        <div class="form-floating">
          <Field as="select" name="topic" v-model="topic" class="form-select box" required="required" :value="topic"
            :rules="validateField">
            <option v-for="(option, index) in topics" :key="index" :value="option.id">
              {{ option.name }}
            </option>
            <ErrorMessage name="topic" class="text-danger" />
          </Field>
          <label>Chuyên mục <span class="text-danger">*</span></label>
        </div>
      </div>

      <div class="col-lg-3 col-sm-12">
        <div class="form-floating">
          <datepicker-lite class="form-control picker-date box" :class-attr="'border-none'" :name-attr="'createdDate'"
            :show-bottom-button="true" :value-attr="displayDate(createdDate)" :locale="locale" />
          <label>Ngày viết <span class="text-danger">*</span></label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-9 col-sm-12">
        <!-- brief -->
        <div class="form-floating mb-3">
          <Field as="textarea" name="brief" v-model="brief" class="form-control box auto-scroll-y"
            id="floatingTextarea2" style="min-height: 100px" :rules="validateField" />
          <ErrorMessage name="brief" class="text-danger" />
          <label for="">Mô tả ngắn <span class="text-danger">*</span></label>
        </div>
      </div>

      <div class="col-lg-3 col-sm-12">
        <div class="form-floating mb-3 input-suggest__event">
          <input type="text" class="form-control box" autocomplete="false" v-model="tag" @keyup.space="addTags()" />
          <div v-if="tagsOption" class="tags-unorder-list">
            <div class="tag-option" v-for="(tagItem, index) in listTagsForSelect" :key="index"
              @click="selectTagSuggestion">
              {{ tagItem.name }}
            </div>
          </div>
          <span class="title-suggest__event">Space</span>
          <label for="">Thêm tag <span class="text-danger">*</span></label>
          <div class="tags mt-2">
            <span class="tag-item" v-for="(tag, index) in tags" :key="index">{{ tag }}
              <XIcon class="ms-1" @click="removeTag(index)" />
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="row mx-0 mb-3">
      <div class="col-12 form-group box px-0">
        <TabsWrapper>
          <TabItem title="Ảnh đại diện">
            <div class="card radius-unset box">
              <div class="card-body">
                <UseDropZone @change-image="changeImage($event)" :avatarUrl="avatarUrl" />
              </div>
            </div>
          </TabItem>
          <TabItem title="Nội dung">
            <div class="form-group bg-white">
              <div class="card m-3">
                <div class="card-body p-0">
                  <ckeditor :editor="editor" :config="editorConfig" v-model="content"></ckeditor>
                </div>
                <ErrorMessage name="content" class="text-danger" />
              </div>
            </div>
          </TabItem>
        </TabsWrapper>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-lg-12 col-sm-12">
        <div class="form-floating">
          <div>
            <label>Phân phối phòng ban <span class="text-danger">*</span></label>
          </div>

          <div>
            <DualListBox class="m-auto" :source="source" :destination="destination" label="name"
              v-on:onChangeList="onChangeList" />
          </div>
        </div>
      </div>
    </div>
    <hr />

    <div v-if="showStatus || useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_NEWS_APPROVE])" class="col-lg-3 col-sm-12">
      <div class="form-floating">
        <div>
          <label>Trạng thái <span class="text-danger">*</span></label>
        </div>
        <Field as="select" name="status" v-model="status" class="form-select box" required="required" :value="status">
          <option v-for="(status, index) in newStatus" :key="index" :value="status.value">
            {{ status.name }}
          </option>
          <ErrorMessage name="topic" class="text-danger" />
        </Field>
      </div>
    </div>
  </Form>
</template>
<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useCurrentsRole } from "~~/services/common.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DatepickerLite from "vue3-datepicker-lite";
import moment from "moment";
import DualListBox from "~~/components/DualListBox.vue";

// components
import PreviewButton from "~~/components/common/PreviewButton.vue";
import BaseButton from "~~/components/common/BaseButton.vue";
import BaseSelect from "~~/components/common/BaseSelect.vue";
import BaseInput from "~~/components/common/BaseInput.vue";
import FormCheck from "~~/components/common/FormCheck.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import UploadAdapter from "~~/composables/UploadAdapter.js";
import FloatSelect from "~~/components/common/FloatSelect.vue";
import FloatInput from "~~/components/common/FloatInput.vue";
import UseDropZone from "~~/components/common/UseDropZone.vue";
import TabsWrapper from "~~/components/common/tab/TabsWrapper.vue";
import TabItem from "~~/components/common/tab/TabItem.vue";
import NewsPreview from "~~/components/NewsPreview.vue";
import NewsTabletPreviewVue from "~~/components/NewsTabletPreview.vue";
// functions
import { getNowDate } from "~~/constants/format-date.js";
import { newStatus } from "~~/constants/enum.js";
// icons
import XIcon from "~~/assets/images/icons/XIcon.vue";

import { Form, Field, ErrorMessage } from "vee-validate";
import {ROLES} from "~~/constants/roles.js";
import NewsService from "~~/services/model/news.service";

export default {
  components: {
    TitleHeader,
    FloatSelect,
    FloatInput,
    PreviewButton,
    BaseButton,
    BaseSelect,
    BaseInput,
    FormCheck,
    UseDropZone,
    TabItem,
    NewsPreview,
    DatepickerLite,
    TabsWrapper,
    XIcon,
    Form,
    Field,
    ErrorMessage,
    NewsTabletPreviewVue,
    DualListBox,
  },
  data() {
    return {
      newStatus: newStatus,
    };
  },
  methods: {
    onChangeList: function ({ source, destination }) {
      this.source = source;
      this.destination = destination;
    },
  },
  setup() {
    const route = useRoute();
    const header = useHeader();
    const currentUser = useCurrentUser();
    const currentRole = useCurrentRole();
    const { $showToast } = useNuxtApp();
    const newsId = ref(route.params && route.params.id);
    const newsExist = ref({});
    const titleForm = ref(newsId.value ? "Giao diện chỉnh sửa tin tức" : "Giao diện thêm mới tin tức");
    const showStatus = ref(newsId.value ? true : false);
    const createdDate = ref(getNowDate());
    const avatar = ref(null);
    const avatarUrl = ref("");
    const isChangedAvatar = ref(false);
    const title = ref("");
    const brief = ref("");
    const status = ref(1);
    const content = ref(
      "<br/><br/><p>Nội dung bài viết ở đây..</p><br/><br/><br/>"
    );
    const tag = ref("");
    const tagNames = ref("");
    const tags = ref([]);
    const topics = ref([]);
    const topic = ref(null);
    const optionType = ref([]);
    const type = ref("");
    const commentTotal = ref(0);
    const likeTotal = ref(0);
    const viewTotal = ref(0);
    const createdBy = ref("");
    const createdDateString = ref("");
    const newsTypes = ref([]);

    //source and destination of departments dual-listbox
    const source = ref([]);
    const destination = ref([]);

    //tag suggesstion field
    const listTags = ref([]);
    const tagsOption = ref(false);
    let listTagsForSelect = ref([]);

    // call api getById
    function callApiGetById() {
      if (newsId.value) {
        NewsService.getById(newsId.value)
          .then((response) => {
            if (response) {
              newsExist.value = response.data;
            }
          })
          .catch((error) => {
            console.log(error)
          });
      }
    }

    // TODO: call api get All Tags
    function callApiGetAllTags() {
      if (newsId.value) {
        console.log("entering callApiGetAllTags...");
        NewsService.getAllTags()
          .then((response) => {
            if (response.data) {
              listTags.value = response.data;
            }
          })
          .catch((error) => {
            console.log(error)
          });
      }
    }

    function getListNewsType() {
      NewsService.getAllNewsType()
        .then((response) => {
          const data = response.data;
          newsTypes.value = data;
          optionType.value = data[0] && data[0].id;
        })
        .catch((e) => {
          console.log(e.toString());
        });
    }

    // TODO: call API get lisTopics
    function getListTopic() {
      NewsService.getAllTopic()
        .then((response) => {
          const data = response.data;
          topics.value = data;
          topic.value = data[0] && data[0].id;
        })
        .catch((e) => {
          console.log(e.toString());
        });
    }

    // TODO: call API get listDepartments
    function getListDepartments() {
      NewsService.getAllDepartment()
        .then((response) => {
          const data = response.data;
          if (data) {
            source.value = data;
            resetDepartmentSource();
          }
        })
        .catch((e) => {
          console.log(e.toString());
        });
    }

    watch(newsExist, () => {
      if (newsExist.value) {
        let data = newsExist.value;
        title.value = data.title;
        type.value = data.type;
        optionType.value = data.newsTypeId;
        topic.value = data.topic && data.topic.id;
        createdDate.value = data.createdDate;
        brief.value = data.brief;
        content.value = data.content;
        avatarUrl.value = data.avatarUrl;
        avatar.value = data.avatar;
        commentTotal.value = data.commentTotal;
        likeTotal.value = data.likeTotal;
        viewTotal.value = data.viewTotal;
        createdDateString.value = data.displayCreatedDate;
        createdBy.value = data.createdBy;
        status.value = data.status;
        showStatus.value = data.createdBy != currentUser.value ? true : false

        if (data.tags?.length > 0) {
          data.tags?.forEach((e) => {
            // tagNames.value += "," + e.name;
            tags.value.push(e.name);
          });
        }
        if (data.departments?.length > 0) {
          destination.value = data.departments;
          resetDepartmentSource();
        }
      }
    });

    watch(tag, () => {
      if (tag.value.trim().length > 0) {
        tagsOption.value = true;
        listTagsForSelect.value = listTags.value.filter(function (item) {
          return item.name.includes(tag.value);
        });
      } else {
        tagsOption.value = false;
      }
    });

    const changeImage = (imageNew) => {
      console.log('============> Change avatar image')
      avatar.value = imageNew;
      isChangedAvatar.value = true;
    };

    const locale = {
      format: "DD/MM/YYYY",
      weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      startsWeeks: 0,
      todayBtn: "Today",
      clearBtn: "Clear",
      closeBtn: "Close",
    };

    const displayDate = (value) => {
      if (value) {
        return moment(value).month(value[1] - 1).format("DD/MM/YYYY");
      }
      return "Không xác định";
    }

    function uploader(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
      };
    }

    // TODO: thêm tag
    function addTags() {
      if (tag.value.trim().length > 0 && tag.value.trim() != "" && !tags.value.includes(tag.value.trim())) {
        // tagNames.value += "," + tag.value.trim();
        tags.value.push(tag.value.trim());
      }
      tag.value = "";
    }

    // TODO: Remove tag
    const removeTag = (index) => tags.value.splice(index, 1);

    // TODO: Define rules for validate
    function validateField(value) {
      // if the field is empty
      if (!value) return "Trường này là bắt buộc";
      // if the field is not a valid email
      if (value.length < 3) return "Trường này phải có hơn 3 ký tự";
      return true;
    }

    function onSubmit() {
      console.log("entering onSubmit()...");
      if(destination.value.length == 0) {
        $showToast("Hãy phân phối phòng ban!", "error", 2000);
      } else {
        let departmentCodes = "";
        destination.value.forEach((item) => {
          departmentCodes += "," + item.code;
        });
        tags.value.forEach((item) => {
          tagNames.value += "," + item;
        });
        const news = {
          id: newsId.value ? newsId.value : null,
          avatarUrl: isChangedAvatar.value ? "" : avatarUrl.value,
          newsTypeId: optionType.value,
          title: title.value,
          brief: brief.value,
          content: content.value,
          status: status.value,
          topicId: topic.value,
          tagNames: tagNames.value,
          commentTotal: commentTotal.value,
          likeTotal: likeTotal.value,
          viewTotal: viewTotal.value,
          createdBy: createdBy.value,
          createdDateString: newsId.value ? createdDateString.value : null,
          departmentCodes: departmentCodes,
        };
        if (avatar.value)
          news["avatar"] = avatar.value;
        let tokenHeaders = {
          "Authorization": header.value,
          "Content-Type": "multipart/form-data"
        };
        NewsService.saveOrUpdate(news, tokenHeaders)
          .then((res) => {
            let responseData = res.data;
            console.log("check date" + responseData.createdDate + responseData.createdDateString)
            $showToast("Thêm/Sửa Tin tức thành công", "success", 2000);
            navigateTo("/news");
          })
          .catch((error) => {
            $showToast("Thêm/Sửa Tin tức thất bại", "error", 2000);
            console.log(error);
          });
      }
    }

    function selectTagSuggestion(event) {
      let tagSelected = event.target.innerHTML;
      if (tagSelected.trim().length > 0 && tagSelected != "") {
        // tagNames.value += "," + tagSelected;
        tags.value.push(tagSelected);
      }
      tag.value = "";
    }

    function resetDepartmentSource() {
      if (source.value.length > 0) {
        source.value.forEach((s, index) => {
          let check = destination.value.find((d) => {
            if (d.code === s.code) return d;
          });
          if (check != undefined) {
            source.value.splice(index, 1);
            resetDepartmentSource();
          }
        });
      }
    }

    return {
      titleForm,
      // config editor
      locale,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
        extraPlugins: [uploader],
        language: "en",
      },
      // variables
      type,
      tag,
      tags,
      createdDate,
      topics,
      topic,
      optionType,
      newsTypes,
      brief,
      content,
      status,
      title,
      avatar,
      avatarUrl,
      source,
      destination,
      listTags,
      tagsOption,
      listTagsForSelect,
      showStatus,
      currentRole,
      ROLES,

      // function
      addTags,
      removeTag,
      onSubmit,
      getListTopic,
      getListDepartments,
      getListNewsType,
      validateField,
      callApiGetById,
      callApiGetAllTags,
      selectTagSuggestion,
      displayDate,
      changeImage,
      useCurrentsRole,

    };
  },
  created() {
    this.getListTopic();
    this.getListDepartments();
    this.getListNewsType();
    this.callApiGetById();
    this.callApiGetAllTags();
  },
};
</script>
<style lang="scss">
.tags {
  display: block;
  position: relative;
  width: 100%;

  .tag-item {
    margin-left: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 4px;
    background-color: rgb(168, 167, 167);
    border: 3px solid rgb(141, 141, 141);
    padding: 5px 25px 5px 5px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    position: relative;
    color: #ffffff;

    svg {
      margin-top: 2px;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 18px;
      height: 18px;
      cursor: pointer;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      margin-left: 1rem;

    }
  }
}

.title-suggest__event {
  position: absolute;
  top: 1rem;
  right: 10px;
  border: 3px solid rgb(141, 141, 141);
  padding: 2px 4px;
  border-radius: 4px;
  background-color: rgb(168, 167, 167);
  color: #ffffff;
  font-weight: bold;
}

.tags-unorder-list {
  position: absolute;
  z-index: 100;
  width: 100%;
  border: 1px solid #d4d4d4;
  border-top: none;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  box-shadow: 0 10px 20px rgb(0 0 0 / 8%);
  --tw-bg-opacity: 1;

  .tag-option {
    display: block;
    padding-left: 5%;
    padding-top: 1%;
    padding-bottom: 1%;
  }

  .tag-option:hover {
    background-color: #1982f1;
    color: rgb(250, 247, 247);
  }
}
</style>
