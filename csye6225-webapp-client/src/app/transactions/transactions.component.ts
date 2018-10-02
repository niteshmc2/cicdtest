import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  id;
  description;
  merchant;
  amount;
  example;
  date;
  category;
  transactions = [];

  constructor() { }

  createTransaction() {
    alert('create');
    // this
    //   .service
    //   .createTransaction(this.courseId, sectionName, maxSeats)
    //   .then(() => {
    //     this.loadSections(this.courseId);
    //   }).then(() => {this.sectionName = "";
    //   this.maxSeats = ""; this.seats = "";});
  }

  updateTransaction() {
    alert('update');
    // const newRem = newSeats - this.selectedSection.maxSeats + this.selectedSection.seats;
    // this
    //   .service
    //   .updateTransaction(this.selectedSection._id, newName, newSeats, newRem)
    //   .then(() => {
    //     this.loadSections(this.courseId);
    //   }).then(() => {this.sectionName="";
    //   this.maxSeats="";  this.seats = ""; });
  }

  deleteTransaction(sectionId) {
    // this
    //   .service
    //   .deleteTransaction(sectionId)
    //   .then(() => {
    //     this.loadSections(this.courseId);
    //   });
  }

  editTransaction(section) {
    // this.sectionName = section.name;
    // this.maxSeats = section.maxSeats;
    // this.seats = section.seats;
    // this.selectedSection = section;
  }

  logout() {
    // this.userservice
    //   .logout()
    //   .then(() =>
    //     this.router.navigate(['login']));

  }

  ngOnInit() {
  }

}
