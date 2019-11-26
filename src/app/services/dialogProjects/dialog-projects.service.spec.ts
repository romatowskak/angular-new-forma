import { TestBed } from '@angular/core/testing';

import { DialogProjectsService } from './dialog-projects.service';

describe('DialogProjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogProjectsService = TestBed.get(DialogProjectsService);
    expect(service).toBeTruthy();
  });
});
