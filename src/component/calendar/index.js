// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "./calendar.css";
// import NextIcon from "./../../assets/images/NextIcon.svg";
// import PrevIcon from "./../../assets/images/PrevIcon.svg";
// import { tradeLogList } from "../../store/slice/tradeLogSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const CustomCalendar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const reduxData = useSelector((state) => state);

//   const [dateData, setDateData] = useState({});
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const tileClassName = ({ date }) => {
//     const currentDate = date.toLocaleDateString("en-CA");
//     const content = dateData[currentDate];

//     return content || "";
//   };

//   const organizeData = (data) => {
//     const organized = {};
//     if (data) {
//       data.forEach((entry) => {
//         const date = new Date(entry.trade_date).toLocaleDateString("en-CA");
//         organized[date] = entry.trade_pnl > 0 ? "profit" : "loss";
//       });
//     }
//     return organized;
//   };

//   useEffect(() => {
//     let payloadUrl = "";
//     dispatch(
//       tradeLogList({ token: reduxData?.auth?.token, payloadUrl: payloadUrl })
//     );
//   }, []);

//   useEffect(() => {
//     const organizedData = organizeData(reduxData?.trades?.data?.data);
//     console.log(organizedData);
//     setDateData(organizedData);
//   }, [reduxData]);

//   const formatDate = (date) => {
//     const currentDay = date.toLocaleDateString(undefined, {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//     const [month, day, year] = currentDay.split(" ");
//     const formattedDate = `${day} ${month} ${year}`;
//     return formattedDate;
//   };

//   const handlePrevMonth = () => {
//     setSelectedDate((prevDate) => {
//       const newDate = new Date(prevDate);
//       newDate.setMonth(newDate.getMonth() - 1);
//       return newDate;
//     });
//   };

//   const handleNextMonth = () => {
//     setSelectedDate((prevDate) => {
//       const newDate = new Date(prevDate);
//       newDate.setMonth(newDate.getMonth() + 1);
//       return newDate;
//     });
//   };

//   const onClickDate = (value) => {
//     setSelectedDate(value);
//     navigate(
//       `/tradelog/${value.toLocaleDateString(
//         "en-CA"
//       )}/${value.toLocaleDateString("en-CA")}`
//     );
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minWidth: "1300px",
//       }}
//     >
//       <div>
//         <div>
//           <div style={{ display: "flex" }}>
//             <p
//               style={{
//                 fontSize: "1.5rem",
//                 fontWeight: "500",
//                 color: "#1B1B1B",
//                 lineHeight: "39.06px",
//                 width: "220px",
//               }}
//             >
//               {formatDate(selectedDate)}
//             </p>
//             <div style={{ marginLeft: "1rem" }}>
//               <img
//                 style={{ marginLeft: "8px", cursor: "pointer" }}
//                 src={PrevIcon}
//                 alt="PrevIcon"
//                 onClick={handlePrevMonth}
//               />
//               <img
//                 style={{ marginLeft: "8px", cursor: "pointer" }}
//                 src={NextIcon}
//                 alt="NextIcon"
//                 onClick={handleNextMonth}
//               />
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginLeft: "auto",
//               }}
//             >
//               <div className="label-color profit-label-color" />
//               <div className="data-label">Profit</div>
//               <div className="label-color loss-label-color" />
//               <div className="data-label">Loss</div>
//               <div className="label-color noTrade-label-color" />
//               <div className="data-label">No Trade</div>
//             </div>
//           </div>
//         </div>
//         <Calendar
//           className="calendarr"
//           tileClassName={tileClassName}
//           onClickDay={(value) => onClickDate(value)}
//           value={selectedDate}
//           showNavigation={false}
//         />
//       </div>
//     </div>
//   );
// };

// export default CustomCalendar;

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NextIcon from "./../../assets/images/NextIcon.svg";
import PrevIcon from "./../../assets/images/PrevIcon.svg";
import { tradeLogList } from "../../store/slice/tradeLogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./calendar1.css";

const MobileCalendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state);

  const [dateData, setDateData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tileClassName = ({ date }) => {
    const currentDate = date.toLocaleDateString("en-CA");
    const content = dateData[currentDate];

    return content || "";
  };

  const organizeData = (data) => {
    const organized = {};
    if (data) {
      data.forEach((entry) => {
        const date = new Date(entry.trade_date).toLocaleDateString("en-CA");
        organized[date] = entry.trade_pnl > 0 ? "profit" : "loss";
      });
    }
    return organized;
  };

  useEffect(() => {
    let payloadUrl = "";
    dispatch(
      tradeLogList({ token: reduxData?.auth?.token, payloadUrl: payloadUrl })
    );
  }, []);

  useEffect(() => {
    const organizedData = organizeData(reduxData?.trades?.data?.data);
    setDateData(organizedData);
  }, [reduxData]);

  const formatDate = (date) => {
    const currentDay = date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const [month, day, year] = currentDay.split(" ");
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };

  const handlePrevMonth = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const onClickDate = (value) => {
    setSelectedDate(value);
    navigate(
      `/tradelog/${value.toLocaleDateString(
        "en-CA"
      )}/${value.toLocaleDateString("en-CA")}`
    );
  };

  return (
    <div className="mobile-calendar">
      <div className="custom-calendar-container">
        <div className="custom-calendar-header">
          <p>{formatDate(selectedDate)}</p>
          <div className="custom-calendar-navigation">
            <img src={PrevIcon} alt="PrevIcon" onClick={handlePrevMonth} />
            <img src={NextIcon} alt="NextIcon" onClick={handleNextMonth} />
          </div>
        </div>
        <div className="custom-calendar-labels">
          <div className="custom-calendar-label">
            <div className="custom-calendar-label-color profit-label-color" />
            <div className="custom-calendar-label-text">Profit</div>
          </div>
          <div className="custom-calendar-label">
            <div className="custom-calendar-label-color loss-label-color" />
            <div className="custom-calendar-label-text">Loss</div>
          </div>
          <div className="custom-calendar-label">
            <div className="custom-calendar-label-color noTrade-label-color" />
            <div className="custom-calendar-label-text">No Trade</div>
          </div>
        </div>
        <Calendar
          className="custom-calendar"
          tileClassName={({ date }) => {
            const currentDate = date.toLocaleDateString("en-CA");
            const tradeData = dateData[currentDate];
            switch (tradeData) {
              case "profit":
                return "profit-date";
              case "loss":
                return "loss-date";
              default:
                return "";
            }
          }}
          onClickDay={(value) => onClickDate(value)}
          value={selectedDate}
          showNavigation={false}
        />
      </div>
    </div>
  );
};

export default MobileCalendar;
