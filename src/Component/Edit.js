import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/apiReducer';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

function Edit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => [state.edit_user.data]);
  const updateStats = useSelector(state => state.users);
  const [Id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  console.log(updateStats, 'Data Updatiion.....');

  useEffect(() => {
    // dispatch(editUser(id));
    
    if(id){
       data.map((item) => {
           setId(item.id)
           setEmail(item.email)
           setFirstName(item.first_name)
           setLastName(item.last_name)
       })
    }
    else{
        setId("")
        setEmail("")
        setFirstName("")
        setLastName("")
    }
 
  }, [id]);

  const update = (e) => {
      e.preventDefault();
      dispatch(updateUser(id))
  }

  return (
    <>
      <h1>Edit Form {id}</h1>
      <Form onSubmit={update}>
        <FormGroup>
          <Label for="exampleEmail">ID</Label>
          <Input type="text" name="id" value={Id} onChange={(e) => setId(e.target.value)}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">First Name</Label>
          <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Last Name</Label>
          <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </FormGroup>

        <Button>Submit</Button>
      </Form>
   
    </>
  );
}

export default Edit;
