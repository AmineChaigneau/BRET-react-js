import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    session: 3,
    boxes: 64,
    time_display_boxes: 600,
    showResults: false,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateSession: (state, action) => {
            const newValue = Number(action.payload);
            if (!Number.isNaN(newValue)) {
                state.session = action.payload;
            } else {
                console.warn('Payload is not a number, cannot update trainingIndex');
            }
        },
        updateBoxes: (state, action) => {
            const newValue = Number(action.payload);
            if (!Number.isNaN(newValue)) {
                state.boxes = action.payload;
            } else {
                console.warn('Payload is not a number, cannot update trainingIndex');
            }
        },
        updateTimeDisplay: (state, action) => {
            const newValue = Number(action.payload);
            if (!Number.isNaN(newValue)) {
                state.time_display_boxes = action.payload;
            } else {
                console.warn('Payload is not a number, cannot update trainingIndex');
            }
        },
        updateShowResults: (state, action) => { 
            state.showResults = action.payload;
        },
        resetSettings: () => initialState,
    },
});

export const { updateSession, updateBoxes, updateTimeDisplay, updateShowResults, resetSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
