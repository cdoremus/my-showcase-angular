/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContentEditorService } from './contentEditor.service';

describe('Service: ContendEditor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentEditorService]
    });
  });

  it('should ...', inject([ContentEditorService], (service: ContentEditorService) => {
    expect(service).toBeTruthy();
  }));
});
