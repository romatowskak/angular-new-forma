import { TestBed } from '@angular/core/testing';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let projectService;
  beforeEach(() => {
    projectService = TestBed.get(ProjectsService);
  });

  it('should be created', () => {
    const service: ProjectsService = TestBed.get(ProjectsService);
    expect(service).toBeTruthy();
  });

  it('getProjectsNames() should return 1 object with project name', done => {
    const mockProject = { name: 'CASD Wilson & Lamberton Middle Schools' };
    projectService.getProjectsNames().subscribe(res => {
      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(mockProject);
      expect(res[0].name).toEqual('CASD Wilson & Lamberton Middle Schools');
      done();
    });
  });
});
