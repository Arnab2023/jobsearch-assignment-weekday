/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import { Card } from "@mui/material";
import "./searchpage.css";

const SearchPage = () => {
  return (
    <div className="container">
      <Card
        sx={{
          width: 360,
          height: 546.713,
          marginBottom: 5,
          borderRadius: 5,
        }}
        className="card"
      >
        <div className="posted">
          <p>⏳ Posted few days ago</p>
        </div>
        <div className="job-header">
          <div className="image">
            <img src="" alt="" className="job-image" />
          </div>
          <div className="job-title">
            <h2>Company Name</h2>
            <p>abc</p>
            <span>dfegogrjgeg</span>
          </div>
        </div>

        <p className="est-salary">Estimated Salary: 34-50 LPA ⚠️</p>
        <p className="comp">About Company:</p>
        <p className="abt-us">About Us</p>
        <div className="center">
          <p className="comp-text">
            <span className={`click `}>View job</span>
          </p>
          <div className="exp">
            <p>Minimum experience</p>
            <span className="min-exp">5 years</span>
          </div>

          <button className="app-btn">⚡ Easy Apply</button>
          <button className="ref-btn">Unlock referral asks</button>
        </div>
      </Card>
    </div>
  );
};

export default SearchPage;
