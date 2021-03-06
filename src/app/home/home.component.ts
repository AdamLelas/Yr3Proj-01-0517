import { Component, OnInit } from '@angular/core';

import { User } from '../-models/index';
import { UserService, UserdataService } from '../-services/index';
import { BmiService } from '../bmi-calculator/index';



import { BmiCalculatorComponent } from 'app/bmi-calculator/bmi-calculator.component';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    bmr: number;
    show: boolean = false;
    user2: User;

    username:string;
    firstName:string;
    lastName:string;
    weight:number;
    height:number;
    age:number;
    goalWeight:number;

    tempa;
    tempfn;
    templn;
    tempw;
    temph;
    tempg;

    constructor(private userService: UserService, private userDataService: UserdataService, private bmiService: BmiService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }

    // getUserFromMock(){
    //     this.userDataService.getUser(this.currentUser.id).subscribe(
    //         data => {
    //             this.user2 = data;
    //         },
    //         error => {
    //             console.error(error);
    //         }

    //     )
    // }

    ngOnInit() {
        this.loadAllUsers();
        this.calcBmr();
        this.getUserInfo(this.currentUser);
        // this.tempa = this.currentUser.age;
        // this.tempfn = this.currentUser.firstName;
        // this.templn = this.currentUser.lastName;
        // this.tempw = this.currentUser.weight;
        // this.temph = this.currentUser.height;
        // this.tempg = this.currentUser.goalWeight;
    }

    getUserInfo(elephant){
        this.bmiService.getOneInfo(elephant.id).subscribe(
      data => {
          console.log('search results', data)
          this.username = data.username;
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          this.weight = data.weight;
          this.height = data.height;
          this.goalWeight = data.goalWeight;
          this.age = data.age;
    },    
      (err) => alert("Error getting user information:" + err)
    )
  }
    deleteUser(id: number) {
        if (confirm("Delete User? This is permanent and cannot be undone!")) {
            this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
            this.delUser2();
        }
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    calcBmr() {
        this.bmr = 66 + (13.17 * this.currentUser.weight) + (5 * (this.currentUser.height * 100) - (6.8 * this.currentUser.age));
    }

    delUser2() {

        this.userDataService.deleteUser2().subscribe()

    }

    updateUser() {
        let tempUser = new User();

        tempUser.firstName = this.tempfn;
        tempUser.lastName = this.templn;
        tempUser.weight = this.tempw;
        tempUser.height = this.temph;
        tempUser.age = this.tempa;
        tempUser.goalWeight = this.tempw;

        tempUser.id = this.currentUser.id;
        tempUser.password = this.currentUser.password;
        tempUser.username = this.currentUser.username;
        // let body = JSON.stringify(tempUser);
        this.userDataService.serviceUpdateUser(tempUser).subscribe(
            data => {
                console.log("after put: ", data);
                this.userDataService.getUser(data.userId);
            }
        );

    }




}