import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'
import '../components/main.css'

export default function CustomerRegister() {
  return (
    <div>
      <CustomerTable />
    </div>
  )
}

function CustomerTable() {
  const navigate = useNavigate()

  const [name, setfullname] = useState('')
  const [email, setemail] = useState('')
  const [gender, setgender] = useState('')
  const [dob, setdob] = useState('')
  const [contactNo, setphonenumber] = useState('')
  const [password, setpassword] = useState('')
  const [uidPic, setadharcardimage] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [address, setAddress] = useState('')
  const [uid, setUid] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handleFileInput = (e) => {
    console.log(e.target.name)
    if (e.target.name == 'aadharphoto') setadharcardimage(e.target.files[0])
    else setProfilePic(e.target.files[0])
  }
  var letters = /^[A-Za-z]+$/
  var digits = /^[0-9]{10}/
  var uidregex = /^[0-9]{12}/

  const regex =
    /^([a-zA-Z0-9_\.\-\ ])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

  const handleForm = (e) => {
    e.preventDefault()
    if (name == '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter valid details!',
      })
    } else if (!letters.test(name)) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter Valid Name',
      })
    } else if (name.length < 2 || name.length > 15) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Name should be min 2 and max length is 15 letters',
      })
    } else if (email === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter valid details!',
      })
    } else if (!regex.test(email)) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter Valid Email Address',
      })
    } else if (contactNo === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter Contact Number',
      })
    } else if (!digits.test(contactNo)) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Contact number can not contain characters!',
      })
    } else if (uid === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter Aadhar Number',
      })
    } else if (uid.length < 12) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Adhar card no contains 12 digits!',
      })
    } else if (!uidregex.test(uid)) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Adhar card no can contain only digits!',
      })
    } else if (password === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter password',
      })
    } else if (password.length < 6 || password.length > 15) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password length is min 6 and max length is 15',
      })
    } else if (address === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter address ',
      })
    } else if (answer === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Please enter security question's answer ",
      })
    } else {
      submit()
    }
  }
  const submit = async () => {
    const fd = new FormData()
    fd.append('name', name)
    fd.append('userid', email)
    fd.append('gender', gender)
    fd.append('dob', dob)
    fd.append('phone', contactNo)
    fd.append('pwd', password)
    fd.append('adharpic', uidPic)
    fd.append('profilepic', profilePic)
    fd.append('uid', uid)
    fd.append('question', question)
    fd.append('answer', answer)
    fd.append('address', address)

    const url = `http://localhost:8080/api/customers`
    await axios
      .post(url, fd)
      .then((resp) => {
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registered Successfully',
          showConfirmButton: false,
          timer: 1500,
        })
        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
        swal.fire({
          position: 'center',
          icon: 'error',
          title: error.response.data,
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }

  return (
    <div className='container mt-5'>
      <div className='title'>User Registration Form</div>
      <form>
        <div className='user-details'>
          <div className='input-box'>
            <span className='details'>Full Name</span>
            <input
              type='text'
              placeholder='Enter your name'
              id='firstName'
              value={name}
              onChange={(e) => setfullname(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Gender</span>
            <select
              value={gender}
              onChange={(e) => setgender(e.target.value)}
              required
            >
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className='input-box'>
            <span className='details'>Address</span>
            <input
              type='text'
              placeholder='Enter your address'
              id='emailid'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Mobile Number</span>
            <input
              type='text'
              maxLength={10}
              minLength={10}
              placeholder='Enter your number'
              id='mobileNo'
              value={contactNo}
              onChange={(e) => setphonenumber(e.target.value)}
              required
            />
          </div>

          <div className='input-box'>
            <span className='details'>Date of Birth</span>
            <input
              type='date'
              placeholder='Date of Birth'
              id='dob'
              value={dob}
              onChange={(e) => setdob(e.target.value)}
              required
            />
          </div>

          <div className='input-box'>
            <span className='details'>Email</span>
            <input
              type='email'
              placeholder='Enter your email'
              id='emailid'
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Password</span>
            <input
              type='password'
              placeholder='Enter your password'
              id='password'
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Aadhar Number</span>
            <input
              type='email'
              placeholder='Enter your adhar number'
              minLength={12}
              maxLength={12}
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Security Question</span>
            <select
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            >
              <option>Select Security Question</option>
              <option>What is your nick name ?</option>
              <option>Which is your favorite pet name ?</option>
            </select>
          </div>
          <div className='input-box'>
            <span className='details'>Answer</span>
            <input
              type='text'
              placeholder='Enter your Answer'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Adhar Card Photo</span>
            <input
              type='file'
              className='form-control'
              placeholder='Upload Aadhar Card'
              name='aadharphoto'
              accept='.jpg,.png,.jpeg'
              onChange={handleFileInput}
              required
            />
          </div>

          <div className='input-box'>
            <span className='details'>Profile Photo</span>
            <input
              type='file'
              className='form-control'
              placeholder='Profile Photo'
              name='profilephoto'
              accept='.jpg,.png,.jpeg'
              onChange={handleFileInput}
              required
            />
          </div>
        </div>

        <div className='button'>
          <input
            type='submit'
            className='bg-info bg-gradient'
            value='Submit'
            onClick={handleForm}
          />
        </div>
      </form>
    </div>
  )
}
