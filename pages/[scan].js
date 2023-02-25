import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import QRCode from 'qrcode'
import Link from 'next/link'
import axios from 'axios';
// import { useRouter } from 'next/router'
// import QrReader from 'react-qr-reader';
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from 'react';
import { Router, useRouter } from 'next/router';
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

export default function Scan({ eventsName }) {

  // console.log("EventsName:", eventsName.scan);
  const queryname = eventsName.scan;
  console.log(queryname);
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const [userDetails, setuserDetails] = useState([]);

  // const classes = useStyles();
  const qrRef = useRef(null);
  const [phonenumber, setphonenumber] = useState();
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [role, setrole] = useState();
  const [registeration, setregisteration] = useState();
  const [attendance, setattendance] = useState();

  const [foodcounter, setfoodcounter] = useState(false);
  const [foodscanner, setfoodScanner] = useState(false);
  const [alldata, setAllData] = useState({});
  const [present, setPesent] = useState(false);
  const [loginfailedpopup, setLoginfailedpopup] = useState(false);
  const router2 = useRouter();




  // const [attendance, setLogin] = useState(false);


  const router = useRouter()

  const scanFood = async (e) => {
    e.preventDefault();
    // setfoodScanner(true);
    // const saved = localStorage.getItem("itmes");
    // const localstoragedata = JSON.parse(saved)
    // console.log("current login", localstoragedata.phonenumber);
    router2.push("/foodscan")


  }
  const closeScaner = async (e) => {
    e.preventDefault();
    setfoodScanner(false);
    // const saved = localStorage.getItem("itmes");
    // const localstoragedata = JSON.parse(saved)
    // console.log("current login", localstoragedata.phonenumber);
    // router2.push("/" + localstoragedata.phonenumber)


  }

  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    // const saved = localStorage.getItem("items");
    const saved = localStorage.getItem("itmes");
    const localstoragedata = JSON.parse(saved)
    // console.log("current login", saved);

    if (result) {
      const text3 = JSON.stringify(result)
      console.log(result[17], "text2", result[14]);



      console.log("test data");
      if (result[14] === "1") {
        console.log("suscess");

        const data = {
          phonenumber: localstoragedata.phonenumber,
          firstname: localstoragedata.firstname,
          lastname: localstoragedata.lastname,
          attendance: "1"

        }
        axios.put('https://plankton-app-i2dnd.ondigitalocean.app/login/' + localstoragedata.phonenumber + '/', data).then(response => {
          console.log(response);
          const alldata = response.data;
          localStorage.setItem('itmes', JSON.stringify(response.data));
          setAllData(alldata);
          setPesent(true)
        });



      }


    }
  }


  const handleErrorFile = (error) => {
    console.log(error);
  }

  // const foodClick = async (e) => {
  //   e.preventDefault();

  //   axios.put('https://plankton-app-i2dnd.ondigitalocean.app/login/' + localstoragedata.phonenumber + '/', data).then(response => {
  //     console.log(response);
  //     const alldata = response.data;
  //     localStorage.setItem('qrdata', JSON.stringify(response.data));
  //     setAllData(alldata);
  //     setPesent(true)
  //   });





  //   console.log(showpopup);
  // };


  useEffect(() => {


    const saved = localStorage.getItem("itmes");
    const localstoragedata = JSON.parse(saved)

    if (saved) {
      console.log("already Login", localstoragedata.firstname);
      if (queryname === localstoragedata.phonenumber) {
        console.log("number match");
        axios.get(`https://plankton-app-i2dnd.ondigitalocean.app/login/${queryname}/`).then(response => {
          console.log(response);
          const alldata = response.data;
          setAllData(alldata)
          if (alldata.attendance === 1) {
            setPesent(true)
          }
          // if (alldata.foodcounter === 1) {
          //   setfoodcounter(true)
          // }

        });
      }

      else {
        console.log("Invalid URL");
        setLoginfailedpopup(true);
      }


    } else {
      router2.push("/")
    }
  }, [])



  return (
    <section className="wrapperScan">
      <div className='logo'>
        <img src='/universary.svg' />
      </div>
      {
        present ? <>
          <div className='welcomemessage'>
            <h5>
              Something Plus Business
            </h5>
            <h6>Welcome to Exploration Journey {alldata.firstname} {alldata.lastname}</h6>

          </div>
          <div className='programsequence'>
            <h2>Trajectory</h2>
            <ul>
              <li>
                <h6>Ganesh Vandana</h6>
                <p>Prarthana by Ashwin Joshi</p>
              </li>
              <li>
                <h6>Welcome Note</h6>
                <p>Abhishek and Gaurav</p>
              </li>
              <li>
                <h6>Journey</h6>
                <p>Journey Video</p>
              </li>
              <li>
                <h6>Value Introduction</h6>
                <p>Poem by Sonali Korde </p>
              </li>
              <li>
                <h6>Integrity</h6>
                <p>Song by Rajendra Bhide</p>
              </li>
              <li>
                <h6>Responsible</h6>
                <p>Song by Rajendra Bhide</p>
              </li>
              <li>
                <h6>Selfless</h6>
                <p>Song by Satish Thampi</p>
              </li>
              <li>
                <h6>Award</h6>
                <p>Most Exploring Orbiter</p>
              </li>
              <li>
                <h6>Fairness</h6>
                <p>Poem by Rupali Kamat / Song by Kishore Hegde</p>
              </li>
              <li>
                <h6>Inclusive</h6>
                <p>Song by Sudhakar Patole</p>
              </li>
              <li>
                <h6>Openness</h6>
                <p>Dance by Minal Govalkar</p>
              </li>
              <li>
                <h6>Award </h6>
                <p>Most Responsible Cosmonaut</p>
              </li>
              <li>
                <h6>Authenticity </h6>
                <p>Game activity by Smita Kadu</p>
              </li>
              <li>
                <h6>Caring </h6>
                <p>Poem by Kanchan Utekar</p>
              </li>
              <li>
                <h6>Awareness </h6>
                <p>Magic Show by Deepak Pande</p>
              </li>
              <li>
                <h6>Award </h6>
                <p>Most Selfless Propeller</p>
              </li>
              <li>
                <h6>Explore </h6>
                <p>Game activity by Smita Kadu</p>
              </li>
              <li>
                <h6>Communication </h6>
                <p>Standup performance by Rashmi Agaskar</p>
              </li>
              <li>
                <h6>Bold </h6>
                <p>Supernova Walk</p>
              </li>
              <li>
                <h6>Award  </h6>
                <p>The ContriOrbitor</p>
              </li>
              <li>
                <h6>Nucleus Team  </h6>
                <p>Journey / Rewards & Recongnization</p>
              </li>
              <li>
                <h6>Something + Business</h6>
                <p>By Founders</p>
              </li>
              <li>
                <h6>Open Space</h6>
                <p>Open Space</p>
              </li>
              <li>
                <h6>Dinner</h6>
                <p>Dinner</p>
              </li>
            </ul>

          </div>
        </> : <div className='QrcodeContainer'>

          <QrReader
            delay={300}
            style={{ width: '100%' }}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
          />
          <h2>Scan here</h2>


        </div>
      }
      {
        present ? null
    :<div className='footerHome'>
    <h2>Please Scan here to Experience Space</h2>
  </div>}

      {
        present ?
          <div className='scanContainer'>
            <button className='scanButton2 scanbuttonfixed' onClick={scanFood}>Food</button></div> : null
      }


      {
        loginfailedpopup ? <div className='c-popupbg'>
          <div className='bg-popup'></div>
          <div className='c-loginpopup'>
            <div>
              <img src="/images/cancel_icon.png" />
              <h5>You are trying to login from wrong device </h5>
              {/* <h4>Welcome to celebration </h4> */}
            </div>
          </div></div> : null
      }

    </section>



  )
}
export async function getServerSideProps({ query }) {
  console.log("query", query.id);
  return {
    props: {

      eventsName: query
    }
  }
}