import React, { useEffect, useState } from 'react';
import StudentNavbar from './navbarvoluntier';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../css/styles.css'
import VoluntierNavbar from './navbarvoluntier';
export default function VoluntierDashboard() {
  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor:"white"
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
    width: '80%',
    textAlign: 'left',
  };

  const headingStyle = {
    marginBottom: '10px',
    color: 'black',
    textTransform: 'uppercase',
  };

  const paragraphStyle = {
    marginBottom: '20px',
    color: 'black',
    fontSize: '16px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  };

  const tableHeaderCellStyle = {
    border: '1px solid black',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  };

  const tableBodyCellStyle = {
    border: '1px solid black',
    padding: '8px',
  };

  const mapStyle = {
    width: '100%',
    height: '300px',
    border: 'none',
    marginTop: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };


  return (
    <>
    <VoluntierNavbar />

    <div style={contentStyle}>

      <div style={cardStyle}>
        <h2 style={headingStyle}>About</h2>
        <p style={paragraphStyle}>
          According to Census 2011 information, the location code or village code of Viralipatti village is 635475. Viralipatti village is located in Nilakkottai taluka of Dindigul district in Tamil Nadu, India. It is situated 23km away from sub-district headquarter Nilakkottai (tehsildar office) and 43km away from district headquarter Dindigul. As per 2009 stats, P Viralipatti is the gram panchayat of Viralipatti village.
        </p>
        {/* Add more village details here */}
      </div>

      <div style={cardStyle}>
        <h2 style={headingStyle}>Population of Viralipatti</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderCellStyle}>Particulars</th>
              <th style={tableHeaderCellStyle}>Total</th>
              <th style={tableHeaderCellStyle}>Male</th>
              <th style={tableHeaderCellStyle}>Female</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tableBodyCellStyle}>Total Population</td>
              <td style={tableBodyCellStyle}>11,370</td>
              <td style={tableBodyCellStyle}>5,868</td>
              <td style={tableBodyCellStyle}>5,502</td>
            </tr>
            <tr>
              <td style={tableBodyCellStyle}>Literate Population</td>
              <td style={tableBodyCellStyle}>6,833</td>
              <td style={tableBodyCellStyle}>4,027</td>
              <td style={tableBodyCellStyle}>2,806</td>
            </tr>
            <tr>
              <td style={tableBodyCellStyle}>Illiterate Population</td>
              <td style={tableBodyCellStyle}>4,537</td>
              <td style={tableBodyCellStyle}>1,841</td>
              <td style={tableBodyCellStyle}>2,696</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={cardStyle}>
        <h2 style={headingStyle}>Connectivity of village:</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderCellStyle}>Type</th>
              <th style={tableHeaderCellStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tableBodyCellStyle}>Public Bus Service</td>
              <td style={tableBodyCellStyle}>Available within village</td>
            </tr>
            <tr>
              <td style={tableBodyCellStyle}>Private Bus Service</td>
              <td style={tableBodyCellStyle}>Available within village</td>
            </tr>
            <tr>
              <td style={tableBodyCellStyle}>Railway Station</td>
              <td style={tableBodyCellStyle}>Available within 10+ km distance</td>
            </tr>
          </tbody>
        </table>
      </div>
       {/* Add new card with extra details */}
       <div style={cardStyle}>
          <h2 style={headingStyle}>Schools in Viralipatti</h2>
          <p style={paragraphStyle}>
            Viralipatti has two primary schools and one high school providing education to the children of the village and nearby areas.
          </p>
          <p style={paragraphStyle}>
            - Primary School 1: ABC Primary School
          </p>
          <p style={paragraphStyle}>
            - Primary School 2: XYZ Primary School
          </p>
          <p style={paragraphStyle}>
            - High School: Viralipatti Higher Secondary School
          </p>
        </div>


      <div style={cardStyle}>
        <h2 style={headingStyle}>Map</h2>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15702.051996877712!2d78.02018002810641!3d10.300766999140768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00aeb9836e5a0b%3A0x70acde1785f4d125!2sViralipatti%2C%20Tamil%20Nadu%20624304!5e0!3m2!1sen!2sin!4v1706619066966!5m2!1sen!2sin" style={mapStyle} title="Map"></iframe>
      </div>

    </div>
  </>
  );
}
