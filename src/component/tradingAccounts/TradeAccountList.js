import { useDispatch,useSelector } from "react-redux";
import axios from 'axios'

const TradeAccountList = ({ list, setFormStatus,setEditData }) => {
  const token = useSelector((state) => state.auth.token);


  const handleEdit = (item) => {
    setEditData(item);
    setFormStatus('edit');
  };

  const handleDelete = (id) => {
    try { 
      const response =  axios.delete(`https://trade-backend-2-2q52m.ondigitalocean.app/v1/api/trading-account/${id}`,{
        headers : {
          "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
      })
      // console.log("response data",response.data);
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
      return response.data;
    } catch (error) {
      console.log("Error Occured while delete", error);
    }
  };



  return (
    <>
     <div className='add-new-trading-btn' onClick={() => setFormStatus('add')}>+ Add New Trading Account</div>
      <div className="list-head">
        {list.map((el) => (
          <div key={el?.id}>
            <h3>{el?.account_name}</h3>
            <p>{el?.trading_account}</p>
            <p>{el?.account_email}</p>
            <p>{el?.account_mobile}</p>
            <p>{el?.purpose}</p>
            <button onClick={() => handleEdit(el)}>Edit</button>
            <button onClick={() => handleDelete(el.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default TradeAccountList;

