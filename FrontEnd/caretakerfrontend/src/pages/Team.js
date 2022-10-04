import { Card, Row } from "react-bootstrap";
import aniket from './images/aniket.jpeg';
import kiran from './images/kiran.jpeg';
import meet from './images/meet.jpeg';
import aditya from './images/aditya.jpeg';
import vivek from './images/vivek.jpeg';


export default function Team() {
  return (
    <div className="mt-5 mx-auto p-4 rounded" style={{ background: "grey", color: 'white' }}>

      <div className="row">
        <h2 className="text-center">Meet Our Team</h2>
        <p className="text-center">Oldster Care Provider team brings you transperancy & service at your doorsteps! We have dedicated our service
          to give you best experience!
        </p>
      </div>

      <div className="row justify-content-evenly ">
        <div className="col-sm-2 " >
          <img src={aniket} alt="Aniket" className="rounded" style={{ width: '15rem', height: '15rem' }} />
          <h4 className="text-center mt-2">Aniket Kanchane</h4>
        </div>
        <div className="col-sm-2 ">
          <img src={kiran} alt="Kiran" className="rounded" style={{ width: '15rem', height: '15rem' }} />
          <h4 className="text-center mt-2">Kiran Yadav</h4>
        </div>
        <div className="col-sm-2">
          <img src={meet} alt="Meet" className="rounded" style={{ width: '15rem', height: '15rem' }} />
          <h4 className="text-center mt-2" >Meet Patolia</h4>
        </div>
        <div className="col-sm-2 ">
          <img src={aditya} alt="Aditya" className="rounded" style={{ width: '15rem', height: '15rem' }} />
          <h4 className="text-center mt-2" >Aditya Ninave</h4>
        </div>
        <div className="col-sm-2">
          <img src={vivek} alt="Vivek" className="rounded" style={{ width: '15rem', height: '15rem' }} />
          <h4 className="text-center mt-2">Vivek Kadam</h4>
        </div>
      </div>
    </div >
  );
}