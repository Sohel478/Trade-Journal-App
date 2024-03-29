import React, { forwardRef, useEffect, useState, useMemo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav, Dropdown } from "react-bootstrap";
import "./header.scss";
import PlusIcon from "../../assets/images/plus.svg";
import clockIcon from "../../assets/images/clock.svg";
import ReactDatePicker from "react-datepicker";
import calander from "../../assets/images/calander.svg";
import handMoney from "../../assets/images/Hand Money.svg";
import profileImg from "../../assets/images/profile-img.png";
import MoonIcon from "../../assets/images/moon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  calenderEnd,
  calenderStart,
  tradeLogUpdateFilter,
} from "../../store/slice/tradeLogSlice";
import { updateTradeAnalyticsData } from "../../store/slice/tradeAnalyticsSlice";
import { dashboardUpdateData } from "../../store/slice/homeSlice";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CloseIcon from "../../assets/images/closeIcon.svg";
import './ResponsiveHeader.scss'

const ResponsiveHeader = () => {
  const { starttDate, enddDate } = useParams();

  const dispatch = useDispatch();
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  // const reduxData = useSelector((state) => state); 

  const selectAuth = state => state.auth;
const selectTrades = state => state.trades;

// Memoize the selector functions to prevent unnecessary re-renders
const authSelector = useCallback(selectAuth, []);
const tradesSelector = useCallback(selectTrades, []);

// Use the useSelector hook to select specific parts of the Redux state
const authData = useSelector(authSelector);
const tradesData = useSelector(tradesSelector);

  const excludeLeftWrap = [
    {
      route: "/strategies",
      title: "Strategy",
    },
    {
      route: "/trading-accounts",
      title: "Trading Accounts",
    },
  ];
  const location = useLocation();
  // const token = reduxData?.auth?.token;

  const token = authData?.token;

  const [startDate, setStartDate] = useState(new Date());
  const [endddDate, setEndDate] = useState(null);
  const converter = (data) => {
    return data.join(",");
  };

  const currentMonthRange = (date) => {
    var firstDayThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDayThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return {
      starting: firstDayThisMonth,
      ending: lastDayThisMonth,
    };
  };
  const currentMonthRangeNew = (date) => {
    const original = new Date(date);
    const year = original.getFullYear();
    const month = original.getMonth() + 1;
    const day = original.getDate();
    const formatDate =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day);
    return formatDate;
  };

  // const asset = converter(reduxData.trades.filterData[0].selected);
  // const conv = converter(reduxData.trades.filterData[2].selected);
  // const holding = converter(reduxData.trades.filterData[1].selected);
  // const tradeAcc = converter(reduxData.trades.filterData[3].selected);
  // const strag = converter(reduxData.trades.filterData[4].selected);

  // Replace reduxData.trades with trades
