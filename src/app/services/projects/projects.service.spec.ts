import { TestBed } from '@angular/core/testing';
import { ProjectsService } from './projects.service';
import { of } from 'rxjs';

describe('ProjectsService', () => {
  let projectsService;
  beforeEach(() => {
    projectsService = TestBed.get(ProjectsService);
  });

  it('should be created', () => {
    const service: ProjectsService = TestBed.get(ProjectsService);
    expect(service).toBeTruthy();
  });

  it('getProjectsNames() should return 1 object with project name', done => {
    const projectName = { name: 'CASD Wilson & Lamberton Middle Schools' };
    projectsService.getProjectsNames().subscribe(res => {
      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(projectName);
      expect(res[0].name).toEqual('CASD Wilson & Lamberton Middle Schools');
      done();
    });
  });

  it('getProjectsNames() should return multiple projects names', () => {
    const projectsNames = [
      { name: 'CASD Wilson & Lamberton Middle Schools' },
      { name: 'CASD Wilson & Lamberton Middle Schools' },
      { name: 'CASD Wilson & Lamberton Middle Schools' }
    ];
    spyOn(projectsService, 'getProjectsNames').and.returnValue(of(projectsNames));
    projectsService.getProjectsNames().subscribe(res => {
      expect(res.length).toEqual(3);
    });
  });
});
