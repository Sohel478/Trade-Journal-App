import React from "react";
// import {useDispatch} from 'react-redux'
// import {tradingAccountDelete} from '../../store/slice/tradingAccountsSlice'

const TradeAccountList = ({ list, setFormStatus }) => {

  // const dispatch = useDispatch()
  // const handleDelete = async (id) => {
  //   try {
  //     const response = await dispatch(tradingAccountDelete(id));
  //     if (response.payload.status === 200) {
  //       console.log(response.payload.message);
  //     } else {
  //       console.error(response.payload.message);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  
  return (
<>
<div className='add-new-trading-btn' onClick={() => setFormStatus('add')}>+ Add New Trading Account</div>
<div className="list-head">
      {list.map((el) => (
        <div key={el?.account_Id}>
          <h3>{el?.account_name}</h3>
          <p>{el?.trading_account}</p>
          <p>{el?.account_email}</p>
          <p>{el?.account_mobile}</p>
          <p>{el?.purpose}</p>
          {/* <div>
              <button onClick={() => handleEdit(el)}>Edit</button>
              <button onClick={() => handleDelete(el.account_Id)}>Delete</button>
            </div> */}
        </div>
      ))}
    </div>


</>
  );
};

export default TradeAccountList;
