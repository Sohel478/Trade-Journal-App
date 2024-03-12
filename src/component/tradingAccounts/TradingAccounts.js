import React, { useEffect, useState } from "react";
import "./TradingAccount.scss";
import TradingForm from "./TradingAccountForm";
import { useStrategy } from "../../context/StrategyContext";
import { useDispatch, useSelector } from "react-redux";
import { tradingAccountList } from "../../store/slice/tradingAccountsSlice";
import TradeAccountList from "./TradeAccountList";
import './TradingAccountsResponsive.css'

const TradingAccounts = () => {
  const [formStatus, setFormStatus] = useState("list");
  const [editData, setEditData] = useState(null); 
  const [accountList, setAccountList] = useState([]);

  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.token);
  const reduxData = useSelector((state) => state?.tradingAccounts?.data);
  const isAddedOrEdited = useSelector(
    (state) => state?.strategy?.isAddedOrEdited
  );

  useEffect(() => {
    dispatch(tradingAccountList(token));
  }, [isAddedOrEdited === true]);
  useEffect(() => {
    if (reduxData?.length) {
      setAccountList((prev) => reduxData);
    }
  }, [reduxData]);
  return (
    <>
      {formStatus === 'add' && <TradingForm setFormStatus={setFormStatus} />}
      {formStatus === 'edit' && <TradingForm setFormStatus={setFormStatus} editData={editData} />}
      {formStatus === 'list' && (
        <TradeAccountList list={accountList} setFormStatus={setFormStatus} setEditData={setEditData} />
      )}
    </>
  );
};

export default TradingAccounts;
