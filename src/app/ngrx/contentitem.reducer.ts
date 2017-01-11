import { ContentItem, defaultContentItem } from './../shared/contentitem';

import { ActionReducer, Action } from '@ngrx/store';

export interface State {
  items: ContentItem[];
  selectedItem: ContentItem;
};

const initialState: State = {
  items: [],
  selectedItem: defaultContentItem
};

const appState = (state: State = initialState, action: Action) => {

};
