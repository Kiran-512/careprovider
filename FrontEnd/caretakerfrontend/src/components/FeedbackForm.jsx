import axios from 'axios'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

export default function FeedbackForm(item) {
  //{id:{id:1,caretaker:{id:1,name:kiran},customer:{},feedback:{}, payment:{]}}}

  console.log('booking ' + item)

  const { feedback } = item.id
  console.log('feedback ' + feedback)

  const { customer } = item.id
  console.log('customer ' + customer)

  const [msg, setmsg] = useState()
  const [ratings, setratings] = useState()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()

    if (msg === undefined || ratings === undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please provide all information',
      })
      return
    }

    const data = {
      //item ={id:{id:1,careetaker:{,customer:{},service:{},payment:{}, feedback:{}}}}
      bookingId: item?.id?.id, // cleared
      msg,
      ratings,
    }

    console.log(data)

    axios
      .post('http://localhost:8080/api/bookings/feedbacks', data)
      .then((resp) => {
        Swal.fire({ title: resp.data })
        navigate('/mybookings')
      })
      .catch((error) => {
        Swal.fire({ title: error.response.data })
      })
  }

  return (
    <>
      <div className='clearfix'></div>
      {feedback ? (
        <div className='card mt-2'>
          <div className='card-body'>
            <h5>Your Feedback</h5>

            <h6>{feedback?.msg}</h6>
            <h6>
              Ratings:{' '}
              <ReactStars
                count={5}
                edit={false}
                size={30}
                value={feedback?.ratings}
                activeColor='#ffd700'
              />
            </h6>
          </div>
        </div>
      ) : (
        <>
          <div className='card mt-2'>
            <div className='card-header'>
              <h5>Feedback Form</h5>
            </div>
            <div className='card-body'>
              <form>
                <div>
                  <div className='mb-3 row'>
                    <label className='col-sm-4 col-form-label'>Feedback</label>
                    <div className='col-sm-8'>
                      <textarea
                        type='text'
                        onChange={(e) => setmsg(e.target.value)}
                        rows={3}
                        minLength={16}
                        className='form-control'
                      ></textarea>
                    </div>
                  </div>
                  <div className='mb-3 row'>
                    <label className='col-sm-4 col-form-label'>Ratings</label>
                    <div className='col-sm-8'>
                      <ReactStars
                        count={5}
                        onChange={(val) => setratings(val)}
                        size={30}
                        activeColor='#ffd700'
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className='btn btn-primary float-end'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}
