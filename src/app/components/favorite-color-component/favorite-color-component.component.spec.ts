import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FavoriteColorComponent } from './favorite-color-component.component';

describe('FavoriteColorComponentComponent', () => {
  let component: FavoriteColorComponent;
  let fixture: ComponentFixture<FavoriteColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteColorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 
}); 

