import axios from 'axios'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function PaymentForm(item) {
  console.log(item)
  const { payment } = item?.id
  const [cardno, setcardno] = useState()
  const [nameoncard, setnameoncard] = useState()
  const [amount, setamount] = useState(item?.id?.service?.charges)
  const [days, setdays] = useState(1)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      amount === undefined ||
      cardno == undefined ||
      nameoncard === undefined ||
      days === undefined
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please provide all information',
      })
      return
    }
    if (days < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid days',
      })
      return
    }

    const data = {
      bookingid: item?.id?.id,
      cardno,
      nameoncard,
      amount,
      days,
    }

    axios
      .post('http://localhost:8080/api/bookings/payment', data)
      .then((resp) => {
        Swal.fire({ title: resp.data })
        navigate('/mybookings')
      })
      .catch((error) => {
        Swal.fire({ title: error.response.data })
      })
  }

  const calcAmount = (value) => {
    setdays(value)
    const charges = parseInt(item?.id?.service?.charges)
    const amt = charges * value
    console.log('charges', amt)
    setamount(amt)
  }

  return (
    <>
      {payment ? (
        <>
          <div className='card'>
            <div className='card-header'>
              <h4>Payment Details</h4>
            </div>
            <div className='card-body'>
              <h6>Payment Date: {payment?.pmtdate}</h6>
              <h6>No of days: {payment?.days}</h6>
              <h6>Card No: {payment?.cardno}</h6>
              <h6>Amount: Rs.{payment?.amount}</h6>
            </div>
          </div>
        </>
      ) : (
        <>
          <form className='card'>
            <div className='card-header'>
              <h5>Payment Details</h5>
            </div>
            <div className='card-body'>
              <div className='mb-3 row'>
                <label className='col-sm-4 col-form-label'>Card No</label>
                <div className='col-sm-8'>
                  <input
                    type='text'
                    onChange={(e) => setcardno(e.target.value)}
                    maxLength={16}
                    minLength={16}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='mb-3 row'>
                <label className='col-sm-4 col-form-label'>Name on Card</label>
                <div className='col-sm-8'>
                  <input
                    type='text'
                    onChange={(e) => setnameoncard(e.target.value)}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='mb-3 row'>
                <label className='col-sm-4 col-form-label'>
                  Charge Per day
                </label>
                <div className='col-sm-8'>
                  <input
                    type='number'
                    value={item?.id?.service?.charges}
                    disabled
                    className='form-control'
                  />
                </div>
              </div>
              <div className='mb-3 row'>
                <label className='col-sm-4 col-form-label'>No of days</label>
                <div className='col-sm-8'>
                  <input
                    type='number'
                    value={days}
                    onChange={(e) => calcAmount(e.target.value)}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='mb-3 row'>
                <label className='col-sm-4 col-form-label'>Amount</label>
                <div className='col-sm-8'>
                  <input
                    type='number'
                    readOnly
                    value={amount}
                    className='form-control'
                  />
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className='btn btn-primary float-end'
              >
                Pay Now
              </button>
            </div>
          </form>
        </>
      )}
    </>
  )
}
