import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterNickName } from './enter-nick-name';

describe('EnterNickName', () => {
  let component: EnterNickName;
  let fixture: ComponentFixture<EnterNickName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterNickName]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterNickName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
