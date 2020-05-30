import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import './Aboutus.css';

function Aboutus() {
  return (
    <div className="Aboutus">
<div>
  
  <div className="pageWrapper" id="wrapper">
    <section className="company-heading intro-type" id="parallax-one">
      <div className="container">
        <div className="hell">
          <div className="col-md-12">
            <h1 className= "abtus">ABOUT US</h1>
          </div>
        </div>
      </div>
      <div
        className="parallax"
        id="parallax-cta"
        style={{
          backgroundImage: "url(https://wallpaperaccess.com/full/1267555.jpg)"
        }}
      />
      


    </section>
    <section
      className="story-section company-sections ct-u-paddingBoth100"
      id="section"
    >
      <div className="container">
        <h2>WHY AI DATABASES?</h2>
        <div className="red-border" />
     
        <div className="col12 ">
         
          <p className="ct-u-size22 ct-u-fontWeight300 marginTop40">
            
              Every second, every hour and every day there is huge relevant data being generated. 
              We track the finest movements in the market, analyse the hidden patterns.
          <br />
          <br />
              The main aim is therefore to make every datapoint related to Economic, Socio-Economic and Financial accessible at fingertips.
              We  use advanced tools such as artificial intelligence, machine learning and predictive analysts. 
              AI_Databases aims to create and maintain large economic and financial databases which are easily accessible in real-time with highest accuracy.
          <br />
          <br />
          As they say, “Data is the new Oil”, we were always fascinated towards how much data can change the world. 
          By looking at numbers and by analysing them so much can be said. Every decision that man makes has hidden data in it. 
          A shopkeeper needs to analyse his daily sales and data of his business environment to look forward his business. 
          Equally, an Astrophysicist needs to look at projectile data to propel the rocket into outer space. 
          We firmly believe those who look beyond need to keep track of their data and use that data to look into future. 
          This venture is therefore an attempt to understand the Economic and Financial data of India and predict the future versions and offer major course corrections. 
          <br />
          <br />
          There has been an absolute gap between the demand and supply of data relating to Economic and Finance. 
          The existing data is so expensive and scattered. 
          The main objective is to simplify the availability of secondary data. AI_Databases is short-form for this venture which primarily indexes, structures and maintains economic, socio-economic and financial databases. 
        </p>
          {/* <a class="ct-u-marginTop60 btn btn-solodev-red btn-fullWidth-sm ct-u-size19" href="#">Learn More</a> */}
        </div>
      </div>
    </section>
     
  </div>
  
  {/* <link
    href="https://fonts.googleapis.com/css?family=Raleway"
    rel="stylesheet"
  />
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
  />
  <link rel="stylesheet" href="about-us.css" />
  <link
    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
    rel="stylesheet"
  /> */}
</div>
<div>
  {/* <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.4.1/css/all.css"
    integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz"
    crossOrigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
    rel="stylesheet"
  /> */}
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n      html, body {\n      min-height: 100%;\n      padding: 0;\n      margin: 0;\n      font-family: Roboto, Arial, sans-serif;\n      font-size: 14px;\n      color: #000;\n      }\n      h1 {\n      margin: 0 0 20px;\n      font-weight: 400;\n      color: #000;\n      }\n      p {\n      margin: 0 0 5px;\n      }\n      .main-block {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      min-height: 100vh;\n      background: #000 ;\n      }\n      form {\n      padding: 25px;\n      margin: 25px;\n      box-shadow: 0 2px 5px #f5f5f5; \n      background: #f5f5f5; \n      }\n      .fas {\n      margin: 25px 10px 0;\n      font-size: 72px;\n      color: #fff;\n      }\n      .fa-envelope {\n      transform: rotate(-20deg);\n      }\n      .fa-at , .fa-mail-bulk{\n      transform: rotate(10deg);\n      }\n      input, textarea {\n      width: calc(100% - 18px);\n      padding: 8px;\n      margin-bottom: 20px;\n      border: 1px solid #000;\n      outline: none;\n      }\n      input::placeholder {\n      color: #666;\n      }\n      button {\n      width: 100%;\n      padding: 10px;\n      border: none;\n      background: #000; \n      font-size: 16px;\n      font-weight: 400;\n      color: #fff;\n      }\n      button:hover {\n      background: #0fefff;\n      }    \n      @media (min-width: 568px) {\n      .main-block {\n      flex-direction: row;\n      }\n      .left-part, form {\n      width: 50%;\n      }\n      .fa-envelope {\n      margin-top: 0;\n      margin-left: 20%;\n      }\n      .fa-at {\n      margin-top: -10%;\n      margin-left: 65%;\n      }\n      .fa-mail-bulk {\n      margin-top: 2%;\n      margin-left: 28%;\n      }\n      }\n    "
    }}
  />
  <div className="main-block">
    <div className="left-part">
      <i className="fas fa-envelope" />
      <i className="fas fa-at" />
      <i className="fas fa-mail-bulk" />
    </div>
    <form action="/">
      <h1>Contact Us</h1>
      <div className="info">
        <input
          className="fname"
          type="text"
          name="name"
          placeholder="Full name"
        />
        <input type="text" name="name" placeholder="Email" />
        <input type="text" name="name" placeholder="Phone number" />
        <input type="text" name="name" placeholder="Website" />
      </div>
      <p>Message</p>
      <div>
        <textarea rows={4} defaultValue={""} />
      </div>
      <button type="submit" href="/">
        Submit
      </button>
    </form>
  </div>
</div>;


    </div>
  );
}

export default Aboutus;