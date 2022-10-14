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
                    <label for="">Tên bệnh nhân <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /patientName -->

            <!-- phone -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="patient.phone" name="phone" />
                    <ErrorMessage name="phone" class="text-danger" />
                    <label for="">Số điện thoại</label>
                </div>
            </div>
            <!-- /phone -->

            <!-- dob -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <datepicker-lite class="form-control picker-date box" :class-attr="'border-none'"
                        :name-attr="displayLocalDate_DDMMYYYY(patient.dob)"
                        :show-bottom-button="true" :value-attr="displayLocalDate_DDMMYYYY(patient.dob)" :locale="locale"
                        @value-changed="setPatientDOB"
                    />
                    <label>Ngày sinh</label>
                </div>
            </div>
            <!-- /dob -->
            <!-- gender -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field as="select" name="gender" v-model="patient.gender" class="form-select box" required="required" :value="patient.gender" :rules="validateSelect">
                        <option v-for="(gender, index) in genders" :key="index" :value="gender.value">{{gender.name}}</option>
                    </Field>
                    <ErrorMessage name="gender" class="text-danger" />
                    <label for="">Giới tính</label>
                </div>
            </div>
            <!-- /gender -->
            <!-- address -->
            <div class="col-12 mb-3">
                <div class="form-floating">
                    <textarea class="form-control box border-none minH-100" id="address" v-model="patient.address" required></textarea>
                    <label for="address">Địa chỉ <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /address -->
        </div>
        <hr />
        <div class="row mb-3">
            <TitleHeader :title="'Thông tin phiên khám'" />
            <!-- diagnosis -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="session.diagnosis" name="diagnosis" :rules="validateRequired" />
                    <ErrorMessage name="diagnosis" class="text-danger" />
                    <label for="">Chuẩn đoán <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /diagnosis -->
            <!-- symptom -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="session.symptom" name="symptom" :rules="validateRequired" />
                    <ErrorMessage name="symptom" class="text-danger" />
                    <label for="">Triệu chứng <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /symptom -->
            <!-- leftEye -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="session.leftEye" name="leftEye" :rules="validateRequired" />
                    <label for="">Mắt trái</label>
                </div>
            </div>
            <!-- /leftEye -->
            <!-- rightEye -->
            <div class="col-lg-3 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="session.rightEye" name="rightEye" :rules="validateRequired" />
                    <label for="">Mắt phải</label>
                </div>
            </div>
            <!-- /rightEye -->
        </div>
        <div class="row mb-3">
            <div class="table-container">
                <div class="tr">
                    <div class="th" v-for="(item, index) in tableHeaders" :key="index">
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
                    <label for="">Huyết áp</label>
                </div>
            </div>
            <!-- /bloodPressure -->
            <!-- weight -->
            <div class="col-lg-3 col-md-4 col-sm-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="sessionDetail.weight" name="weight" />
                    <label for="">Cân nặng</label>
                </div>
            </div>
            <!-- weight -->
            <!-- heartbeat -->
            <div class="col-lg-3 col-md-4 col-sm-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="sessionDetail.heartbeat" name="heartbeat" />
                    <label for="">Nhịp tim</label>
                </div>
            </div>
            <!-- /heartbeat -->
            <!-- nextTime -->
            <div class="col-lg-3 col-md-4 col-sm-12 mb-3">
                <div class="form-floating">
                    <datepicker-lite class="form-control picker-date box" :class-attr="'border-none'"
                        :name-attr="session.nextTime"
                        :show-bottom-button="true" :value-attr="displayLocalDate_DDMMYYYY(session.nextTime)" :locale="locale"
                        @value-changed="setNextTime"
                    />
                    <label for="">Lịch tái khám</label>
                </div>
            </div>
            <!-- /nextTime -->
        </div>

        <div class="row mb-3">
            <!-- treatmentPlan -->
            <div class="col-12 mb-3">
                <div class="form-floating">
                    <textarea class="form-control box border-none minH-100" id="treatmentPlan" v-model="session.treatmentPlan" required></textarea>
                    <label for="treatmentPlan">Điều trị: <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /treatmentPlan -->
            <!-- note -->
            <div class="col-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="session.note" name="note"/>
                    <label for="">Ghi chú</label>
                </div>
            </div>
            <!-- /note -->
        </div>
        <hr>
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
import { ref, reactive, watch } from 'vue';
import { Form, Field, ErrorMessage } from "vee-validate";

