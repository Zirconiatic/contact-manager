import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  user:User;

  constructor(private route:ActivatedRoute, private userService:UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      let id = params['id'];
      if(!id) id=1;
      this.user = null;
      //2nd issue-> after selecting a contact, after refreshing, you would still get the spinner, to avoid this
      //we can subscribe the same
      //this.user = this.userService.userById(id);->Before, this was causing the issue

      this.userService.users.subscribe(user =>{
        if(user.length == 0) return;
        this.user = this.userService.userById(id);
      })
    })
  }

}
