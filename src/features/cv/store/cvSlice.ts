import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CvData, SavedCv, Experience, Education } from '../types';
import {
  initialCvData,
  emptyPersonalInfo,
  emptyExperience,
  emptyEducation,
} from './initialState';
import {
  loadDraft,
  saveDraft,
  clearDraft,
  loadSavedList,
  saveCvToList,
  deleteCvFromList,
  getCvById,
} from '../storage/cvStorage';

interface CvState {
  cvData: CvData;
  savedList: SavedCv[];
}

const initialState: CvState = {
  cvData: loadDraft(initialCvData),
  savedList: loadSavedList(),
};

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    setCvData(state, action: PayloadAction<CvData>) {
      state.cvData = action.payload;
      saveDraft(action.payload);
    },

    // ცალკე ველის განახლება
    updatePersonalInfo(
      state,
      action: PayloadAction<{ field: keyof CvData['personalInfo']; value: string }>
    ) {
      state.cvData.personalInfo[action.payload.field] = action.payload.value;
      saveDraft(state.cvData);
    },

    // გამოცდილება 
    updateExperience(
      state,
      action: PayloadAction<{ index: number; field: keyof Experience; value: string }>
    ) {
      const { index, field, value } = action.payload;
      if(!state.cvData.experiences[index]) {
        state.cvData.experiences[index] = { ...emptyExperience };
      }
      state.cvData.experiences[index][field] = value;
      saveDraft(state.cvData);
    },

    addExperience(state) {
      state.cvData.experiences.push({ ...emptyExperience });
      saveDraft(state.cvData);
    },

    removeExperience(state, action: PayloadAction<number>) {
      state.cvData.experiences.splice(action.payload, 1);
      saveDraft(state.cvData);
    },


    // განათლება
    updateEducation(
      state,
      action: PayloadAction<{ index: number; field: keyof Education; value: string }>
    ) {
      const { index, field, value } = action.payload;
      if (!state.cvData.educations[index]) {
        state.cvData.educations[index] = { ...emptyEducation };
      }
      state.cvData.educations[index][field] = value;
      saveDraft(state.cvData);
    },

    addEducation(state) {
      state.cvData.educations.push({ ...emptyEducation });
      saveDraft(state.cvData);
    },

    removeEducation(state, action: PayloadAction<number>) {
      state.cvData.educations.splice(action.payload, 1);
      saveDraft(state.cvData);
    },

    //  CV-ის შენახვა სიაში
    saveCurrentCv(state) {
      const saved = saveCvToList(state.cvData);
      state.savedList = [saved, ...state.savedList];
    },

    deleteSavedCv(state, action: PayloadAction<string>) {
      state.savedList = deleteCvFromList(action.payload);
    },

    loadCvById(state, action: PayloadAction<string>) {
      const found = getCvById(action.payload);
      if(found) {
        state.cvData = found.data;
        saveDraft(found.data);
      }
    },

    resetDraft(state) {
      clearDraft();
      state.cvData = {
        personalInfo: { ...emptyPersonalInfo },
        experiences: [],
        educations: [],
      };
    },
  },
});

export const {
  setCvData,
  updatePersonalInfo,
  updateExperience,
  addExperience,
  removeExperience,
  updateEducation,
  addEducation,
  removeEducation,
  saveCurrentCv,
  deleteSavedCv,
  loadCvById,
  resetDraft,
} = cvSlice.actions;

export default cvSlice.reducer;