import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouseImgComponent } from './carouse-img.component';

describe('CarouseImgComponent', () => {
  let component: CarouseImgComponent;
  let fixture: ComponentFixture<CarouseImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouseImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouseImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
