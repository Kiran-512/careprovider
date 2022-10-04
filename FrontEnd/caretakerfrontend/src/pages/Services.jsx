import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Services() {
  const [data, setData] = useState([])
  const [serviceName, setServiceName] = useState()
  const [charges, setCharges] = useState()
  const [pic, setPic] = useState()
  const [serviceid, setserviceid] = useState(0)
  const [isedit, setisedit] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!serviceName || !charges) {
      Swal.fire({
        title: 'Mandatory!',
        text: 'Please fill all the details!',
      })
      return
    }
    if (!isedit && !pic) {
      Swal.fire({ title: 'Validation Error', text: 'Please upload the photo!' })
      return
    }

    const fd = new FormData()
    fd.append('serviceName', serviceName)
    fd.append('pic', pic)
    fd.append('charges', charges)
    fd.append('id', serviceid)
    axios
      .post('http://localhost:8080/api/admin/services', fd)
      .then((resp) => {
        loadData()
        Swal.fire({ title: resp.data })
        setserviceid(0)
        setisedit(false)
        Swal.fire({
          title: resp.data,
        })
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: err.response.data,
          showConfirmButton: true,
          timer: 1500,
        })
      })
  }
  const deleteService = (id) => {
    axios
      .delete('http://localhost:8080/api/admin/services/' + id)
      .then((resp) => {
        loadData()
        Swal.fire({ title: resp.data })
      })
      .catch((err) => {
        console.log(err.error)
        Swal.fire({ title: 'Cannot delete', text: err.error })
      })
  }

  const editService = (x) => {
    setCharges(x.charges)
    setServiceName(x.serviceName)
    setisedit(true)
    setserviceid(x.id)
  }

  const loadData = () => {
    setCharges('')
    setPic('')
    setServiceName('')
    axios.get('http://localhost:8080/api/admin/services/').then((resp) => {
      setData(resp.data)
    })
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <div className='container mt-5'>
        <h5 className='p-2'>Services</h5>
        <div className='row'>
          <div className='col-sm-8'>
            <table className='table table-bordered'>
              <thead>
                <th>Id</th>
                <th>Service Name</th>
                <th>Charges</th>
                <th>Action</th>
              </thead>
              <tbody>
                {data
                  .filter((x) => x.isactive)
                  .map((x) => (
                    <tr key={x.id}>
                      <td>{x.id}</td>
                      <td>
                        <img
                          src={'http://localhost:8080/' + x.photo}
                          style={{ width: '70px' }}
                          alt={x.serviceName}
                        />
                        {x.serviceName}
                      </td>
                      <td>&#8377; {x.charges}</td>
                      <td>
                        <button
                          onClick={(e) => editService(x)}
                          className='btn btn-primary btn-sm float-end me-2'
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => deleteService(x.id)}
                          className='btn btn-outline-danger btn-sm float-end'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className='col-sm-4'>
            <form>
              <div className='mb-2'>
                <label>Service name</label>
                <input
                  type='text'
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  name='serviceName'
                  className='form-control'
                />
              </div>
              <div className='mb-2'>
                <label>Charges</label>
                <input
                  type='number'
                  value={charges}
                  onChange={(e) => setCharges(e.target.value)}
                  name='charges'
                  className='form-control'
                />
              </div>
              <div className='mb-2'>
                <label>Service photo</label>
                <input
                  type='file'
                  name='pic'
                  onChange={(e) => setPic(e.target.files[0])}
                  accept='.jpg,.png'
                  className='form-control'
                />
              </div>
              <button onClick={handleSubmit} className='btn btn-primary'>
                Save Service
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
