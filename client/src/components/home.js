import React from 'react';
import NavBar from './navbar';
import "./css/styles.css";

export default function Home() {
    return (
        <>
            <NavBar />
            <h1 style={{color:"black",fontFamily:"times new roman",textAlign:"center"}}>IT TAKES A VILLAGE TO RAISE A CHILD</h1>
            {/* <center>
            <img  id="bank-img" variant="top" src='https://img.freepik.com/premium-photo/village-countryside-sunset_865967-2901.jpg'
            alt="bank"style={{width:'40%'}}/>
            </center> */}
        </>
    );
}
