import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function ServiceDetails() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [gender, setgender] = useState('all')
  const [caretakers, setcaretakers] = useState()

  const navigate = useNavigate()

  const bookCareTaker = (caretakerid) => {
    if (startDate === '' && endDate === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select the dates!',
      })
      return
    }
    const payload = {
      service: id,
      caretaker: caretakerid,
      customer: sessionStorage.getItem('id'),
      startdate: startDate,
      enddate: endDate,
    }

    axios
      .post('http://localhost:8080/api/bookings', payload)
      .then((resp) => {
        Swal.fire({ title: 'Success', text: resp.data })
        navigate('/mybookings')
      })
      .catch((err) => {
        Swal.fire({ title: 'Error Occurred' })
      })
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/caretakers/services/' + id)
      .then((resp) => {
        setData(resp.data)
      })
  }, [])
  const loaddata = () => {
    axios
      .get('http://localhost:8080/api/caretakers/services/' + id)
      .then((resp) => {
        setData(resp.data)
        setcaretakers(resp.data.caretakers)
      })
      .catch((err) => console.log(err.error))
  }

  const handleFilter = (e) => {
    e.preventDefault()
    axios
      .get('http://localhost:8080/api/caretakers/services/' + id)
      .then((resp) => {
        let alldata = resp.data.caretakers
        if (gender !== 'all') {
          alldata = alldata?.filter((x) => x.gender === gender)
        }
        setcaretakers(alldata)
      })
      .catch((err) => console.log(err.error))
  }

  useEffect(() => {
    loaddata()
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-sm-3'>
            <h5>Servce Details</h5>
            <div className='card'>
              <div className='card-header'>
                <h5 className='card-title'>{data?.service?.serviceName}</h5>
              </div>
              <img
                className='d-block img-responsive img-thumbnail'
                src={'http://localhost:8080/' + data?.service?.photo}
                style={{ maxHeight: '200px' }}
              />
              <div className='card-body'>
                Charges: &#8377; {data?.service?.charges} per day
              </div>
            </div>
          </div>
          <div className='col-sm-9'>
            <h5>Available Caretakers List</h5>
            <form className='row g-2'>
              <div className='col-3 offset-5'>
                <select
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  className='form-control mr-2'
                >
                  <option value='all'>Both Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
              </div>
              <button
                onClick={handleFilter}
                className='btn btn-primary col-1 offset-1'
              >
                Filter
              </button>
            </form>
            <table className='table table-sm'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {caretakers
                  ?.filter((x) => x.active)
                  .map((x) => (
                    <tr key={x.id}>
                      <td>{x.id}</td>
                      <td>
                        <img
                          src={'http://localhost:8080/' + x.profilephoto}
                          style={{ width: '60px', height: '60px' }}
                        />{' '}
                        {x.name}
                      </td>
                      <td>{x.gender}</td>
                      <td>{x.phone}</td>
                      <td>{x.address}</td>
                      <td>
                        <button
                          onClick={(e) => bookCareTaker(x.id)}
                          className='btn btn-sm btn-primary'
                        >
                          Book Caretaker
                        </button>
                        <br />
                        From :{' '}
                        <input
                          className='form-control'
                          onChange={(e) => {
                            setStartDate(e.target.value)
                          }}
                          type='date'
                        />
                        <br />
                        To :{' '}
                        <input
                          className='form-control'
                          onChange={(e) => {
                            setEndDate(e.target.value)
                          }}
                          type='date'
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
