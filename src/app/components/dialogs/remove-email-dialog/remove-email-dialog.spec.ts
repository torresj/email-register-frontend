import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveEmailDialog } from './remove-email-dialog';

describe('RemoveEmailDialog', () => {
  let component: RemoveEmailDialog;
  let fixture: ComponentFixture<RemoveEmailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveEmailDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveEmailDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
