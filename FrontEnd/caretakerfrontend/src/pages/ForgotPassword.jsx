import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'

export default function ForgotPassword() {
  const [userid, setuserid] = useState('')
  const [question, setquestion] = useState('')
  const [pwd, setpwd] = useState('')
  const [confirmpass, setConfirmPass] = useState()
  const [answer, setanswer] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userid === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter userID!',
      })
      return
    }
    if (question == '') {
      swal.fire({
        icon: 'error',
        title: 'Opps!',
        text: 'Please enter security question!',
      })
      return
    } else if (pwd.length < 6 || pwd.length > 15) {
      swal.fire({
        icon: 'error',
        title: 'Opps!',
        text: 'Password must contains min 6 and max 15 characters!',
      })
      return
    } else if (confirmpass !== pwd) {
      swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Confirmed Password do not match!',
      })
      return
    } else {
      const data = {
        answer: answer,
        userid: userid,
        question: question,
        pwd: pwd,
      }

      axios
        .post('http://localhost:8080/api/admin/reset', data)
        .then((resp) => {
          swal.fire({ title: resp.data })
          navigate('/login')
        })
        .catch((error) => {
          swal.fire({ title: error.response.data })
        })
    }
  }

  return (
    <>
      <div className='container mt-5'>
        <h5>Forogot Password</h5>
        <div className='row'>
          <div className='col-sm-5 mx-auto'>
            <form>
              <div>
                <div className='mb-3 row'>
                  <label className='col-sm-4 col-form-label'>User Id</label>
                  <div className='col-sm-8'>
                    <input
                      type='text'
                      onChange={(e) => setuserid(e.target.value)}
                      className='form-control'
                    />
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className='col-sm-4 col-form-label'>
                    Security Question
                  </label>
                  <div className='col-sm-8'>
                    <select
                      className='form-control'
                      value={question}
                      onChange={(e) => setquestion(e.target.value)}
                      required
                    >
                      <option>Select Security Question</option>
                      <option>What is your nick name ?</option>
                      <option>Which is your favorite pet name ?</option>
                    </select>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className='col-sm-4 col-form-label'>Answer</label>
                  <div className='col-sm-8'>
                    <input
                      type='text'
                      onChange={(e) => setanswer(e.target.value)}
                      className='form-control'
                    />
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className='col-sm-4 col-form-label'>
                    New Password
                  </label>
                  <div className='col-sm-8'>
                    <input
                      type='password'
                      onChange={(e) => setpwd(e.target.value)}
                      className='form-control'
                    />
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className='col-sm-4 col-form-label'>
                    Repeat Password
                  </label>
                  <div className='col-sm-8'>
                    <input
                      type='password'
                      className='form-control'
                      onChange={(e) => {
                        setConfirmPass(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className='btn btn-primary float-end'
                >
                  Reset Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
