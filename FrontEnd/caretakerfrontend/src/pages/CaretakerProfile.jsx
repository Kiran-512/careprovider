import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function CaretakerProfile() {
  const [data, setData] = useState({
    name: '',
    address: '',
    userid: '',
    dob: '',
    phone: '',
    active: '',
    gender: '',
  })

  const id = sessionStorage.getItem('id')
  const updateStatus = () => {
    axios
      .put('http://localhost:8080/api/caretakers/profile/' + id, data)
      .then((resp) => {
        loadData()
        Swal.fire({
          title: resp.data,
        })
      })
  }

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
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
        <h4>CareTaker Profile</h4>
        <table className='table table-bordered mt-4'>
          <thead>
            <tr>
              <th rowSpan={10} style={{ verticalAlign: 'top' }}>
                Profile Photo
                <br />
                <img
                  style={{ height: '170px' }}
                  src={'http://localhost:8080/' + data?.profilephoto}
                  alt='Profile photo'
                />
                <br />
                Adhar Id
                <br />
                <img
                  src={'http://localhost:8080/' + data?.uidphoto}
                  style={{ height: '200px' }}
                  alt='Adhar image'
                />
              </th>
            </tr>
            <tr>
              <th>Owner name</th>
              <th>
                <input
                  type='text'
                  onChange={handleInput}
                  className='form-control'
                  name='name'
                  value={data?.name}
                />
              </th>
            </tr>
            <tr>
              <th>Gender</th>
              <th>
                <input
                  type='text'
                  onChange={handleInput}
                  className='form-control'
                  name='gender'
                  value={data?.gender}
                />
              </th>
            </tr>
            <tr>
              <th>Address</th>
              <th>
                <input
                  type='text'
                  onChange={handleInput}
                  className='form-control'
                  name='address'
                  value={data?.address}
                />
              </th>
            </tr>
            <tr>
              <th>Phone no</th>
              <th>
                <input
                  maxLength={10}
                  type='text'
                  onChange={handleInput}
                  className='form-control'
                  name='phone'
                  value={data?.phone}
                />
              </th>
            </tr>
            <tr>
              <th>Email Id</th>
              <th>
                <input
                  type='text'
                  readOnly
                  className='form-control'
                  value={data?.userid}
                />
              </th>
            </tr>
            <tr>
              <th>Owner Status</th>
              <th>{data?.active ? 'Active' : 'Inactive'}</th>
            </tr>
            <tr>
              <th colSpan={2}>
                <button
                  onClick={updateStatus}
                  className='btn btn-primary float-end'
                >
                  Update Profile
                </button>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  )
}
