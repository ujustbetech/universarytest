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

export default function FoodScan() {

    // console.log("EventsName:", eventsName.scan);
    //   const queryname = eventsName.scan;
    //   console.log(queryname);
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
    const [foodscanner, setfoodScanner] = useState(true);
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
        // setfoodScanner(false);
        router2.back()
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


    useEffect(() => {


        const saved = localStorage.getItem("itmes");
        const localstoragedata = JSON.parse(saved)

        if (saved) {
            console.log("already Login", localstoragedata.firstname);
            console.log("number match");
            axios.get(`https://plankton-app-i2dnd.ondigitalocean.app/login/${localstoragedata.phonenumber}/`).then(response => {
                console.log(response);
                const alldata = response.data;
                setAllData(alldata)
                if (alldata.foodcounter === 1) {
                    setPesent(true);
                    setfoodScanner(true)
                }
                else{
                    console.log("false");
                }
                // if (alldata.foodcounter === 1) {
                //   setfoodcounter(true)
                // }

            });


        } else {
            router2.push("/")
        }
    }, [])







    return (
        <section className="wrapperScan">
            {/* <div className='logo'>
        <img src='/universary.svg' />
      </div> */}


            {
                foodscanner ? <div className='qrPopup'>
                    <div className='QrcodeContainer'>
                        {
                            alldata.foodcounter === 1 ? <h2>Experience Tonight's delicacies </h2> : <QrReader
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

            {/* {
        <div className='scanContainer'>
          <button className='scanButton2' onClick={scanFood}>Food</button></div>
      } */}




        </section>



    )
}
