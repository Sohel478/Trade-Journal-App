import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "../../assets/images/closeIcon.svg";
import "./daily.css";
import { useDispatch, useSelector } from "react-redux";
import { getTradeById, updateTrade } from "../../store/slice/tradeLogSlice";

const DailyQuestionnaire = ({ questionnaireId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const reduxData = useSelector((state) => state?.trades?.data);
  const [answers, setAnswers] = useState({
    "Did emotion influence my trade": "",
    "Did I follow my plan?": "",
    "Was I confident in my decisions?": "",
    "Did I experience regret or disappointment?": "",
    "Did I take unnecessary risks or revenge trade?": "",
    "Did I feel anxious or stressed?": "",
    "Was I attached or averse to specific stocks or options?": "",
    "Ideas for future improvements:": "",
  });
  const [successMessage, setSuccessMessage] = useState(false);
  const [close, setClose] = useState(true);
  const answerRefs = {
    "Did emotion influence my trade": useRef(null),
    "Did I follow my plan?": useRef(null),
    "Was I confident in my decisions?": useRef(null),
    "Did I experience regret or disappointment?": useRef(null),
    "Did I take unnecessary risks or revenge trade?": useRef(null),
    "Did I feel anxious or stressed?": useRef(null),
    "Was I attached or averse to specific stocks or options?": useRef(null),
    "Ideas for future improvements:": useRef(null),
  };

  const handleSubmit = () => {
    const updatedAnswers = Object.keys(answerRefs).reduce((acc, key) => {
      acc[key] = answerRefs[key].current.value;
      return acc;
    }, {});

    setAnswers(updatedAnswers);
    dispatch(updateTrade({ questionnaireId, answers: updatedAnswers, token }));
    setSuccessMessage(true);
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setClose(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Add an extra 1 second delay before reloading
      }, 2000);
  
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  

  useEffect(() => {
    if (reduxData.trades?.selectedTrade) {
      const trade = reduxData.trades?.selectedTrade;

      Object.keys(answerRefs).forEach((key) => {
        answerRefs[key].current.value = trade[key] || "";
      });
    }
  }, [reduxData.trades?.selectedTrade]);

  const handleClose = () => {
    setClose(false);
    setTimeout(() => {
    window.location.reload()
   }, 1000);
  };

  const handleDownload = () => {
    const filename = "daily_questionnaire.txt";
    const data = JSON.stringify(answers, null, 2);
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {close && (
        <div className="popUUpBg">
          <div className="filterPopUUp">
            <div className="filterPopUUpHeader">
              <p className="popUUpTitle">Daily Questionnaire</p>
              <div className="closeFilter" onClick={handleClose}>
                <img src={CloseIcon} alt="Close" className="closeIcon" />
              </div>
            </div>
            <div className="filterPopUUBody">
              <div className="questionContainer">
                {Object.entries(answers).map(([key, value]) => (
                  <div key={key}>
                    <p className="question">{key}</p>
                    <input 
                      type="text" 
                      ref={answerRefs[key]} 
                      className="inputField" 
                      value={value} 
                      onChange={(e) => setAnswers(prevState => ({
                        ...prevState,
                        [key]: e.target.value
                      }))} 
                    />
                  </div>
                ))}
              </div>
              <button onClick={handleSubmit} className="submitButton">
                Submit
              </button>
              {successMessage && <p>Success!</p>}
              <button onClick={handleDownload}>Download</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyQuestionnaire;




