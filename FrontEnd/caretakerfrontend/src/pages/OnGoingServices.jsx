import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'

export default function OnGoingServices() {
  const [data, setData] = useState([])
  const role = sessionStorage.getItem('role')

  useEffect(() => {
    axios.get('http://localhost:8080/api/bookings').then((resp) => {
      setData(resp.data)
    })
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <h5 className='p-2'>Booking History</h5>
        <table className='table table-bordered'>
          <thead>
            <th>Id</th>
            <th>Booking Date</th>
            <th>Service Details</th>
            <th>Caretaker Details</th>
            <th>Customer Details</th>
            <th>Payment Details</th>
            <th>Feedback</th>
          </thead>
          <tbody>
            {data
              .filter((x) => x.status == 'Paid')
              .map((x) => (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.createdon}</td>
                  <td>
                    {x.service.serviceName}
                    <br />
                    Rs.{x.service.charges} per day
                  </td>

                  <td>
                    <img
                      className='float-start me-2'
                      src={'http://localhost:8080/' + x.caretaker.profilephoto}
                      style={{ width: '70px', height: '80px' }}
                    />
                    Name: {x.caretaker.name}
                    <br />
                    Gender: {x.caretaker.gender}
                    <br />
                    Phone: {x.caretaker.phone}
                    <br />
                    Address: {x.caretaker.address}
                    <br />
                  </td>
                  <td>
                    <img
                      className='float-start me-2'
                      src={'http://localhost:8080/' + x.customer.profilephoto}
                      style={{ width: '70px', height: '80px' }}
                    />
                    Name: {x.customer.name}
                    <br />
                    Gender: {x.customer.gender}
                    <br />
                    Phone: {x.customer.phone}
                    <br />
                    Address: {x.customer.address}
                    <br />
                  </td>
                  <td>
                    <h6>Payment Date: {x?.payment?.pmtdate}</h6>
                    <h6>No of days: {x?.payment?.days}</h6>
                    <h6>Card No: {x?.payment?.cardno}</h6>
                    <h6>Amount: Rs.{x?.payment?.amount}</h6>
                  </td>
                  <td>
                    Feedback: {x?.feedback?.msg}
                    <br />
                    Ratings:{' '}
                    <ReactStars
                      count={5}
                      edit={false}
                      size={30}
                      value={x?.feedback?.ratings}
                      activeColor='#ffd700'
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
