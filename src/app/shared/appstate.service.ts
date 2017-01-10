import { ContentItem } from './contentitem';
import { Injectable } from '@angular/core';

@Injectable()
export class AppStateService {
  currentContentItem: ContentItem;

  constructor() { }

}
