import { Action } from '@ngrx/store';

export function formReducer(state: any = {id: null, text: null}, action: Action) {
    switch (action.type) {
        case 'SET_FORM':
            return state = action.payload;
        default:
            return state;
    }
}
