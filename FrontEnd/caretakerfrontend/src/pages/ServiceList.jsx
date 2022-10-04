import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function ServiceList() {
  const [data, setData] = useState([])

  const state = useSelector((state) => state)
  console.log(state) //{loggedin:{isLoggedin:true, role:user}}
  useEffect(() => {
    axios.get('http://localhost:8080/api/admin/services').then((resp) => {
      setData(resp.data)
    })
  }, [])
  return (
    <div className='container mt-5'>
      <div className='row'>
        {data.map((x) => x.isactive).length > 0 ? (
          data
            .filter((x) => x.isactive)
            .map((x) => (
              <div className='col-sm-3'>
                <div
                  className='card  border-2 shadow mb-2 bg-white rounded'
                  key={x.id}
                >
                  <div className='card-header text-center'>
                    <h5 className='card-title'>{x.serviceName}</h5>
                  </div>
                  <img
                    src={'http://localhost:8080/' + x.photo}
                    style={{ height: '200px' }}
                    className='img-fluid rounded-start'
                    alt='...'
                  />
                  <div className='card-body'>
                    <p className='card-text text-center'>
                      <br />
                      Charges ₹ {x.charges}
                    </p>
                    <p className='card-text'>
                      {state.loggedin.IsLoggedIn &&
                      sessionStorage.getItem('role') === 'Customer' ? (
                        <Link
                          className='btn btn-dark float-end'
                          to={'/services/' + x.id}
                        >
                          Book Service
                        </Link>
                      ) : (
                        ''
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <>
            <h5 className='p-2 container'>No records found..</h5>
          </>
        )}
      </div>
    </div>
  )
}
