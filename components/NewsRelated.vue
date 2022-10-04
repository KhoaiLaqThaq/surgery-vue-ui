<template>
    <div class="box-related p-2 d-flex">
        <img src="~~/assets/images/avatar-default.jpg" class="me-3" alt="">
        <div class="news-releated-info">
            <div class="releated-title fw-bold">
                {{ title ? title : newsRelatedDefault.title }}
            </div>
            <div class="created-date lucide text-slate-400">{{ getCreatedDate() }}</div>
        </div>
    </div>
</template>
<script>
import { getNowDate } from '~~/constants/format-date';
export default {
    props: [
        'newsRelated',
    ],
    data() {
        return {
            newsRelatedDefault: {
                title: 'News Related',
            }
        }
    },
    setup(props) {
        const { title, createdDate } = props;

        function getCreatedDate() {
            if (createdDate) {
                return createdDate;
            }
            return getNowDate();
        }

        return {
            title, createdDate,

            getCreatedDate
        }
    }
}
</script>
<style lang="">
    
</style>