/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import "./filter.css";
import useFilter from "../util/FilterFunction";
const Filter = ({ job, setData }) => {
  const [roleList, setRoleList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [remoteList, setRemoteList] = useState([]);
  const [expList, setExpList] = useState([]);
  const [salList, setSalList] = useState([]);
  const [company, setCompany] = useState();
  const { data, addFilter, removeFilter, resetFilters } = useFilter(job);
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
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const getUniqueData = (field) => {
    let labellist = job.map((item) => item[field]);
    return [...new Set(labellist)];
  };

  const detailObject = {
    experience: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    remote: ["Remote", "In-office"],
    salary: ["0L", "10L", "20L", "30L", "40L", "50L", "60L", "70L"],
    role: getUniqueData("jobRole"),
  };

  //-------------------------------------------------------- filterFunctions---------------------------------------------------//
  const filterByRole = (operand, item) => operand.includes(item.jobRole);

  const filterByExp = (operand, item) => {
    if (item.minExp !== null) {
      return item.minExp <= parseInt(operand[0]);
    } else {
      return item.maxExp <= parseInt(operand[0]);
    }
  };

  const filterBySal = (operand, item) => {
    if (item.minJdSalary !== null) {
      return (
        item.minJdSalary >= parseInt(operand[0].slice(0, operand[0].length - 1))
      );
    } else {
      return (
        item.maxJdSalary >= parseInt(operand[0].slice(0, operand[0].length - 1))
      );
    }
  };

  const filterByRem = (operand, item) => {
    if (operand[0].toLowerCase() === "remote") {
      return item.location === "remote";
    } else {
      return item.location !== "remote";
    }
  };

  const filterByCom = (operand, item) =>
    item.companyName.toLowerCase().includes(operand.toLowerCase());

  //--------------------------------------------------------insertFunctions------------------------------------------------//

  const insertFunctions = (listName, item) => {
    if (listName === "role") {
      if (roleList.includes(item)) {
        setRoleList((prevList) => prevList.filter((i) => i !== item));
      } else {
        setRoleList((prevList) => [...prevList, item]);
      }
    }
    if (listName === "experience") {
      setExpList([item]);
    }
    if (listName === "salary") {
      setSalList([item]);
    }
    if (listName === "remote") {
      if (remoteList.includes(item)) {
        setRemoteList([]);
      } else {
        setRemoteList([item]);
      }
    }
  };
  //-------------------------------------------------------applying Filters--------------------------------------------------//

  useEffect(() => {
    resetFilters();
    if (roleList.length > 0) {
      addFilter({ operand: roleList, opcode: filterByRole });
    }
    if (expList.length > 0) {
      addFilter({ operand: expList, opcode: filterByExp });
    }
    if (salList.length > 0) {
      addFilter({ operand: salList, opcode: filterBySal });
    }
    if (remoteList.length > 0) {
      addFilter({ operand: remoteList, opcode: filterByRem });
    }

    if (content.company.length > 0) {
      addFilter({ operand: company, opcode: filterByCom });
    }
  }, [roleList, expList, salList, remoteList, company]);

  useEffect(() => {
    setData(data);
  }, [data]);

  //-------------------------------------------------------------Functions---------------------------------------------------//
  const changeHandle = (e, option) => {
    setContent((prev) => ({ ...prev, [option]: e.target.value }));
    if (content[option].length !== 0) {
      setShow((prev) => ({ ...prev, [option]: true }));
    }
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
        {/* --------------------------------------------------- Role------------------------------------------------------------------ */}

        <div className="role-fil fill">
          {content.role.length > 0 && <p className="field-name">Roles</p>}
          <div className="search-cont">
            {roleList.length > 0 &&
              roleList.map((item, i) => (
                <div key={i} className="entry">
                  <p>{item}</p>
                  <div
                    className="close"
                    onClick={() => {
                      insertFunctions("role", item);
                    }}
                  >
                    <CloseIcon
                      sx={{
                        fontSize: 19,
                        color: "black",
                        ":hover": { color: "red" },
                      }}
                    />
                  </div>
                </div>
              ))}

            <input
              type="text"
              placeholder="Roles"
              value={content.role}
              onChange={(e) => changeHandle(e, "role")}
            />

            <div className="icon" onClick={() => handleShow("role")}>
              <KeyboardArrowDownIcon sx={{ color: "black" }} />
            </div>
          </div>
          {show.role && (
            <div className="drop-down">
              {dropChange("role").map((item, index) => (
                <p
                  key={index}
                  className="hover-div"
                  onClick={() => {
                    setContent((prev) => ({ ...prev, role: "" }));
                    handleShow("role");
                    insertFunctions("role", item);
                  }}
                >
                  {capitalizeFirstLetter(item)}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* --------------------------------------------------- Experience---------------------------------------------------------------------- */}

        <div className="expe fill">
          {content.experience.length > 0 && (
            <p className="field-name">Experience</p>
          )}
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
                    insertFunctions("experience", item);
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
          {content.remote.length > 0 && <p className="field-name">Remote</p>}
          <div className="search-cont">
            {remoteList.length > 0 &&
              remoteList.map((item, i) => (
                <div key={i} className="entry">
                  <p>{item}</p>
                  <div
                    className="close"
                    onClick={() => {
                      insertFunctions("remote", item);
                    }}
                  >
                    <CloseIcon
                      sx={{
                        fontSize: 19,
                        color: "black",
                        ":hover": { color: "red" },
                      }}
                    />
                  </div>
                </div>
              ))}
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
                    insertFunctions("remote", item);
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
          {content.salary.length > 0 && <p className="field-name">Salary</p>}
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
                    insertFunctions("salary", item);
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
          {content.company.length > 0 && (
            <p className="field-name">Company Name</p>
          )}
          <div className="search-cont">
            <input
              type="text"
              placeholder="Search Company Name"
              value={content.company}
              onChange={(e) => {
                changeHandle(e, "company");
                setCompany(e.target.value);
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
