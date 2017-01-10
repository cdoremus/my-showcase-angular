import { ContentItem } from './../shared/contentitem';
import { Action } from '@ngrx/store';
// Modelled after ngrx book example actions here:
//  https://github.com/ngrx/example-app/blob/master/src/app/actions/book.ts


// declare a 'string enum' as per http://angularfirst.com/typescript-string-enums/
const ActionType = {
  SAVE_ITEM: 'SAVE_ITEM' as 'SAVE_ITEM',
  UPLOAD_FILE: 'UPLOAD_FILE' as 'UPLOAD_FILE'
};
type ActionType = (typeof ActionType)[keyof typeof ActionType];
export { ActionType };

// interface improves type safety of actions
export interface AppAction {
  type: ActionType;
  payload: ContentItem | ContentItem[];
}

export class SaveItemAction implements AppAction, Action {
  type = ActionType.SAVE_ITEM;

  constructor(public payload: ContentItem) {}
}

export class UploadFileAction implements AppAction, Action {
  type = ActionType.UPLOAD_FILE;

  constructor(public payload: ContentItem) {}
}

//
export type Actions = SaveItemAction | UploadFileAction;
