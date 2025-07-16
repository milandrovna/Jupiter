import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontpageBannerComponent } from './frontpage-banner.component';

describe('FrontpageBannerComponent', () => {
  let component: FrontpageBannerComponent;
  let fixture: ComponentFixture<FrontpageBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontpageBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontpageBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