import DatepickerLite from "vue3-datepicker-lite";
import BaseButton from '~~/components/common/BaseButton.vue';
import BackButton from '~~/components/common/BackButton.vue';
import {validateRequired, validateSelect} from '~~/services/common.js';
import { genders } from "~~/constants/enum.js";
import TitleHeader from '~~/components/common/TitleHeader.vue';
import PrinterIcon from '~~/assets/images/icons/actions/PrinterIcon.vue';

import SessionService from '~~/services/model/session.service';
import { displayLocalDate_DDMMYYYY } from '~~/constants/format-date.js';

export default {
    components: { DatepickerLite, Form, Field, ErrorMessage, TitleHeader, PrinterIcon, BaseButton, BackButton },
    props: [ "id", "session" ],
    data() {
        const locale = {
            format: "DD/MM/YYYY",
            weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            startsWeeks: 0,
            todayBtn: "Today",
            clearBtn: "Clear",
            closeBtn: "Close",
        };

        const tableHeaders = [
            { text: "Mắt", acronym: "(Eyes)"},
            { text: "Cầu", acronym: "(SPH)"},
            { text: "Trụ", acronym: "(CYL)"},
            { text: "Trục", acronym: "(AXIS)"},
            { text: "Cộng thêm", acronym: "(ADD)"},
            { text: "KCĐT", acronym: "(PD)"}
        ];

        return {
            locale: locale,
            tableHeaders
        };
    },
    setup(props) {
        const { $showToast } = useNuxtApp();
        const sessionId = ref("");
        
        const patient = reactive({
            id: null,
            name: "",
            phone: "",
            dob: "",
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
            createdDate: ""
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
            leftPD: "", rightPD: ""
        });

        watch([props], () => setSessionData());

        function setSessionData() {
            let sessionExisted = props.session;
            if (sessionExisted) {
                sessionId.value = sessionExisted.id;
                session.code = sessionExisted.code;
                session.diagnosis = sessionExisted.diagnosis;
                session.symptom = sessionExisted.symptom;
                session.treatmentPlan = sessionExisted.treatmentPlan;
                session.note = sessionExisted.note;
                session.status = sessionExisted.status;
                session.nextTime = sessionExisted.nextTime;
                session.displayNextTime = sessionExisted.nextTime;
                session.totalPrice = sessionExisted.totalPrice;
                setSessionDetail(sessionExisted.sessionDetail);
                setPatient(sessionExisted.patient);
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
                patient.displayDob = patientExisted.dob;
                patient.gender = patientExisted.gender;
                patient.address = patientExisted.address;
            }
        }

        const setPatientDOB = (e) => patient.displayDob = e;
        const setNextTime = (e) => session.displayNextTime = e;

        function onSubmit() {
            console.log("Entering onSubmit");
            let sessionData = {
                id: sessionId.value,
                code: session.code,
                diagnosis: session.diagnosis,
                symptom: session.symptom,
                treatmentPlan: session.treatmentPlan,
                note: session.note,
                displayNextTime: session.displayNextTime,
                totalPrice: session.totalPrice,
                sessionDetail,
                patient
            };

            if (sessionId.value) {
                sessionData["createdBy"] = session.createdBy;
                sessionData["createdDate"] = session.createdDate;
            }

            console.log("Session: ", sessionData);
            SessionService.saveOrUpdate(sessionData)
            .then((response) => {
                let responseData = response.data;
                if (responseData) {
                    console.log("responseData: ", responseData);
                    navigateTo("/session");
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
        }
        
        return {
            patient, session, sessionDetail,
            genders,

            onSubmit,
            setPatientDOB,
            setNextTime,
            validateRequired,
            validateSelect,
            displayLocalDate_DDMMYYYY
        }
    }
}
</script>
<style lang="scss">
    
</style>