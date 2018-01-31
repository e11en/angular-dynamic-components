import { Action } from '@ngrx/store';

export function listReducer(state: Array<{id: number, displayValue: string}> = [], action: Action) {
    switch (action.type) {
        case 'GET_ALL':
            return state = [
                {id: 1, displayValue: 'Some list item'},
                {id: 2, displayValue: 'Another list item'},
            ];
        default:
            return state;
    }
}
