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

    const [firstname, setfirstname] = useState('');
    const [birthdate, setbirthdate] = useState('');
    const [role, setrole] = useState('');
    const [mobilenumber, setmobilenumber] = useState('');
    const [showpopup, setshowpopup] = useState(false);
    const [showpopup2, setshowpopup2] = useState(false);
    const [responsedata, setresponsedata] = useState("");
    const [registration, setregistration] = useState(false);
    const [loginstate, setlogin] = useState(true);
    const [loginfailedpopup, setloginfailedpopup] = useState(false);
    const [loginDone, setloginDone] = useState(false);
    const [attendance, setattendance] = useState(false);
    const [foodcounter, setfoodcounter] = useState(false);

    const router2 = useRouter()




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

    const handleClick = async (e) => {
        e.preventDefault();
        const user = {
            firstname: firstname,
            lastname: lastname,
            role: role,
            number: mobilenumber,
        }
        console.log(user);
        const response = await axios
            .post('https://unniversary.ujustconnect.com/register.php', user)
            .catch((error) => console.log('Error: ', error));
        if (response && response.data) {
            console.log(response);
            console.log(response.data);
            if (response.status === 201) {
                setshowpopup(true);
                setresponsedata(response.data);
                setTimeout(() => {
                    // alert("test");
                    setshowpopup(false);
                    setfirstname("")
                    setlastname("")
                    setmobilenumber("")
                    setloginDone(true)
                    setlogin(false)
                    setregistration(false)
                    localstorage(response.data);


                }, 3000);

            }
            if (response.status === 200) {
                setshowpopup2(true);

            }
        }


        console.log(showpopup);
    };

    useEffect(() => {


        // const saved = localStorage.getItem("itmes");
        // const localstoragedata = JSON.parse(saved)

        // if (saved) {
        //     console.log("already Login", localstoragedata.firstname);
        //     console.log("number match");
        //     axios.get(`https://plankton-app-i2dnd.ondigitalocean.app/login/${localstoragedata.phonenumber}/`).then(response => {
        //         console.log(response);
        //         const alldata = response.data;
        //         setAllData(alldata)
        //         if (alldata.foodcounter === 1) {
        //             setPesent(true);
        //             setfoodScanner(true)
        //         }
        //         else{
        //             console.log("false");
        //         }
        //         // if (alldata.foodcounter === 1) {
        //         //   setfoodcounter(true)
        //         // }

        //     });


        // } else {
        //     router2.push("/")
        // }
    }, [])







    return (
        <section className="wrapperScan">
            {/* <div className='logo'>
        <img src='/universary.svg' />
      </div> */}

            <section className='c-loginpage'>
                <div className='c-login'>
                    <div>Back</div>
                    <form onSubmit={handleClick}>
                        <div className='regfrom'>
                            <div className='nominees'>
                                <h5>Relative 1</h5>
                                <input required minlength="10" type='tel' value={mobilenumber} placeholder='Mobile Number' onChange={(event) => {
                                    setmobilenumber(event.target.value)
                                }}></input>
                                <input required value={firstname} placeholder='Name' onChange={(event) => {
                                    setfirstname(event.target.value)
                                }}></input>
                                <input type='date' required value={birthdate} placeholder='Birth Date' onChange={(event) => {
                                    setbirthdate(event.target.value)
                                }}></input>
                            </div>
                            <div className='nominees'>
                                <h5>Relative 2</h5>
                                <input required minlength="10" type='tel' value={mobilenumber} placeholder='Mobile Number' onChange={(event) => {
                                    setmobilenumber(event.target.value)
                                }}></input>
                                <input required value={firstname} placeholder='First Name' onChange={(event) => {
                                    setfirstname(event.target.value)
                                }}></input>
                                <input type='date' required value={birthdate} placeholder='Birth Date' onChange={(event) => {
                                    setbirthdate(event.target.value)
                                }}></input>
                            </div>

                            <button type="submit" > Submit</button>
                        </div>
                    </form>
                </div>
            </section>



            {/* {
        <div className='scanContainer'>
          <button className='scanButton2' onClick={scanFood}>Food</button></div>
      } */}




        </section>



    )
}
