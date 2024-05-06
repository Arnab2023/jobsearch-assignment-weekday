/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Modal from "./Modal/Modal";
import InfiniteScroll from "react-infinite-scroll-component";

import { Card } from "@mui/material";
import "./searchpage.css";
import axios from "axios";
import Filter from "./Filter/Filter";

const SearchPage = () => {
  const [modal, setModal] = useState(false);
  const [job, setJob] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [filterData, setFilterData] = useState();
  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const checkLength = (str) => {
    if (str.length > 300) {
      return str.slice(0, 300);
    } else {
      return str;
    }
  };

  const fetchInitialData = async () => {
    const { data } = await axios.post(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        limit: 12,
        offset: 0,
      }
    );
    setTotalCount(data.totalCount);

    setJob(data.jdList);
  };

  const fetchNextData = async () => {
    console.log("trigeered");
    const { data } = await axios.post(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        limit: 12,
        offset: offset,
      }
    );

    setJob((prev) => [...prev, ...data.jdList]);
    setOffset((prev) => prev + 12);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className="container">
      <Filter job={job} setData={setFilterData} />
      {modal && <Modal setModal={setModal} />}

      <InfiniteScroll
        className="content"
        dataLength={job?.length || []}
        next={fetchNextData}
        hasMore={offset <= totalCount}
        loader={"...."}
      >
        {filterData?.map((item) => (
          <Card
            key={item?.jdUid}
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
                <img src={item?.logoUrl} alt="" className="job-image" />
              </div>
              <div className="job-title">
                <h2>{item?.companyName}</h2>
                <p>{capitalizeFirstLetter(item?.jobRole)}</p>
                <span>{capitalizeFirstLetter(item?.location)}</span>
              </div>
            </div>

            <p className="est-salary">
              Estimated Salary: ₹{item?.minJdSalary}
              {item.minJdSalary && ` -`} {item?.maxJdSalary} LPA ✅
            </p>
            <p className="comp">About Company:</p>
            <p className="abt-us">About Us</p>
            <div className="center">
              <p className="comp-text">
                {checkLength(item?.jobDetailsFromCompany)}
                <span className={`click `} onClick={handleModal}>
                  View {modal ? "less..." : "job"}
                </span>
              </p>
              <div className="exp">
                <p>Minimum experience</p>
                <span className="min-exp">{item?.minExp || 0} years</span>
              </div>

              <button className="app-btn">⚡ Easy Apply</button>
              <button className="ref-btn">Unlock referral asks</button>
            </div>
          </Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default SearchPage;
