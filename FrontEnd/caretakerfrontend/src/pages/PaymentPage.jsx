import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PaymentForm from '../components/PaymentForm'
import FeedbackForm from '../components/FeedbackForm'

export default function PaymentPage() {
  const { id } = useParams()
  const [data, setData] = useState({})
  const role = sessionStorage.getItem('role')
  useEffect(() => {
    axios.get('http://localhost:8080/api/bookings/' + id).then((resp) => {
      console.log('response', resp.data)
      setData(resp.data)
    })
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-sm-5 offset-1'>
            <h5>Booking Details</h5>
            <div className='card' style={{ width: '28rem' }}>
              <img
                style={{ height: '200px' }}
                className='card-img-top'
                src={'http://localhost:8080/' + data?.service?.photo}
                alt={'service'}
              />
              <div className='card-body'>
                <h5 className='card-title'>{data?.service?.serviceName}</h5>
              </div>
              <div className='card-body'>
                Care Taker : {data?.caretaker?.name}
              </div>
            </div>
          </div>
          {role === 'Customer' ? (
            <div className='col-sm-5'>
              <PaymentForm id={data} />
              <FeedbackForm id={data} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
