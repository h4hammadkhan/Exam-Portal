/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StartTestComponent } from './start-test.component';

describe('StartTestComponent', () => {
  let component: StartTestComponent;
  let fixture: ComponentFixture<StartTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
