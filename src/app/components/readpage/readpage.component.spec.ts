import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadpageComponent } from './readpage.component';

describe('ReadpageComponent', () => {
  let component: ReadpageComponent;
  let fixture: ComponentFixture<ReadpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
