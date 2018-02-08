import { Action } from '@ngrx/store';

export interface AppState {
    listItems: Array<any>;
    formItem: any;
}

export interface NgAction extends Action {
    type: string;
    payload?: any;
}

export interface RouteState {
    componentType: string;
    metaData: Array<any>;
}
