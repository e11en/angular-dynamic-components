import { Action } from '@ngrx/store';

export function listReducer(state: Array<any> = [], action: Action) {
    switch (action.type) {
        case 'SET_LIST':
            return state = action.payload;
        default:
            return state;
    }
}
