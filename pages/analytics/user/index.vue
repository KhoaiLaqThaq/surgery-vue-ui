<template>
	<div class="mt-3">
		<div class="card">
			<div class="card-header search-header">
				<h6 class="card-title fw-bold">Phân tích tài khoản hệ thống</h6>
			</div>

			<div class="card-body">
				<form @submit.prevent="">
					<div class="row">
						<div class="col-md-6">
							<div class="form-floating">
                <select v-model="department" class="form-select">
                  <option v-for="(department, index) in departments" :key="index" :value="department.id">
                    {{ department.name }}
                  </option>
                </select>
                <label for="floatingSelect">Chọn phạm vi phòng ban...</label>
              </div>
						</div>
					</div>
				</form>
				<div class="table-content mt-3">
					<div class="row">
						<div class="col-md-6 col-sm-12">

						</div>
						<div class="col-md-6 col-sm-12"></div>
					</div>
				</div>
			</div>
		</div>

			
	</div>
</template>
<script>
import {ref} from 'vue';

import PieChart from '~~/components/dashboard/PieChart';
import { colorChartPie } from "~~/constants/enum";

export default {
    
}
</script>
<style lang="">
    
</style>