import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [transaction, setTransaction] = useState({
    description: '',
    amount: ''
  })
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem('list')) || []
  )
  const [balance, setBalance] = useState('')
  const [credit, setCredit] = useState(
    JSON.parse(localStorage.getItem('credit'))
  )
  const [debit, setDebit] = useState(JSON.parse(localStorage.getItem('debit')))

  const updateForm = e => {
    setTransaction({
      ...transaction,
      [e.target.name]:
        e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    })
  }

  const getBalance = () => {
    const amounts = list.map(i => i.amount)
    const money = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
    setBalance(money)
  }

  useEffect(() => {
    getBalance()
    localStorage.setItem('list', JSON.stringify(list))
    localStorage.setItem('credit', JSON.stringify(credit))
    localStorage.setItem('debit', JSON.stringify(debit))
  }, [list])

  const plusMinus = () => {
    transaction.amount > 0
      ? setCredit(credit + transaction.amount)
      : setDebit(debit + transaction.amount)
  }

  const clearBudget = () => {
    setList([])
    setCredit(null)
    setDebit(null)
  }

  return (
    <div>
      <h1 className="title">Budget</h1>
      <div className="container layout">
        <div className="form">
          <h2 className="subtitle">Enter an Item</h2>
          <form
            onSubmit={e => {
              e.preventDefault()
              setList([transaction, ...list])
              plusMinus()
              setTransaction({ description: '', amount: '' })
            }}
          >
            <div>
              <input
                type="text"
                className="input"
                placeholder="Enter Transaction"
                value={transaction.description}
                name="description"
                onChange={updateForm}
              />
            </div>
            <input
              type="number"
              className="input"
              placeholder="Enter Amonut"
              name="amount"
              value={transaction.amount}
              onChange={updateForm}
            />
            <div>
              <button type="submit" className="button is-primary">
                Submit
              </button>
            </div>
          </form>
          <div>
            <button className="button is-danger" onClick={clearBudget}>
              Clear Budget
            </button>
            <h2 className="subtitle">History</h2>
            {list.map(i => {
              return (
                <table className="table">
                  <tbody key={i.description}>
                    <tr>{i.description}</tr>
                    <td>${parseInt(i.amount)}</td>
                  </tbody>
                </table>
              )
            })}
          </div>
        </div>
      </div>
      <div className="totals">
        <h2 className="subtitle">Current Balance:</h2>
        <h3>${balance}</h3>
        <div>
          <h3 className="subtitle">Credit</h3>
          <h4>${credit}</h4>
        </div>
        <div>
          <h3 className="subtitle">Debit</h3>
          <h2>${debit}</h2>
        </div>
      </div>
    </div>
  )
}

export default App
