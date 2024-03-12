import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { tradingAccountAdd,tradingAccountEdit } from "../../store/slice/tradingAccountsSlice";
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";

const TradingAccountForm = ({ setFormStatus,editData }) => {
  const token = useSelector((state) => state?.auth?.token);
  const nav = useNavigate()
  const dispatch = useDispatch();
  
  // Set initial values based on editData
  const initialValues = editData ? {
    account_client_id: editData.account_client_id || "",
    account_mobile: editData.account_mobile || "",
    account_email: editData.account_email || "",
    account_name: editData.account_name || "",
    trading_account: editData.trading_account || "",
    purpose: editData.purpose || ""
  } : {
    account_client_id: "",
    account_mobile: "",
    account_email: "",
    account_name: "",
    trading_account: "",
    purpose: ""
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => {
      const errors = {};
      if (!values.purpose) {
        errors.purpose = "Purpose is required";
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
      const payload = {
        token: token,
        values,
      };
      if (editData) {
        // Dispatch the editing action
        dispatch(tradingAccountEdit({ id: editData.id, ...payload }));
      } else {
        // Dispatch the adding action
        dispatch(tradingAccountAdd(payload));
      }
      setFormStatus("list");
    },
  });

  useEffect(() => {
    if (editData) {
      formik.setValues({ ...editData });
    }
  }, [editData]);


  return (
    <div className="strategy-box">
      <form className="trade">
        <div className="form-tile">
          <label htmlFor="trading_account" className="Trading-Accounts-Heading">* Trading Accounts</label>
          <select
            id="trading_account"
            name="trading_account"
            type="select"
            value={formik.values.trading_account}
            onChange={formik.handleChange}
            placeholder="id format alphanumeric"
            required
          >
            <option className="trading_account_option">Select Your Trading Accounts</option>
            {/* <option>Account 1</option>
            <option>Account 2</option> */}
            <option className="trading_account_option">Zerodha</option>
            <option className="trading_account_option">Angel One</option>
            <option className="trading_account_option">Groww</option>
            <option className="trading_account_option">Upstox</option>
            <option className="trading_account_option">Icici Direct</option>
            <option className="trading_account_option">Hdfc Sec</option>
            <option className="trading_account_option">Kotak Sec</option>
            <option className="trading_account_option">Motilal oswal</option>
            <option className="trading_account_option">Paytm Money</option>
            <option className="trading_account_option">Sbi Sec</option>
            <option className="trading_account_option">Sharekhan</option>
            <option className="trading_account_option">5paisa</option>
            <option className="trading_account_option">Iifl Sec</option>
            <option className="trading_account_option">Axis Direct</option>
            <option className="trading_account_option">Dhan</option>
            <option className="trading_account_option">Geojit</option>
            <option className="trading_account_option">Fyers</option>
            <option className="trading_account_option">Choice Broking</option>
            <option className="trading_account_option">Smc Global</option>
            <option className="trading_account_option">Alice Blue</option>
            <option className="trading_account_option">Religare</option>
            <option className="trading_account_option">Others</option>
          </select>
          {/* </div>
        <div className="form-tile"> */}
          <label htmlFor="account_name">Name</label>
          <input
            id="account_name"
            name="account_name"
            value={formik.values.account_name}
            onChange={formik.handleChange}
            placeholder="id format alphanumeric"
            required
          />
          <label htmlFor="account_email">Email Address</label>
          <input
            id="account_email"
            name="account_email"
            type="email"
            value={formik.values.account_email}
            onChange={formik.handleChange}
            placeholder="example@gmail.com"
            required
          />
          <label htmlFor="account_mobile">Mobile Number</label>
          <input
            id="account_mobile"
            type="number"
            name="account_mobile"
            value={formik.values.account_mobile}
            onChange={formik.handleChange}
            placeholder="1234567890"
            required
          />
        </div>
        <div className="form-tile">
          <label htmlFor="account_client_id">Client ID</label>
          <input
            id="account_client_id"
            name="account_client_id"
            value={formik.values.account_client_id}
            onChange={formik.handleChange}
            placeholder="id format alphanumeric"
          />
          <label htmlFor="purpose">Purpose</label>
          <textarea
            id="purpose"
            name="purpose"
            type="textarea"
            value={formik.values.purpose}
            onChange={formik.handleChange}
            placeholder="Write here..."
            required
          />
          {formik.errors.purpose ? (
            <div className="error">{formik.errors.purpose}</div>
          ) : null}
          <div className="btn-box">
            <button className="cancel" onClick={() =>{
              formik.handleReset()
              setFormStatus("list")
              }}>
              Cancel
            </button>
            <button className="save" onClick={formik.handleSubmit}>
              {" "}
              Save{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TradingAccountForm;
