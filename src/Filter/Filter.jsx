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

  const changeHandle = (e, option) => {
    setContent((prev) => ({ ...prev, [option]: e.target.value }));
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

            <div className="icon">
              <KeyboardArrowDownIcon sx={{ color: "black" }} />
            </div>
          </div>
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

            <div className="icon">
              <KeyboardArrowDownIcon sx={{ color: "black" }} />
            </div>
          </div>
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

            <div className="icon">
              <KeyboardArrowDownIcon sx={{ color: "black" }} />
            </div>
          </div>
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
