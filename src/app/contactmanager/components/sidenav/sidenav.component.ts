import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT=720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall : boolean;

  @ViewChild(MatSidenav) sidenav:MatSidenav;

  //initialize an observable
  users:Observable<User[]>;

  constructor(private breakpointObserver:BreakpointObserver,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([`(max-width:${SMALL_WIDTH_BREAKPOINT}px)`])
    .subscribe(
      (state:BreakpointState)=>{
        this.isScreenSmall = state.matches;
      }
    );

    //call the service
    this.users = this.userService.users;
    this.userService.loadAll();

    // //whenever we get the data from the service
    // this.users.subscribe( data=>{
    //   //console.log(data);
    //   //Issue 1->if there are users present then by default show the first one(To avoid spinner being shown up)
    //   if(data.length > 0) this.router.navigate(['/contactmanager',data[0].id]);
    // })

    this.router.events.subscribe(()=>{
      if(this.isScreenSmall){
        this.sidenav.close();
      }
    })
  }

}
