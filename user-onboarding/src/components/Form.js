import React, { useState, useEffect } from 'react'
import { Form, Field, withFormik } from 'formik';
import axios from 'axios';
import * as Yup from "yup";


const FormField = ({ errors, touched, values, status }) => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div className="user-form">
      <Form>
        <Field
          component="input"
          type="text"
          name="name"
          placeholder="Name"
        />
        {touched.name && errors.name && (
          <p>{errors.name}</p>
        )}
        <Field
          component="input"
          type="email"
          name="email"
          placeholder="Email"
        />
        {touched.email && errors.email && (
          <p>{errors.email}</p>
        )}
        <Field
          component="input"
          type="password"
          name="password"
          placeholder="Password"
        />
        <label>
          Terms of Service
          <Field
            type="checkbox"
            name="termsofservice"
            checked={values.termsofservice}
          />
        </label>
        <button>Submit!</button>
      </Form>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  )
}

const formikHOC = withFormik({
  mapPropsToValues({ name, email, password, termsofservice }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      termsofservice: termsofservice || false,
    }
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Not a good name'),
    email: Yup.string().required('Not a good email')
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log("handleSubmit: then: res: ", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.error("handleSubmit: catch: err: ", err));
  }
})

const FormFieldWithFormik = formikHOC(FormField)

export default FormFieldWithFormik