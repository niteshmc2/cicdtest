import { Component, OnInit } from '@angular/core';
import {TransactionServiceClient} from '../services/transaction.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  auth = '';
  id;
  description;
  merchant;
  amount;
  example;
  date;
  category;
  transactions = [];

  constructor(private service: TransactionServiceClient,
              private userService: UserServiceClient,
              private router: Router,) {
     if (this.userService.auth === undefined)
     {

     } else {
     this.auth = this.userService.auth;
     this.loadTransactions();}
  }

  createTransaction() {
    const transaction = {
      "description": this.description,
      "merchant": this.merchant,
      "amount": this.amount,
      "date": this.date,
      "category": this.category
    }
    this
      .service
      .createTransaction(transaction, this.userService.auth)
      .then(() => {
        // this.loadTransactions();
      });
  }

  loadTransactions() {
    // alert('Load' + this.auth);
    this
      .service
      .findTransactionsForUser(this.auth)
      .then(res => {
            this.transactions = res;
            console.log(this.transactions);
      }).then(() => { });
  }

  updateTransaction() {
    // alert('update');
    // const newRem = newSeats - this.selectedSection.maxSeats + this.selectedSection.seats;
    const newTransaction = {
      "description": this.description,
      "merchant": this.merchant,
      "amount": this.amount,
      "date": this.date,
      "category": this.category
    };

    this
      .service
      .updateTransaction(this.id, newTransaction)
      .then(() => {
        // this.loadTransactions();
      }).then(() => { });
  }

  deleteTransaction(transactionId) {
    this
      .service
      .deleteTransaction(transactionId)
      .then(() => {
        // this.loadTransactions();
      });
  }

  editTransaction(transaction) {
    // this.sectionName = section.name;
    // this.maxSeats = section.maxSeats;
    // this.seats = section.seats;
    // this.selectedSection = section;
    this.id = transaction.id;
    this.description = transaction.description;
      this.merchant  = transaction.merchant;
      this.amount = transaction.amount;
      this.date = transaction.date;
        this.category = transaction.category;
    //
    // <td > {{transaction.id}}</td>
    // <td > {{transaction.description}}</td>
    // <td > {{transaction.merchant}}</td>
    // <td > {{transaction.amount}}</td>
    // <td > {{transaction.date}}</td>
    // <td > {{transaction.category}}</td>
  }

  logout() {
    // this.userservice
    //   .logout()
    //   .then(() =>
        this.router.navigate(['login']) ;

  }

  ngOnInit() {
    // this.loadTransactions();
  }

}
