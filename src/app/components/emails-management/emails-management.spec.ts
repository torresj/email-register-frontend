import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsManagement } from './emails-management';

describe('EmailsManagement', () => {
  let component: EmailsManagement;
  let fixture: ComponentFixture<EmailsManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailsManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailsManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
