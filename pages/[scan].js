import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import QRCode from 'qrcode'
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/router'
// import QrReader from 'react-qr-reader';
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from 'react';
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

export default function Scan({ eventsName }) {

  console.log("EventsName:", eventsName.scan);

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
  const [foodcounter, setfoodcounter] = useState();
  const [alldata, setAllData] = useState({});

  const router = useRouter()

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
    console.log("current login", saved);

    if (result) {
      const text3 = JSON.stringify(result)
     console.log(result[17], "text2", result[14]);

    const  testdata = {
        partnername: "Shruti madhav",
        phonenumber: "1234",
        profile: "shruti.com",
        attend: "1"
  
      }

      

      console.log("test data");
      if ( result[14] === "1") {
        console.log("suscess");

        const data = {
          phonenumber: localstoragedata.phonenumber,
          firstname: localstoragedata.firstname,
          lastname: localstoragedata.lastname,
          attendance: "1"

        }
        axios.put('https://plankton-app-i2dnd.ondigitalocean.app/login/'+ localstoragedata.phonenumber, data).then(response => {
          console.log(response);
          const alldata = response.data;
          // localStorage.setItem('qrdata', JSON.stringify(response.data));
          // setAllData(alldata);
        });

        
        if (alldata.attendance === "0") {
          const data = {
            phonenumber: alldata.phonenumber,
            firstname: alldata.firstname,
            lastname: alldata.lastname,
            attendance: "1"

          }
          axios.put('https://plankton-app-i2dnd.ondigitalocean.app/login/'+alldata.phonenumber, data).then(response => {
            console.log(response);
            const alldata = response.data;
            localStorage.setItem('qrdata', JSON.stringify(response.data));
            setAllData(alldata);
          });
        }
        else{

        }
      }
      
      // console.log(result);
      // if (saved) {

      //   if (result2.Type === "attendance") {
      //     if (alldata.attendance === "0") {
      //       const data = {
      //         phonenumber: alldata.phonenumber,
      //         firstname: alldata.firstname,
      //         lastname: alldata.lastname,
      //         attendance: "1"
  
      //       }
      //       axios.put('https://plankton-app-i2dnd.ondigitalocean.app/login/'+alldata.phonenumber, data).then(response => {
      //         console.log(response);
      //         const alldata = response.data;
      //         localStorage.setItem('qrdata', JSON.stringify(response.data));
      //         setAllData(alldata);
      //       });
      //     }
      //     else{

      //     }
      //   }
        
      //   if (result2.Type === "foodcounter") {
      //     if (alldata.foodcounter === "0") {
      //       const data = {
      //         phonenumber: alldata.phonenumber,
      //         firstname: alldata.firstname,
      //         lastname: alldata.lastname,
      //         foodcounter: "1"
      //       }
      //       axios.put('https://plankton-app-i2dnd.ondigitalocean.app/login/'+alldata.phonenumber, data).then(response => {
      //         console.log(response);
      //         const alldata = response.data;
      //         localStorage.setItem('qrdata', JSON.stringify(response.data));
      //         setAllData(alldata);
      //       });
      //     }
      //     else{

      //     }
      //   }

      //   // if (result2.Type === "Bootcamp1") {
      //   //   if (alldata.Bootcamp1 === "0") {
      //   //     const data = {
      //   //       partnername: alldata.partnername,
      //   //       phonenumber: alldata.phonenumber,
      //   //       profile: alldata.profile,
      //   //       Bootcamp1: "1"
  
      //   //     }
      //   //     axios.put('http://15.206.163.60/api/'+alldata.phonenumber, data).then(response => {
      //   //       console.log(response);
      //   //       const alldata = response.data;
      //   //       localStorage.setItem('qrdata', JSON.stringify(response.data));
      //   //       setAllData(alldata);
      //   //     });
      //   //   }
      //   //   else{

      //   //   }
      //   // } 

      //   // if (result2.Type === "Bootcamp4") {
      //   //   if (alldata.Bootcamp4 === "0") {
      //   //     const data = {
      //   //       partnername: alldata.partnername,
      //   //       phonenumber: alldata.phonenumber,
      //   //       profile: alldata.profile,
      //   //       Bootcamp4: "1"
  
      //   //     }
      //   //     axios.put('http://15.206.163.60/api/'+alldata.phonenumber, data).then(response => {
      //   //       console.log(response);
      //   //       const alldata = response.data;
      //   //       localStorage.setItem('qrdata', JSON.stringify(response.data));
      //   //       setAllData(alldata);
      //   //     });
      //   //   }
      //   //   else{

      //   //   }
      //   // } 
      //   // if (result2.Type === "tea") {
      //   //   if (alldata.tea === "0") {
      //   //     const data = {
      //   //       partnername: alldata.partnername,
      //   //       phonenumber: alldata.phonenumber,
      //   //       profile: alldata.profile,
      //   //       tea: "1"
  
      //   //     }
      //   //     axios.put('http://15.206.163.60/api/'+alldata.phonenumber, data).then(response => {
      //   //       console.log(response);
      //   //       const alldata = response.data;
      //   //       localStorage.setItem('qrdata', JSON.stringify(response.data));
      //   //       setAllData(alldata);
      //   //     });
      //   //   }
      //   //   else{

      //   //   }
      //   // } 
      //   // if (result2.Type === "dinner") {
      //   //   if (alldata.tea === "0") {
      //   //     const data = {
      //   //       partnername: alldata.partnername,
      //   //       phonenumber: alldata.phonenumber,
      //   //       profile: alldata.profile,
      //   //       dinner: "1"
  
      //   //     }
      //   //     axios.put('http://15.206.163.60/api/'+alldata.phonenumber, data).then(response => {
      //   //       console.log(response);
      //   //       const alldata = response.data;
      //   //       localStorage.setItem('qrdata', JSON.stringify(response.data));
      //   //       setAllData(alldata);
      //   //     });
      //   //   }
      //   //   else{

      //   //   }
      //   // } 
        
        
      //   console.log("All ready Login");
      //   console.log("all userData", alldata);
      // } else {
      //   // if (result2.Type === "attendance") {
      //     if (alldata.attendance === "0") {
      //       const data = {
      //         phonenumber: alldata.phonenumber,
      //         firstname: alldata.firstname,
      //         lastname: alldata.lastname,
      //         attendance: "1"
  
      //       }
      //       axios.put('https://plankton-app-i2dnd.ondigitalocean.app/login/'+alldata.phonenumber, data).then(response => {
      //         console.log(response);
      //         const alldata = response.data;
      //         localStorage.setItem('qrdata', JSON.stringify(response.data));
      //         setAllData(alldata);
      //       });
      //     }
      //     else{

      //     }
        
      //   console.log("Not Login yet");
      //   console.log("all userData", alldata.attend);
      //   //localStorage.setItem('qrdata', result3);
      //   // axios.get(`http://15.206.163.60/api/7208553985`)
      //   //   .then(res => {
      //   //     console.log(res);
      //   //     const persons = res.data;
      //   //     setAllData({ persons });
      //   //   })

      //   // console.log(result2.attend);
      //   // if (result2.Type === "attend") {
      //   //   if (alldata.attend === "0") {
      //   //     console.log("false");
      //   //     const data = {
      //   //       partnername: alldata.partnername,
      //   //       phonenumber: alldata.phonenumber,
      //   //       profile: alldata.profile,
      //   //       attend: "1"
  
      //   //     }
      //   //     axios.put('http://15.206.163.60/api/'+alldata.phonenumber, data).then(response => {
      //   //       console.log(response);
      //   //       const alldata = response.data;
      //   //       localStorage.setItem('qrdata', JSON.stringify(response.data));
      //   //       setAllData(alldata);
      //   //     });
      //   //   }
      //   //   else {
      //   //     console.log("Attendance true");
           
      //   //   }
      //   // }
      // }
      // // setScanResultWebCam(result);
    }
  }


  const handleErrorFile = (error) => {
    console.log(error);
  }

  // const onScanFile = () => {
  //   qrRef.current.openImageDialog();
  // }
  // const handleErrorWebCam = (error) => {
  //   console.log(error);
  // }

  useEffect(() => {
    localStorage.setItem('qrphone', eventsName.scan);
    const data = {
      partnername: "Shruti madhav",
      phonenumber: "1234",
      profile: "shruti.com",
      attend: "1"

    }
    // axios.put('http://15.206.163.60/api/'+eventsName.scan, data).then(response => {
    //   console.log(response);
    // });


    // return () => {
    //   second
    // }
  }, [])



  return (
    <section className="wrapperScan">



      <div className='logo'>
        <img src='/universary.svg' />
      </div>
      <div className='QrcodeContainer'>
    
          <QrReader
            delay={300}
            style={{ width: '100%' }}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
          />
          <h2>Scan here</h2>
    

     

      </div>
      <div className='social-icon'>
        <ul>
          <li>
            <Link href="/blog/hello-world">
              <a>
                <img src='/icon-fb.png' />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/blog/hello-world">
              <a><img src='/icon-ints.png' /></a>
            </Link>
          </li>
        </ul>
      </div>
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