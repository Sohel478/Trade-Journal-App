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
          <label htmlFor="trading_account">* Trading Accounts</label>
          <select
            id="trading_account"
            name="trading_account"
            type="select"
            value={formik.values.trading_account}
            onChange={formik.handleChange}
            placeholder="id format alphanumeric"
            required
          >
            <option>Select Your Trading Accounts</option>
            {/* <option>Account 1</option>
            <option>Account 2</option> */}
            <option>Zerodha</option>
            <option>Angel One</option>
            <option>Groww</option>
            <option>Upstox</option>
            <option>Icici Direct</option>
            <option>Hdfc Sec</option>
            <option>Kotak Sec</option>
            <option>Motilal oswal</option>
            <option>Paytm Money</option>
            <option>Sbi Sec</option>
            <option>Sharekhan</option>
            <option>5paisa</option>
            <option>Iifl Sec</option>
            <option>Axis Direct</option>
            <option>Dhan</option>
            <option>Geojit</option>
            <option>Fyers</option>
            <option>Choice Broking</option>
            <option>Smc Global</option>
            <option>Alice Blue</option>
            <option>Religare</option>
            <option>Others</option>
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
