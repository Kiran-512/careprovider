import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function MyBookings() {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const role = sessionStorage.getItem('role')

  const handleUpdate = (id, status) => {
    axios
      .get('http://localhost:8080/api/bookings/status/' + id + '/' + status)
      .then((resp) => {
        Swal.fire({ title: resp.data })
        loadData()
      })
  }
  const handlePayment = (id) => {
    navigate('/payment/' + id)
  }

  const loadData = () => {
    if (role === 'Customer') {
      axios
        .get(
          'http://localhost:8080/api/bookings/customers/' +
            sessionStorage.getItem('id')
        )
        .then((resp) => {
          setData(resp.data)
        })
    } else {
      axios
        .get(
          'http://localhost:8080/api/bookings/caretakers/' +
            sessionStorage.getItem('id')
        )
        .then((resp) => {
          setData(resp.data)
        })
    }
  }

  useEffect(() => {
    loadData()
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
            {role === 'Customer' ? <th>Caretaker Details</th> : null}
            {role === 'CareTaker' ? <th>Customer Details</th> : null}
            <th>Booking Details</th>
            <th>Action</th>
          </thead>
          <tbody>
            {data.map((x) => (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.createdon}</td>
                <td>
                  {x.service.serviceName}
                  <br />
                  Charges: Rs.{x.service.charges} per day
                </td>
                {role === 'Customer' ? (
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
                ) : null}
                {role === 'CareTaker' ? (
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
                ) : null}
                <td>
                  Status: {x.status}
                  <br />
                </td>
                <td>
                  {x.status === 'Pending' && role === 'CareTaker' ? (
                    <>
                      <button
                        onClick={(e) => handleUpdate(x.id, 'Cancelled')}
                        className='btn btn-danger btn-sm'
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => handleUpdate(x.id, 'Confirmed')}
                        className='btn btn-success ms-2 btn-sm'
                      >
                        Confirm
                      </button>
                    </>
                  ) : (
                    ''
                  )}
                  {x.status === 'Confirmed' && role === 'Customer' ? (
                    <>
                      <button
                        onClick={(e) => handlePayment(x.id)}
                        className='btn btn-primary btn-sm'
                      >
                        Pay Now
                      </button>
                    </>
                  ) : (
                    ''
                  )}
                  {x.status === 'Paid' ? (
                    <>
                      <button
                        onClick={(e) => handlePayment(x.id)}
                        className='btn btn-primary btn-sm'
                      >
                        Details
                      </button>
                    </>
                  ) : (
                    ''
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
