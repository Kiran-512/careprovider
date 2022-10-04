import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function CaretakerDetails() {
  const [data, setData] = useState()
  const { id } = useParams()

  const handleActivate = (e) => {
    let status = data?.active ? 'DeActivate' : 'Activate'
    Swal.fire({
      title: `Do you want to ${status} this caretaker?`,
      showCancelButton: true, // cancel button is visible now
      confirmButtonText: status,
      // to change the text on the confirm button
    }).then((result) => {
      // console.log(result)
      /*
{isConfirmed: true, isDenied: false, isDismissed: false, value: true}
isConfirmed : true
isDenied : false
isDismissed : false
value : true
[[Prototype]] :Object
*/
      if (result.isConfirmed) {
        updateStatus()
      }
    })
  }
  const updateStatus = () => {
    axios.put('http://localhost:8080/api/caretakers/' + id).then((resp) => {
      loadData()
      Swal.fire({
        title: resp.data,
      })
    })
  }
  const loadData = () => {
    axios.get('http://localhost:8080/api/caretakers/' + id).then((resp) => {
      setData(resp.data)
    })
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <div className='container mt-5'>
        {data?.active ? (
          <button className='btn btn-danger float-end' onClick={handleActivate}>
            DeActivate
          </button>
        ) : (
          <button
            className='btn btn-primary float-end'
            onClick={handleActivate}
          >
            Activate
          </button>
        )}
        <h4>Caretaker Details of {data?.name}</h4>
        <table className='table table-bordered mt-4'>
          <thead>
            <tr>
              <th
                rowspan={7}
                style={{ width: '200px' }}
                className='text-center'
              >
                <img
                  src={'http://localhost:8080/' + data?.profilephoto}
                  style={{ width: '200px' }}
                  alt='Adhar Card'
                />
                <br />
                Profile Photo
              </th>
              <th>Caretaker name</th>
              <th>{data?.name}</th>
              <th rowspan={7}>
                <img
                  src={'http://localhost:8080/' + data?.uidphoto}
                  style={{ width: '400px', height: '250px' }}
                  alt='Adhar Card'
                />
                <br />
                Adhar Id
              </th>
            </tr>
            <tr>
              <th>Gender</th>
              <th>{data?.gender}</th>
            </tr>
            <tr>
              <th>Address</th>
              <th>{data?.address}</th>
            </tr>
            <tr>
              <th>Phone no</th>
              <th>{data?.phone}</th>
            </tr>
            <tr>
              <th>Email Id</th>
              <th>{data?.userid}</th>
            </tr>
            <tr>
              <th>Service</th>
              <th>{data?.service?.serviceName}</th>
            </tr>
            <tr>
              <th>Owner Status</th>
              <th>{data?.active ? 'Active' : 'Inactive'}</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  )
}
