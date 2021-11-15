import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUser, deletedUser, editUser } from '../reducers/apiReducer';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router';

const Dashboard = () => {
  const dispatch = useDispatch();

  let history = useHistory();
  
  const list = useSelector((state) => state.user_list.data);
  
 
  useEffect(() => {
    dispatch(listUser());
  }, []);


  const deleted = (id) => {
    dispatch((deletedUser(id)))
  }

  
  const edited = (item) => {
    //    history.push(`/edit/${id}`)
       dispatch(editUser(item,history));
  }
 

  return (
    <>
      <div className="mt-4">
        <h1>Welcome TO Dashboard....</h1>
       
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Email</th>
            <th>Fisrt Name</th>
            <th>Lastname</th>
            <th>Avatar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {list.map((item) => {
          return (
            <>
            <tr key={item.id}>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td >
                    <img className="avatar" src={item.avatar} alt={item.avatar} />
                </td>
                <td>
                    <Button color="danger" onClick={() => deleted(item.id)} className="mr-2">Delete</Button>
                    <Button color="primary" onClick={() => edited(item)}>Edit</Button>
                </td>
            </tr>
            </>
          );
        })}
          
        </tbody>
      </table>
       
      </div>
    </>
  );
};

export default Dashboard;
