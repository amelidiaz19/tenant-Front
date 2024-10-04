import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPromotionalComponent } from './card-promotional.component';

describe('CardPromotionalComponent', () => {
  let component: CardPromotionalComponent;
  let fixture: ComponentFixture<CardPromotionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPromotionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPromotionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
