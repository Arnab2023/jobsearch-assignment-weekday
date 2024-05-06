/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import "./filter.css";

const Filter = ({ job, setData }) => {
  const [content, setContent] = useState({
    role: "",
    experience: "",
    remote: "",
    salary: "",
    company: "",
  });

  const [show, setShow] = useState({
    experience: false,
    role: false,

    remote: false,
    salary: false,
  });

  const detailObject = {
    experience: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    remote: ["Remote", "In-office"],
    salary: ["0L", "10L", "20L", "30L", "40L", "50L", "60L", "70L"],
  };

  const changeHandle = (e, option) => {
    setContent((prev) => ({ ...prev, [option]: e.target.value }));
  };

  const handleShow = (option) => {
    setShow((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const dropChange = (option) => {
    if (content[option].length !== 0) {
      let x = content[option];
      const list = detailObject[option].filter((str) => str.includes(x));
      if (list.length === 0) {
        return ["No Option"];
      } else {
        return list;
      }
    } else {
      return detailObject[option];
    }
  };

  return (
    <div className="contain">
      <h2>Search Jobs</h2>
      <div className="fil-cont">
        {/* --------------------------------------------------- role------------------------------------------------------------------ */}

        <div className="role-fil fill">
          <p className="field-name">Roles</p>
          <div className="search-cont">
            <input
              type="text"
              placeholder="Roles"
              value={content.role}
              onChange={(e) => changeHandle(e, "role")}
            />

            <div className="icon">
              <KeyboardArrowDownIcon sx={{ color: "black" }} />
            </div>
          </div>
        </div>

        {/* --------------------------------------------------- Experience---------------------------------------------------------------------- */}

        <div className="expe fill">
          <p className="field-name">Experience</p>

          <div className="search-cont">
            <input
              type="text"
              placeholder="Experience"
              value={content.experience}
              onChange={(e) => changeHandle(e, "experience")}
            />

            <div
              className="icon"
              onClick={() => {
                handleShow("experience");
              }}
            >
              <KeyboardArrowDownIcon sx={{ color: "black" }} />
            </div>
          </div>
          {show.experience && (
            <div className="drop-down">
              {dropChange("experience").map((item, index) => (
                <p
                  className="hover-div"
                  key={index}
                  onClick={() => {
                    setContent((prev) => ({ ...prev, experience: item }));
                    handleShow("experience");
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* --------------------------------------------------- Type---------------------------------------------------------------------------- */}

        <div className="type fill">
          <p className="field-name">Remote</p>
          <div className="search-cont">
            <input
              type="text"
              placeholder="Remote"
              value={content.remote}
              onChange={(e) => changeHandle(e, "remote")}
            />

            <div
              className="icon"
              onClick={() => {
                handleShow("remote");
              }}
            >
              <KeyboardArrowDownIcon sx={{ color: "black" }} />
            </div>
          </div>
          {show.remote && (
            <div className="drop-down">
              {dropChange("remote").map((item, index) => (
                <p
                  className="hover-div"
                  key={index}
                  onClick={() => {
                    setContent((prev) => ({ ...prev, remote: "" }));
                    handleShow("remote");
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* --------------------------------------------------- Salary ------------------------------------------------------------------------- */}
        <div className="sal fill">
          <p className="field-name">Salary</p>
          <div className="search-cont">
            <input
              type="text"
              placeholder="Minimum Base Pay Salary"
              value={content.salary}
              onChange={(e) => changeHandle(e, "salary")}
            />

            <div
              className="icon"
              onClick={() => {
                handleShow("salary");
              }}
            >
              <KeyboardArrowDownIcon sx={{ color: "black" }} />
            </div>
          </div>
          {show.salary && (
            <div className="drop-down">
              {dropChange("salary").map((item, index) => (
                <p
                  className="hover-div"
                  key={index}
                  onClick={() => {
                    setContent((prev) => ({ ...prev, salary: item }));
                    handleShow("salary");
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
        {/* --------------------------------------------------- Comp-Name ---------------------------------------------------------------------- */}
        <div className="comp-name fill">
          <p className="field-name">Company Name</p>

          <div className="search-cont">
            <input
              type="text"
              placeholder="Search Company Name"
              value={content.company}
              onChange={(e) => {
                changeHandle(e, "company");
              }}
            />
          </div>
        </div>

        {/* ----------end------------ */}
      </div>
    </div>
  );
};

export default Filter;
