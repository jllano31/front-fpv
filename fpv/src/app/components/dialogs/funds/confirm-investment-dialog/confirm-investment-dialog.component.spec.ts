import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInvestmentDialogComponent } from './confirm-investment-dialog.component';

describe('ConfirmInvestmentDialogComponent', () => {
  let component: ConfirmInvestmentDialogComponent;
  let fixture: ComponentFixture<ConfirmInvestmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmInvestmentDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmInvestmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
