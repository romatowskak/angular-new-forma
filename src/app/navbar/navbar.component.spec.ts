import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navbar title in a "p" tag', () => {
    const title = 'All Projects';
    const compiled = fixture.nativeElement;
    const titleParagraph = compiled.querySelector('p');
    expect(titleParagraph.textContent).toContain(title);
  });

  it('should contain 3 menu links', () => {
    expect(fixture.debugElement.queryAll(By.css('.menuLink')).length).toBe(3);
  });
});
