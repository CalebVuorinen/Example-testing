import { Component, OnInit } from '@angular/core';
import { UserService }       from '../model/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent  implements OnInit {
  public welcome: string;
  public newCharText: string;
  public newFullNumber: number;
  public newListValue: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.welcome = this.userService.isLoggedIn ?
      'Welcome, ' + this.userService.user.name : 'Please log in.';
  }

  public validateCharText(newCharText: string): void {
    if (newCharText.length <= 10) {
      this.newCharText = newCharText;
      if (newCharText.length < 5){
        this.newCharText = 'Result was less than 5 chars!';
      }
    }
  };

  public validateListItem(newListItem: string): void {
    if (newListItem == "" || newListItem == "Opt1"|| newListItem == "Opt2"|| newListItem == "Opt3"|| newListItem == "Opt4"|| newListItem == "Opt5") {
      this.newListValue = newListItem;
    }
  };

  public validateFullNumber(newFullNumber: number): void {
    if (this.isNumber(newFullNumber) == true) {
      this.newFullNumber = newFullNumber;
    }
  };

  private isNumber(value: string | number): boolean  {
   return !isNaN(Number(value.toString()));
  }
}
