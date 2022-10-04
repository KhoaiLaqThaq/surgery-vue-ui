<template>
    <div class="box-comment mb-5">
        <div class="d-flex mb-1">
            <div class="acc-comment">
                <img src="~~/assets/images/avatar/avatar1.jpg" class="rounded-full me-2" width="40" height="40" alt="">
                <span>{{ comment ? comment.name : 'anonymous' }}</span>
            </div>
            <div class="created-date ms-auto">
                {{ getCreatedDate() }}
            </div>
        </div>
        <div class="comment-content mb-1">
            {{ comment ? comment.content : commentDefault.content }}
        </div>
        <div class="reply text-secondary">Trả lời</div>
    </div>
</template>
<script>
import {ref} from 'vue';

import { getNowDate } from '~~/constants/format-date';
export default {
    props: ['comment'],
    data() {
        return {
            commentDefault: {
                content: "Xem trước bình luận"
            }
        }
    },
    setup(props) {
        const comment = ref(props.comment);

        function getCreatedDate() {
            if (comment && comment.createdDate) {
                return createdDate;
            }
            return getNowDate();
        }

        return {
            comment,

            getCreatedDate
        }
    }
}
</script>
<style lang="">
    
</style>