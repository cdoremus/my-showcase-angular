import { TestBed, inject } from '@angular/core/testing';

import { ContentEditorComponent } from './contentEditor.component';

describe('a contentEditor component', () => {
  let component: ContentEditorComponent;

  // register all needed dependencies
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContentEditorComponent
      ]
    });
  });

  // instantiation through framework injection
  beforeEach(inject([ContentEditorComponent], (ContentEditorComponent) => {
    component = ContentEditorComponent;
  }));

  it('should have an instance', () => {
    expect(component).toBeDefined();
  });
});
