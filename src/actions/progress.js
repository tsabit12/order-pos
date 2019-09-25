import { SET_PROGRESS_BAR } from "../types";

export const setProgressBar = (isOpen) => ({
 type: SET_PROGRESS_BAR,
 isOpen: isOpen
});