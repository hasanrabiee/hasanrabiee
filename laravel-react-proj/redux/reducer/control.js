import {createReducer} from "@reduxjs/toolkit";
import {setStandard, setTreeStandard} from "../../actions/standard/standard";
import {setCategoryByStandard} from "../../actions/standard/category";

export const treeStandard = createReducer([], {
    [setTreeStandard]: (state, {payload}) => payload
})


export const standards = createReducer([],{
    [setStandard]:(state,{payload})=>payload
})

export const standardsCategoryByStandard = createReducer([],{
    [setCategoryByStandard]:(state,{payload})=>payload
})


