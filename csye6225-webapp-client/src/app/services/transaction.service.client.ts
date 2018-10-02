export class TransactionServiceClient {

  URL = 'http://localhost:4200';

  createTransaction = (transaction) =>
    fetch(this.URL + '/transaction', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(transaction)
    })
      .then(response => response.json())

  findTransactionsForUser = () =>
    fetch(this.URL  + '/transaction', {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())


  updateTransaction = (transactionId, newTransaction) => {
    return fetch(this.URL  + '/transaction/' + transactionId, {
      method: 'put',
      body: JSON.stringify(newTransaction),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json());
  }

  deleteTransaction(transactionId) {
    return fetch(this.URL  + '/transaction/' + transactionId, {
      method: 'delete',
      credentials: 'include'
    });
  }

}
