<template>
    <div class="mt-3">
        <div class="card">
            <div class="card-header search-header">
                <h6 class="card-title">Tìm kiếm</h6>
            </div>
            <div class="card-body">
                <form @submit.prevent="listenSearchForm()">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <input type="text" v-model="criteria.keyword" id="keyword" class="form-control pr-5" />
                                <label for="keyword">Tìm kiếm từ khóa...</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <input type="text" v-model="criteria.phone" id="phone" class="form-control pr-5" />
                                <label for="phone">Tìm kiếm số điện thoại...</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <input type="text" v-model="criteria.parentName" id="parentName" class="form-control pr-5" />
                                <label for="parentName">Tìm kiếm tên người nhà...</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="content">

        </div>
    </div>
</template>
<script>
import {ref, reactive} from 'vue';

export default {
    setup() {
        const criteria = reactive({
            keyword: "",
            phone: "",
            parentName: ""
        });

        const listenSearchForm = () => {

        }

        return {
            criteria,

            listenSearchForm
        }
    }
}
</script>
<style lang="scss">
    
</style>