const asset = converter(tradesData.filterData[0].selected);
const conv = converter(tradesData.filterData[2].selected);
const holding = converter(tradesData.filterData[1].selected);
const tradeAcc = converter(tradesData.filterData[3].selected);
const strag = converter(tradesData.filterData[4].selected);

  const navigate = useNavigate();

  const monthRange = currentMonthRange(new Date());
  const oldStart = monthRange.starting.toISOString().substring(0, 10);
  const oldEnd = monthRange.ending.toISOString().substring(0, 10);

  // const currentStart =
  //   reduxData.trades?.start && currentMonthRangeNew(reduxData.trades?.start);
  // const currentEnd =
  //   reduxData.trades?.end && currentMonthRangeNew(reduxData.trades?.end);

  const currentStart =
  tradesData?.start && currentMonthRangeNew(selectTrades?.start);
  const currentEnd =
  tradesData?.end && currentMonthRangeNew(selectTrades?.end);

  const updateDashboardData = () => {
    const startDate = currentStart || oldStart;
    const endDate = currentEnd || oldEnd;
    let dashboardPayloadUrl = `?startDate=${startDate}&endDate=${endDate}`;
    dispatch(
      dashboardUpdateData({ token: token, values: dashboardPayloadUrl })
    );
  };

  const updateTradeAnalyticsDataa = () => {
    const startDate = currentStart || oldStart;
    const endDate = currentEnd || oldEnd;
    let payloadUrl = `?startDate=${startDate}&endDate=${endDate}`;
    dispatch(updateTradeAnalyticsData({ token: token, values: payloadUrl }));
  };

  // const updateTradelogData = () => {
  //   const startDate = currentStart || oldStart;
  //   const endDate = currentEnd || oldEnd;
  //   let payloadUrl = `?startDate=${startDate}&endDate=${endDate}&asset=${asset}&holding=${holding}&strategy=${strag}&tradeAccount=${tradeAcc}&conviction=${conv}`;
  //   dispatch(tradeLogUpdateFilter({ token: token, values: payloadUrl }));
  // };

  useEffect(() => {
    var url = window.location.pathname;
    var filename = url.split("/")[1];
    if (filename == "tradelog" || (starttDate && enddDate)) {
      const startDate = currentStart || oldStart;
      const endDate = currentEnd || oldEnd;
      let payurl = `${startDate}/${endDate}`;
      endddDate && navigate(`/tradelog/${payurl}`);
    } else if (filename == "dashboard") {
      endddDate && updateDashboardData();
    } else if (filename == "trader-analytics") {
      endddDate && updateTradeAnalyticsDataa();
    }
  }, [endddDate]);

  const onChange = (dates) => {
    const [start, end] = dates;
    dispatch(calenderStart(start));
    dispatch(calenderEnd(end));

    setStartDate(start);
    setEndDate(end);
  };
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="DateInput" onClick={onClick} ref={ref}>
      {value}
      <span className="clock-icon">
        <img src={clockIcon} alt="clock" />
      </span>
    </button>
  ));
  return (

<div className="responsive-header">
      <div className="header-left-wrap">
        {excludeLeftWrap.map((el) => el.route).includes(location.pathname) ? (
          <p className="header-title">
            {excludeLeftWrap.find((el) => el.route === location.pathname).title}
          </p>
        ) : (
          <>
           <div style={{display:'flex', paddingTop:'20px'}}>
           <Link to={"/tradelog"}>
              <button className="new-trade-btn">
                New Trade
                <img src={PlusIcon} alt="plus" className="plus-icon" />
              </button>
            </Link>

            <ReactDatePicker
              selected={startDate}
              onChange={onChange}
              customInput={<ExampleCustomInput />}
              startDate={startDate}
              endDate={endddDate}
              selectsRange
            />
           </div>
            <div
            //   className="flex h-[49px] justify-center items-center text-2xl cursor-pointer cross-icon"
              onClick={() => onChange([null, null])}
              style={{display:"none"}}
            >
              x
            </div>
            {/* <img src={CloseIcon} style={{height:"20px", marginTop:"1rem"}} onClick={() => onChange([null, null])}/> */}
           <div style={{display:'flex', justifyContent:'space-between', width:'300px', paddingTop:'20px'}}>
           <Link to={"/calendar"} style={{ textDecoration: "none" }}>
              <Button variant="outline-primary" className="outline-button-cal" style={{width:'145px', display:'flex', justifyContent:'space-evenly'}}>
                Calendar
                <img src={calander} alt="plus" className="plus-icon" />
              </Button>
            </Link>
            <Button variant="outline-primary" className="outline-button-man"  style={{width:'146px', display:'flex', justifyContent:'space-evenly'}}
            onClick={()=>{
              navigate('/mantra');
            }}>
              Mantra
              <img src={handMoney} alt="plus" className="plus-icon" />
            </Button>
           </div>
          </>
        )}
      </div>
      <div className="profile-wrapper">
        <img src={MoonIcon} alt="" className="moonIcon-wrap" style={{display:'none'}}/>
        <div>
          <Dropdown style={{position:'absolute', top:'0', left:'0'}}>
            <Dropdown.Toggle id="dropdown-basic" className="profile-dropdown">
              <img src="" alt="" className="profileImg" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={logout}>
                Logout
              </Dropdown.Item>
              <Dropdown.Item >
                Pricing
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <h3 className="profile-name">Bessie Cooper</h3> */}
        </div>
      </div>
    </div>

  
  );
};

export default ResponsiveHeader;
