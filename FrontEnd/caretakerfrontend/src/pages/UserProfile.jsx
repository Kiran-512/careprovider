import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function UserProfile() {
  const [data, setData] = useState({
    name: '',
    address: '',
    phone: '',
    gender: '',
    userid: '',
    //        "id":sessionStorage.getItem("id")
  })
  const id = sessionStorage.getItem('id')
  const updateStatus = () => {
    axios
      .put('http://localhost:8080/api/customers/profile/' + id, data)
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
    axios
      .get(
        'http://localhost:8080/api/customers/' + sessionStorage.getItem('id')
      )
      .then((resp) => {
        setData(resp.data)
      })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <div className='container mt-5'>
        <h4>Customer Profile {data?.name}</h4>
        <table className='table table-bordered mt-4'>
          <thead>
            <tr>
              <th rowspan={10} style={{ verticalAlign: 'top', width: '200px' }}>
                <img
                  src={'http://localhost:8080/' + data?.profilephoto}
                  style={{ height: '200px' }}
                  alt='Profile'
                />
                <br />
              </th>
            </tr>
            <tr>
              <th>Customer name</th>
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
                  type='text'
                  maxLength={10}
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
              <th>Customer Status</th>
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
