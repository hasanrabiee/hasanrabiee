import axios from "axios";
import {GET_STANDARD_CATEGORY_URL, GET_STANDARD_CONTROL_URL, GET_STANDARD_URL} from "../../../env/Env";
import {createAction} from "@reduxjs/toolkit";
import {openNotificationWithIcon} from "../../../components/utilities/Notif";

export const setCategory = createAction("SET_STANDARD")
export const setCategoryByStandard = createAction("SET_CATEGORY_BY_STANDARD")


export function getStandardCategories() {
    return dispatch => {
        axios(GET_STANDARD_CATEGORY_URL).then(response => {
            dispatch(setCategory(response.data.data))
        })
    }
}


export function getControl(id, form) {
    axios(GET_STANDARD_CONTROL_URL + `/${id}`).then(response => {
        form.setFieldsValue({
            name: response.data.name,
            standard_standard_id: response.data.category.id,
            standard_category_id: response.data.standard_category_id,
        })
    })
}


export function getStandardCategoryByStandard(id) {
    return dispatch => {
        axios(GET_STANDARD_CATEGORY_URL + `?query[generalSearch][standard_standard_id]=${id}`).then(response => {
            dispatch(setCategoryByStandard(response.data.data))
        })
    }

}


export function createControl(values) {
    axios.post(GET_STANDARD_CONTROL_URL, values).then(() => {
        openNotificationWithIcon("success", "کنترل جدید با موفقیت ایجاد شد");
    })
}


export function updateControl(id, values) {
    axios.put(GET_STANDARD_CONTROL_URL + `/${id}`, values).then(() => {
        openNotificationWithIcon("success", "کنترل با موفقیت بروزرسانی شد");
    })
}
