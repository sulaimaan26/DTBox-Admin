import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoLevelComponent } from './video-level.component';

describe('VideoLevelComponent', () => {
  let component: VideoLevelComponent;
  let fixture: ComponentFixture<VideoLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
