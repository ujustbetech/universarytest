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
    setfoodScanner(true);
    // const saved = localStorage.getItem("itmes");
    // const localstoragedata = JSON.parse(saved)
    // console.log("current login", localstoragedata.phonenumber);
    // router2.push("/" + localstoragedata.phonenumber)


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
          localStorage.setItem('qrdata', JSON.stringify(response.data));
          setAllData(alldata);
          setPesent(true)
        });



      }


    }
  }
  const handleScanWebCamfood = (result) => {
    // const saved = localStorage.getItem("items");
    const saved = localStorage.getItem("itmes");
    const localstoragedata = JSON.parse(saved)
    // console.log("current login", saved);

    if (result) {
      const text3 = JSON.stringify(result)
      console.log(result, "text food", result[15]);



      console.log("test data food");
      if (result[15] === "1") {
        console.log("food suscess");

        const data = {
          phonenumber: localstoragedata.phonenumber,
          firstname: localstoragedata.firstname,
          lastname: localstoragedata.lastname,
          foodcounter: "1"

        }
        axios.put('https://plankton-app-i2dnd.ondigitalocean.app/login/' + localstoragedata.phonenumber + '/', data).then(response => {
          console.log(response);
          const alldata = response.data;
          localStorage.setItem('qrdata', JSON.stringify(response.data));
          setAllData(alldata);
          setPesent(true)
        });



      }


    }
  }


  const handleErrorFile = (error) => {
    console.log(error);
  }

  const foodClick = async (e) => {
    e.preventDefault();

    axios.put('https://plankton-app-i2dnd.ondigitalocean.app/login/' + localstoragedata.phonenumber + '/', data).then(response => {
      console.log(response);
      const alldata = response.data;
      localStorage.setItem('qrdata', JSON.stringify(response.data));
      setAllData(alldata);
      setPesent(true)
    });





    console.log(showpopup);
  };


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
        present ? <div className='welcomemessage'>
          <h2>
            Something Plus Business
          </h2>
          <p>Welcome to Exploration Journey {alldata.firstname} {alldata.lastname}</p>
        </div> : <div className='QrcodeContainer'>

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
        foodscanner ? <div className='qrPopup'>
          <div className='QrcodeContainer'>
            {
              alldata.foodcounter === 1?<h2>Experience Tonight's delicacies </h2>:<QrReader
              delay={300}
              style={{ width: '100%' }}
              onError={handleErrorWebCam}
              onScan={handleScanWebCamfood}
            />
            }
            
            {/* <h2>Scan here</h2> */}

            <button className='scanButton' onClick={closeScaner}>Close Scanner</button>


          </div>
        </div> : null
      }

      {
        <div className='scanContainer'>
          <button className='scanButton2' onClick={scanFood}>Food</button></div>
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