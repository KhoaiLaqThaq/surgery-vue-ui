<template>
    <Form @submit.prevent="onSubmit()">
        <div class="d-flex mb-3">
            <TitleHeader :title="'Thông tin bệnh nhân'" />
            <button class="btn btn-primary ms-auto"><PrinterIcon class="w-4" /> In phiếu</button>
        </div>
        <div class="row mb-3">
            <!-- patientName -->
            <div class="col-lg-3 col-md-6 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="patient.name" name="patientName" :rules="validateRequired" />
                    <ErrorMessage name="patientName" class="text-danger" />
                    <label for="">{{ $t('label.patient.name') }} <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /patientName -->

            <!-- phone -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="patient.phone" name="phone" />
                    <ErrorMessage name="phone" class="text-danger" />
                    <label for="">{{ $t('label.patient.phone') }}</label>
                </div>
            </div>
            <!-- /phone -->

            <!-- gender -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field as="select" name="gender" v-model="patient.gender" class="form-select box" required="required" :value="patient.gender" :rules="validateSelect">
                        <option v-for="(gender, index) in genders" :key="index" :value="gender.value">{{gender.name}}</option>
                    </Field>
                    <ErrorMessage name="gender" class="text-danger" />
                    <label for="">{{ $t('label.patient.gender') }}</label>
                </div>
            </div>
            <!-- /gender -->

            <!-- dob -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <Datepicker 
                    v-model="patient.dob" 
                    :format="formatDDMMYYYY"
                    :enable-time-picker="false"
                    placeholder="Ngày sinh"
                    v-if="!patient.id && !patient.dob" 
                />
                <div class="form-floating" v-else>
                    <input type="text" class="form-control" :value="convertDobTo_DDMMYYYY(patient.dob)" disabled>
                    <label for="">Ngày sinh</label>
                </div>
            </div>
            <!-- /dob -->

            <!-- address -->
            <div class="col-12 mb-3">
                <div class="form-floating">
                    <textarea class="form-control box border-none minH-100" id="address" v-model="patient.address" required></textarea>
                    <label for="address">{{ $t('label.patient.address') }} <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /address -->
        </div>
        <hr />

        <!-- add-prescription -->
        <div class="d-flex mb-3">
            <TitleHeader :title="'Thông tin phiên khám'" />
            <button class="btn btn-primary ms-auto" type="button" data-bs-toggle="modal" data-bs-target="#addPrescription"><PostIcon class="w-4" /> Kê đơn</button>
            <AddPrescription @add-prescription="addPrescription($event)" :prescriptions="session.prescriptions" />
        </div>
        <!-- /add-prescription -->

        <div class="row mb-3">
            <!-- diagnosis -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="session.diagnosis" name="diagnosis" :rules="validateRequired" />
                    <ErrorMessage name="diagnosis" class="text-danger" />
                    <label for="">{{ $t('label.session.diagnosis') }} <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /diagnosis -->
            <!-- symptom -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="session.symptom" name="symptom" :rules="validateRequired" />
                    <ErrorMessage name="symptom" class="text-danger" />
                    <label for="">{{ $t('label.session.symptom') }} <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /symptom -->
            <!-- leftEye -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="session.leftEye" name="leftEye" :rules="validateRequired" />
                    <label for="">{{ $t('label.session.leftEye') }}</label>
                </div>
            </div>
            <!-- /leftEye -->
            <!-- rightEye -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="session.rightEye" name="rightEye" :rules="validateRequired" />
                    <label for="">{{ $t('label.session.rightEye') }}</label>
                </div>
            </div>
            <!-- /rightEye -->
        </div>
        <div class="row mb-3">
            <div class="table-container">
                <div class="tr">
                    <div class="th text-center" v-for="(item, index) in tableHeaders" :key="index">
                        <div class="th-title fw-bold"><span>{{ item.text }}</span><span>{{ item.acronym }}</span></div>
                    </div>
                </div>
                <div class="tr zoom-in-little">
                    <div class="td">Phải (Right)</div>
                    <div class="td">
                        <input type="text" class="form-control" v-model="sessionDetail.rightSPH" />
                    </div>
                    <div class="td">
                        <input type="text" class="form-control" v-model="sessionDetail.rightCYL" />
                    </div>
                    <div class="td">
                        <input type="text" class="form-control" v-model="sessionDetail.rightAXIS" />
                    </div>
                    <div class="td">
                        <input type="text" class="form-control" v-model="sessionDetail.rightADD" />
                    </div>
                    <div class="td">
                        <input type="text" class="form-control" v-model="sessionDetail.rightPD" />
                    </div>
                </div>
                <div class="tr zoom-in-little">
                    <div class="td">Trái (Left)</div>
                    <div class="td">
                        <input type="text" class="form-control" v-model="sessionDetail.leftSPH" />
                    </div>
                    <div class="td">
                        <input type="text" class="form-control" v-model="sessionDetail.leftCYL" />
                    </div>
                    <div class="td">
                        <input type="text" class="form-control" v-model="sessionDetail.leftAXIS" />
                    </div>
                    <div class="td">
                        <input type="text" class="form-control" v-model="sessionDetail.leftADD" />
                    </div>
                    <div class="td">
                        <input type="text" class="form-control" v-model="sessionDetail.leftPD" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <!-- bloodPressure -->
            <div class="col-lg-3 col-md-4 col-sm-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="sessionDetail.bloodPressure" name="bloodPressure" />
                    <label for="">{{ $t('label.session.bloodPressure') }}</label>
                </div>
            </div>
            <!-- /bloodPressure -->
            <!-- weight -->
            <div class="col-lg-3 col-md-4 col-sm-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="sessionDetail.weight" name="weight" />
                    <label for="">{{ $t('label.session.weight') }}</label>
                </div>
            </div>
            <!-- weight -->
            <!-- heartbeat -->
            <div class="col-lg-3 col-md-4 col-sm-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="sessionDetail.heartbeat" name="heartbeat" />
                    <label for="">{{ $t('label.session.heartbeat') }}</label>
                </div>
            </div>
            <!-- /heartbeat -->
            <!-- nextTime -->
            <div class="col-lg-3 col-md-4 col-sm-12 mb-3">
                <Datepicker
                    v-model="session.nextTime" 
                    :format="formatDDMMYYYY" 
                    :enable-time-picker="false" 
                    placeholder="Tái khám"
                    v-if="!session.id && !session.nextTime"
                ></Datepicker>
                <div class="form-floating" v-else>
                    <input type="text" class="form-control" :value="convertDobTo_DDMMYYYY(session.nextTime)" disabled>
                    <label for="">{{ $t('label.session.nextTime') }}</label>
                </div>
            </div>
            <!-- /nextTime -->
        </div>

        <div class="row mb-3">
            <!-- treatmentPlan -->
            <div class="col-12 mb-3">
                <div class="form-floating">
                    <textarea class="form-control box border-none minH-100" id="treatmentPlan" v-model="session.treatmentPlan" required></textarea>
                    <label for="treatmentPlan">{{ $t('label.session.treatmentPlan') }}: <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /treatmentPlan -->
            <!-- note -->
            <div class="col-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="session.note" name="note"/>
                    <label for="">{{ $t('label.session.note') }}</label>
                </div>
            </div>
            <!-- /note -->
        </div>

        <div class="row mb-3">
            <!-- <div class="col-12">
                <div class="form-group">
                    <label>Phí dịch vụ khám: </label>
                    <div class="form-control">
                        {{ costService }}
                    </div>
                </div>
            </div> -->
            <label class="form-label">{{ $t('label.session.cost') }}</label>
            <div class="input-group mb-3">
                <input type="text" class="form-control" disabled v-model="costService">
                <span class="input-group-text bg-primary text-white cursor-pointer" @click="freeForCostService">{{ $t('label.session.free') }}</span>
            </div>
        </div>

        <hr class="hr">
        <div class="row">
            <div class="col-6">
                <BackButton class="btn-primary box ms-auto" :btnType="'button'" :name="'Quay lại'" :textSize="'text-small'" :routePush="'/session'"/>
            </div>
            <div class="col-6 text-right">
                <BaseButton @click="onSubmit()" class="btn-primary box ms-auto" :btnType="'submit'" :name="'Lưu'" :textSize="'text-small'" />
            </div>
        </div>
    </Form>
