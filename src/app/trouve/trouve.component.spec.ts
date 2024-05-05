import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrouveComponent } from './trouve.component';

describe('TrouveComponent', () => {
  let component: TrouveComponent;
  let fixture: ComponentFixture<TrouveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrouveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrouveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
