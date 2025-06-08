import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQrComponent } from './generate-qr.component';

describe('GenerateQrComponent', () => {
  let component: GenerateQrComponent;
  let fixture: ComponentFixture<GenerateQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