</template>
<script>
import { ref, reactive, computed, watch } from 'vue';
import { Form, Field, ErrorMessage } from "vee-validate";

import Datepicker from '@vuepic/vue-datepicker';
import BaseButton from '~~/components/common/BaseButton.vue';
import BackButton from '~~/components/common/BackButton.vue';
import PostIcon from '~~/assets/images/icons/PostIcon.vue';
import {validateRequired, validateSelect} from '~~/services/common.js';
import { genders, ParamName } from "~~/constants/enum.js";
import TitleHeader from '~~/components/common/TitleHeader.vue';
import PrinterIcon from '~~/assets/images/icons/actions/PrinterIcon.vue';

import SessionService from '~~/services/model/session.service';
import SystemParamService from '~~/services/model/systemParam.service';
import { displayLocalDate_DDMMYYYY } from '~~/constants/format-date.js';
import AddPrescription from '~~/components/common/modal/prescription/AddPrescription.vue';

import {
    formatDDMMYYYY,
    convertDobTo_DDMMYYYY
} from '~~/constants/format-date'

export default {
    components: { Datepicker, Form, Field, ErrorMessage, TitleHeader, PrinterIcon, BaseButton, BackButton, PostIcon, AddPrescription },
    props: [ "id", "session" ],
    data() {
        const tableHeaders = [
            { text: "Mắt", acronym: "(Eyes)"},
            { text: "Cầu", acronym: "(SPH)"},
            { text: "Trụ", acronym: "(CYL)"},
            { text: "Trục", acronym: "(AXIS)"},
            { text: "Cộng thêm", acronym: "(ADD)"},
            { text: "KCĐT", acronym: "(PD)"}
        ];

        return {
            tableHeaders,
            formatDDMMYYYY,
            convertDobTo_DDMMYYYY
        };
    },
    setup(props) {
        const costService = ref(0);
        const sessionId = ref("");
        const sessionExisted = computed(() => props.session);

        watch([sessionExisted], () => setSessionData(sessionExisted.value));
        
        const patient = reactive({
            id: null,
            name: "",
            phone: "",
            dob: null,
            displayDob: "",
            gender: "",
            address: ""
        });

        const session = reactive({
            code: "",
            diagnosis: "",
            symptom: "",
            treatmentPlan: "",
            note: "",
            status: "",
            nextTime: "",
            displayNextTime: "",
            totalPrice: 0,
            createdBy: "",
            createdDate: "",
            freeCostService: true,
            prescriptions: []
        });
        const sessionDetail = reactive({
            id: null,
            bloodPressure: "",
            weight: 0,
            heartbeat: 0,
            leftEye: "", rightEye: "",
            leftSPH: "", rightSPH: "",
            leftCYL: "", rightCYL: "",
            leftAXIS: "", rightAXIS: "",
            leftADD: "", rightADD: "",
            leftPD: "", rightPD: "",
            // prescriptions: []
        });

        function setSessionData(e) {
            if (e) {
                sessionId.value = e.id;
                session.code = e.code;
                session.diagnosis = e.diagnosis;
                session.symptom = e.symptom;
                session.treatmentPlan = e.treatmentPlan;
                session.note = e.note;
                session.status = e.status;
                session.nextTime = e.nextTime;
                session.displayNextTime = e.nextTime;
                session.createdBy = e.createdBy;
                session.createdDate = e.createdDate;
                session.totalPrice = e.totalPrice;
                session.freeCostService = e.freeCostService;
                session.prescriptions = e.prescriptions;
                setSessionDetail(e.sessionDetail);
                setPatient(e.patient);
            }
        }

        function setSessionDetail(sessionDetailExisted) {
            if (sessionDetailExisted) {
                sessionDetail.id = sessionDetailExisted.id;
                sessionDetail.bloodPressure = sessionDetailExisted.bloodPressure;
                sessionDetail.weight = sessionDetailExisted.weight;
                sessionDetail.heartbeat = sessionDetailExisted.heartbeat;
                sessionDetail.leftEye = sessionDetailExisted.leftEye;
                sessionDetail.rightEye = sessionDetailExisted.rightEye;
                sessionDetail.leftSPH = sessionDetailExisted.leftSPH;
                sessionDetail.rightSPH = sessionDetailExisted.rightSPH;
                sessionDetail.leftCYL = sessionDetailExisted.leftCYL;
                sessionDetail.rightCYL = sessionDetailExisted.rightCYL;
                sessionDetail.leftAXIS = sessionDetailExisted.leftAXIS;
                sessionDetail.rightAXIS = sessionDetailExisted.rightAXIS;
                sessionDetail.leftADD = sessionDetailExisted.leftADD;
                sessionDetail.rightADD = sessionDetailExisted.rightADD;
                sessionDetail.leftPD = sessionDetailExisted.leftPD;
            }
        }

        function setPatient(patientExisted) {
            if (patientExisted) {
                patient.id = patientExisted.id;
                patient.name = patientExisted.name;
                patient.phone = patientExisted.phone;
                patient.dob = patientExisted.dob;
                // patient.displayDob = patientExisted.dob;
                patient.gender = patientExisted.gender;
                patient.address = patientExisted.address;
            }
        }

        const setPatientDOB = (e) => patient.displayDob = e;
        const setNextTime = (e) => session.displayNextTime = e;
        const freeForCostService = () => costService.value = 0;

        // TODO: this function will be add prescriptions to session and re-calculate session totalPrice.
        const addPrescription = (e) => {
            console.log('prescription, ', e);
            session.prescriptions = e;
            for (let i = 0; i < e.length; i++) {
                session.totalPrice += e[i].totalPrice;
            }
        };

        function onSubmit() {
            // if (session.prescriptions) {
            //     alert('Chưa kê đơn thuốc');
            //     return;
            // }
            console.log("Entering onSubmit");
            // TODO: this code will be calculateTotalPrice with the cost service
            session.totalPrice += costService.value;
            // TODO: format data before commit
            let sessionData = {
                id: sessionId.value,
                code: session.code,
                diagnosis: session.diagnosis,
                symptom: session.symptom,
                treatmentPlan: session.treatmentPlan,
                note: session.note,
                displayNextTime: session.displayNextTime,
                totalPrice: session.totalPrice,
                createdBy: session.createdBy,
                createdDate: session.createdDate,
                freeCostService: session.freeCostService,
                sessionDetail,
                patient,
                prescriptions: session.prescriptions
            };

            console.log("Session: ", sessionData);
            SessionService.saveOrUpdate(sessionData)
            .then((response) => {
                let responseData = response.data;
                if (responseData) {
                    // console.log("responseData: ", responseData);
                    navigateTo("/session");
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
        }

        // TODO: get money for service
        function getCostSerivce() {
            SystemParamService.getByName(ParamName.MONEY_SERVICE)
            .then((response) => {
                let responseData = response.data;
                if (responseData && responseData.paramValue) costService.value = parseInt(responseData.paramValue);
            })
            .catch((error) => {
                console.log("Error: ", error);
            })
        }
        
        return {
            patient, session, sessionDetail,
            genders,
            costService,

            onSubmit,
            addPrescription,
            setPatientDOB,
            setNextTime,
            validateRequired,
            validateSelect,
            getCostSerivce,
            displayLocalDate_DDMMYYYY,
            freeForCostService
        }
    },
    mounted() {
        this.getCostSerivce();
    }
}
</script>
<style lang="scss">
    
</style>