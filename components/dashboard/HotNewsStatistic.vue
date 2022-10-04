<template>
    <div class="hot-news-item">
        <carousel
            :items-to-show="1"
            :autoplay="3000" 
            :wrap-around="true"
        >
            <slide v-for="(news, index) in hotNews" :key="index">
                <div class="item-news box mx-3 mb-3 p-3 zoom-in">
                    <div class="text-lg font-medium trancate">{{ news.title }}</div>
                    <div class="author text-slate-400 mt-1">{{ news.author }}</div>
                    <div class="brief text-slate-500 mt-1">{{ convertMaxLength(news.brief) }}</div>
                    <div class="font-medium mt-3">
                        <div class="reaction">
                            <span class="likes"><IconLike class="text-small text-primary" /> <strong class="reaction-detail">{{ news.likes }}</strong></span>
                            <span class="comments ms-1"><IconComment /> <strong class="reaction-detail">{{ news.comments }}</strong></span>
                            <span class="views ms-1"><IconView class="text-warning" /> <strong class="reaction-detail">{{ roundViews(news.views) }}</strong></span>
                        </div>
                    </div>
                </div>
            </slide>
        </carousel>
    </div>
</template>
<script>
import { Carousel, Slide } from 'vue3-carousel';
import IconComment from '~~/assets/images/icons/reaction/IconComment.vue';
import IconView from '~~/assets/images/icons/reaction/IconView.vue'
import IconLike from '~~/assets/images/icons/reaction/IconLike.vue';

export default {
    props: ['hotNews'],
    components: {
        Carousel,
        Slide,
        IconComment,
        IconView,
        IconLike
    },
    data() {
        function roundViews(views) {
            if (views > 1000) {
                return parseFloat(views/1000).toFixed(1) + 'k';
            }
            return views;
        }

        function convertMaxLength(brief) {
            if (brief.length > 125) {
                return brief.slice(0, 125).concat('...');
            }
            return brief;
        }

        return {
            roundViews,
            convertMaxLength
        }
    },
}
</script>
<style lang="scss">
.hot-news-item {
    display: inline-block;
    vertical-align: top;
    white-space: normal;
    width: 100%;

    .item-news {
        text-align: left;

        .author {
            font-size: 11px;
            color: rgb(98, 98, 98);
        }
        .brief {
            font-size: 12px;
        }

        .reaction {
            display: flex;
            justify-content: space-around;
            border-top: 1px solid rgba(0, 0, 0, 0.08);
            padding-top: 1rem;

            svg {
                width: 16px;
                height: 16px;
            }
            .reaction-detail {
                font-size: 14px;
            }
        }
    }
}
</style>