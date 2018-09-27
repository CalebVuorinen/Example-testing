import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { UserService }      from '../model/user.service';
import { WelcomeComponent } from './welcome.component';

class MockUserService {
  isLoggedIn = true;
  user = { name: 'Test User'};
};

describe('WelcomeComponent (class only)', () => {
  let comp: WelcomeComponent;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      providers: [
        WelcomeComponent,
        { provide: UserService, useClass: MockUserService }
      ]
    });
    // inject both the component and the dependent service.
    comp = TestBed.get(WelcomeComponent);
    userService = TestBed.get(UserService);
  });

  it('should not have welcome message after construction', () => {
    expect(comp.welcome).toBeUndefined();
  });

  it('should welcome logged in user after Angular calls ngOnInit', () => {
    comp.ngOnInit();
    expect(comp.welcome).toContain(userService.user.name);
  });

  it('should ask user to log in if not logged in after ngOnInit', () => {
    userService.isLoggedIn = false;
    comp.ngOnInit();
    expect(comp.welcome).not.toContain(userService.user.name);
    expect(comp.welcome).toContain('log in');
  });
});

describe('WelcomeComponent', () => {

  let comp: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let componentUserService: UserService; // the actually injected service
  let userService: UserService; // the TestBed injected service
  let el: HTMLElement; // the DOM element with the welcome message

    let userServiceStub: Partial<UserService>;

  beforeEach(() => {
    // stub UserService for test purposes
    userServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User'}
    };

    TestBed.configureTestingModule({
       declarations: [ WelcomeComponent ],
    // providers:    [ UserService ]  // NO! Don't provide the real service!
                                      // Provide a test-double instead
       providers:    [ {provide: UserService, useValue: userServiceStub } ]
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    comp    = fixture.componentInstance;

    // UserService actually injected into the component
    userService = fixture.debugElement.injector.get(UserService);
    componentUserService = userService;
    // UserService from the root injector
    userService = TestBed.get(UserService);

    //  get the "welcome" element by CSS selector (e.g., by class name)
    el = fixture.nativeElement.querySelector('.welcome');
  });

  it('should welcome the user', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('Welcome', '"Welcome ..."');
    expect(content).toContain('Test User', 'expected name');
  });

  it('should welcome "Bubba"', () => {
    userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
    fixture.detectChanges();
    expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false; // welcome message hasn't been shown yet
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });

  it('should inject the component\'s UserService instance',
    inject([UserService], (service: UserService) => {
    expect(service).toBe(componentUserService);
  }));

  it('TestBed and Component UserService should be the same', () => {
    expect(userService === componentUserService).toBe(true);
  });

  it('stub object and injected UserService should not be the same', () => {
    expect(userServiceStub === userService).toBe(false);

    // Changing the stub object has no effect on the injected service
    userServiceStub.isLoggedIn = false;
    expect(userService.isLoggedIn).toBe(true);
  });

  
    describe('WelcomeComponent (functions)', () => {
      // Valid
      it('validateCharText - result should be less than 5', () => {
        // Arrange
        let charTest = "abc";
        // Act
        comp.validateCharText(charTest);
        // Assert
        expect(comp.newCharText === 'Result was less than 5 chars!').toBe(true);
      });

      // Valid 
      it('validateCharText - result should stay the same 5-10 ', () => {
        // Arrange
        let charTest = "abcde f";
        // Act
        comp.validateCharText(charTest);
        // Assert
        expect(comp.newCharText === charTest).toBe(true);
      });

      // Invalid class
      it('validateCharText - result should not change, >10', () => {
        // Arrange
        let charTest = "abcde f";
        let charTest2 = "abcde f abcde fööööö";
        // Act
        comp.validateCharText(charTest);
        expect(comp.newCharText === charTest).toBe(true);
        comp.validateCharText(charTest2);
        // Assert
        expect(comp.newCharText === charTest2).toBe(false);
        expect(comp.newCharText === charTest).toBe(true);
      });

      // Valid
      it('validateListItem - should set the value to be empty', () => {
        // Arrange
        let validateListItem = "";
        // Act
        comp.validateListItem(validateListItem);
        // Assert
        expect(comp.newListValue === validateListItem).toBe(true);
      });

      // Valid
      it('validateListItem - should set the selected option', () => {
        // Arrange
        let validateListItem = "Opt3";
        // Act
        comp.validateListItem(validateListItem);
        // Assert
        expect(comp.newListValue === validateListItem).toBe(true);
      });

      // Invalid
      it('validateListItem - should not change the value', () => {
        // Arrange
        let validateListItem1 = "Opt3";
        let validateListItem2 = "Optasdsda3";
        // Act
        comp.validateListItem(validateListItem1);
        expect(comp.newListValue === validateListItem1).toBe(true);
        comp.validateListItem(validateListItem2);
        // Assert
        expect(comp.newListValue === validateListItem1).toBe(true);
      });

      // Valid
      it('validateFullNumber - should change the value', () => {
        // Arrange
        let validateFullNumber: number = 8;
        // Act
        comp.validateFullNumber(validateFullNumber);
        // Assert
        expect(comp.newFullNumber === validateFullNumber).toBe(true);
      });

      // Invalid
      it('validateFullNumber - should not change the value', () => {
        // Arrange
        let validateFullNumber: number = 8;
        let validateListItem1 = "Opt3";
        let validateListItem2 = "Optasdsda3";
        // Act
        comp.validateFullNumber(validateFullNumber);
        expect(comp.newFullNumber === validateFullNumber).toBe(true);
        comp.validateFullNumber(validateListItem1 as any);
        // Assert
        expect(comp.newFullNumber === validateListItem1 as any).toBe(false);
        expect(comp.newFullNumber === validateFullNumber).toBe(true);
      });
    });
});
