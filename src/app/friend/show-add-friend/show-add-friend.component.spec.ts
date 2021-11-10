import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAddFriendComponent } from './show-add-friend.component';

describe('ShowAddFriendComponent', () => {
  let component: ShowAddFriendComponent;
  let fixture: ComponentFixture<ShowAddFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAddFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAddFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
