import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSerachComponent } from './select-serach.component';

describe('SelectSerachComponent', () => {
  let component: SelectSerachComponent;
  let fixture: ComponentFixture<SelectSerachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSerachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSerachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
