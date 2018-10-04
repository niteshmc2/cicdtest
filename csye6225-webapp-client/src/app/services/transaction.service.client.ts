export class TransactionServiceClient {

  URL = 'http://localhost:3001';

  createTransaction = (transaction, auth) =>
    fetch(this.URL + '/transaction', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
      body: JSON.stringify(transaction)
    })
      .then(response => response.json())

  findTransactionsForUser = (auth) =>
    fetch(this.URL  + '/transaction', {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Basic ' + auth
      }
    })
      .then(response => response.json())


  updateTransaction = (transactionId, newTransaction) => {
    return fetch(this.URL  + '/transaction/' + transactionId, {
      method: 'put',
      body: JSON.stringify(newTransaction),
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Basic '
      },
    })
      .then(response => response.json());
  }

  deleteTransaction(transactionId) {
    return fetch(this.URL  + '/transaction/' + transactionId, {
      method: 'delete',
      credentials: 'include',
      headers: {
        'Authorization': 'Basic '
      }
    });
  }

}
