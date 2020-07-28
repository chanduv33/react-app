import React, {useState, useEffect} from 'react'
import { Formik, FieldArray, Form, Field, ErrorMessage } from 'formik'
import './AddCustomer.css'
import { Row, Col, Card, Button } from 'react-bootstrap'
import axios from 'axios';

let fileNames = new Array();
let selectedAddressProofFile;
let selectedIdProofFile;
let selectedAddressProofName;
let selectedIdProofName;
let errr;
let errors = new Array();
const initialValues = {
    firstName: 'Name',
    lastName: '',
    dateOfBirth: '',
    emails: [{
        email: ''
    }],
    addresses: [{
        line1: '',
        line2: '',
        state: '',
        city: '',
        country: '',
        pincode: ''
    }],
    phoneNumbers: [{
        mobileNumber: ''
    }
    ]
}


function AddCustomer() {

    const [error, setError] = useState()

    const onSubmit = values => {
        console.log(values)
        fileNames = []
        errr = null
        errors = []
        const formData = new FormData();
        formData.append('customer', JSON.stringify(values));
        if (selectedAddressProofFile) {
            formData.append('files', selectedAddressProofFile);
            fileNames.push('addressProof');
        }
        if (selectedIdProofFile) {
            formData.append('files', selectedIdProofFile);
            fileNames.push('idProof');
        }
        formData.append('fileNames', fileNames);
        // console.log(selectedAddressProofFile, selectedIdProofFile);
        // console.log(JSON.stringify(values))
        axios.post('http://localhost:8080/createCustomer', formData)
            .then(response => {
                console.log(response.data)
            })
            .catch(
                (err) => {
                    if(err.response.data){
                        errr = err.response.data
                        if(errr.errors) {
                            errors = errr.errors
                        }
                        setError(errr)
                    }
                    console.log(error)
                }
            )
    }
    

    useEffect(() =>{
      
    }, [error])

    const countries = [
        { key: 'Select an option', value: '' },
        { key: 'India', value: 'India' },
        { key: 'Pakistan', value: 'Pakistan' },
        { key: 'Nepal', value: 'Nepal' },
        { key: 'Bangladesh', value: 'Bangladesh' }
    ]

    const selectedAddressProof = (event) => {
        if (event.target.files.length > 0) {
            console.log(event.target.files[0]);
            console.log(event.target.files[0].name);
            selectedAddressProofFile = event.target.files[0];
            selectedAddressProofName = event.target.files[0].name;
            console.log(selectedAddressProofFile, selectedAddressProofName);
        }
    }

    const selectedIdProof = (event) => {
        if (event.target.files.length > 0) {
            console.log(event.target.files[0]);
            console.log(event.target.files[0].name);
            selectedIdProofFile = event.target.files[0];
            selectedIdProofName = event.target.files[0].name;
            console.log(selectedIdProofFile, selectedIdProofName);
        }
    }
    return (
        <Row >
            <Col md={{ span: 8, offset: 2 }} className='mt-3'>
                {
                    error ? <div className="error">
                        {error.message}
                    </div> : null
                }
                {
                    errors.length > 0 ? errors.map(err => {
                        return <div className="error" key={err}>
                            {err}
                        </div>
                    }) : null
                }
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit} 
                    enableReinitialize
                >
                    <Card md={{ span: 4, offset: 4 }}>
                        <Card.Body  >
                            <h2 className="text-center">Add Customer</h2>
                            <Form >
                                <Row>
                                    <Col>
                                        <label htmlFor='firstName'>FirstName</label> <br />
                                        <Field
                                            type='text'
                                            id='firstName'
                                            name='firstName'
                                        // {...formik.getFieldProps('firstName')}
                                        />
                                        {/* {formik.touched.firstName && formik.errors.firstName ? (
                                    <div className='error'>{formik.errors.firstName}</div>
                                ) : null} */}
                                    </Col>
                                    <Col>
                                        <label htmlFor='lastName'>LastName</label> <br />
                                        <Field
                                            type='text'
                                            id='lastName'
                                            name='lastName'
                                        // {...formik.getFieldProps('lastName')}
                                        />
                                        {/* {formik.touched.lastName && formik.errors.lastName ? (
                                    <div className='error'>{formik.errors.lastName}</div>
                                ) : null} */}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <label htmlFor='dateOfBirth'>Date of Birth</label> <br />
                                        <Field
                                            type='date'
                                            id='dateOfBirth'
                                            name='dateOfBirth'
                                        // {...formik.getFieldProps('dateOfBirth')}
                                        />
                                        {/* {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                                    <div className='error'>{formik.errors.dateOfBirth}</div>
                                ) : null} */}
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        <FieldArray name="emails">
                                            {
                                                (feildArrayProps) => {
                                                    const { form, push, remove } = feildArrayProps
                                                    console.log(form)
                                                    const { values } = form
                                                    const { emails } = values
                                                    return emails.map((email, index) =>
                                                        <Col md={6} key={index}>
                                                            <label htmlFor='email'>Email {index + 1}</label> <br />
                                                            <Field
                                                                type='email'
                                                                name={`emails[${index}].email`}
                                                                // name="email"
                                                                value={emails[index].value}
                                                            />
                                                            {
                                                                index > 0 && (
                                                                    <Button style={{ display: "inline", margin: "2px", fontSize: "15px", backgroundColor: " #346eeb", color: "#ffffff", borderRadius: "2px", float: "right" }}
                                                                        onClick={() =>
                                                                            remove(index)
                                                                        }
                                                                    >-</Button>
                                                                )
                                                            }
                                                            <Button style={{ display: "inline", margin: "2px", fontSize: "15px", backgroundColor: " #346eeb", color: "#ffffff", borderRadius: "2px", float: "right" }}
                                                                onClick={() => push({
                                                                    email: ''
                                                                })
                                                                }
                                                            >+</Button>

                                                        </Col>
                                                    )
                                                }
                                            }
                                        </FieldArray>
                                    }
                                </Row>
                                <Row>
                                    {
                                        <FieldArray name="phoneNumbers">
                                            {
                                                (feildArrayProps) => {
                                                    const { form, push, remove } = feildArrayProps
                                                    console.log(form)
                                                    const { values } = form
                                                    const { phoneNumbers } = values
                                                    return phoneNumbers.map((mobileNumber, index) =>
                                                        <Col md={6} key={index}>
                                                            <label htmlFor='mobileNumber'>Phone Number {index + 1}</label> <br />
                                                            <Field
                                                                type='number'
                                                                name={`phoneNumbers[${index}].mobileNumber`}
                                                                value={mobileNumber.value}
                                                            />
                                                            {
                                                                index > 0 && (
                                                                    <Button style={{ display: "inline", margin: "2px", fontSize: "15px", backgroundColor: " #346eeb", color: "#ffffff", borderRadius: "2px", float: "right" }}
                                                                        onClick={() =>
                                                                            remove(index)
                                                                        }
                                                                    >-</Button>
                                                                )
                                                            }
                                                            <Button style={{ display: "inline", margin: "2px", fontSize: "15px", backgroundColor: " #346eeb", color: "#ffffff", borderRadius: "2px", float: "right" }}
                                                                onClick={() => push({
                                                                    mobileNumber: ''
                                                                })
                                                                }
                                                            >+</Button>

                                                        </Col>
                                                    )
                                                }
                                            }
                                        </FieldArray>
                                    }
                                </Row>



                                <FieldArray name="addresses">
                                    {
                                        (feildArrayProps) => {
                                            const { form, push, remove } = feildArrayProps
                                            console.log(form)
                                            const { values } = form
                                            const { addresses } = values
                                            return addresses.map((address, index) =>
                                                <Row key={index}>
                                                    <Col >
                                                        <Row>
                                                            <Col lg="10"><label htmlFor='address'>Address {index + 1}</label></Col>

                                                            {
                                                                index > 0 && (
                                                                    <Button style={{ display: "inline", margin: "2px", fontSize: "15px", backgroundColor: " #346eeb", color: "#ffffff", borderRadius: "2px", float: "right" }}
                                                                        onClick={() =>
                                                                            remove(index)
                                                                        }
                                                                    >-</Button>
                                                                )
                                                            }
                                                            <Button style={{ display: "inline", margin: "2px", fontSize: "15px", backgroundColor: " #346eeb", color: "#ffffff", borderRadius: "2px", float: "right" }}
                                                                onClick={() => push({
                                                                    mobileNumber: ''
                                                                })
                                                                }
                                                            >+</Button>
                                                            <Col lg={6}>
                                                                <label htmlFor={`addresses[${index}].line1`}>Line1</label> <br />
                                                                <Field
                                                                    type='text'
                                                                    name={`addresses[${index}].line1`}
                                                                    value={address.line1}
                                                                />
                                                            </Col>
                                                            <Col lg={6}>
                                                                <label htmlFor={`addresses[${index}].line2`}>Line2</label> <br />
                                                                <Field
                                                                    type='text'
                                                                    name={`addresses[${index}].line2`}
                                                                    value={address.line2}
                                                                />
                                                            </Col>
                                                            <Col lg={6}>
                                                                <label htmlFor={`addresses[${index}].country`}>Country</label> <br />
                                                                {/* <Field as "select"
                                                                    name={`addresses[${index}].country`}
                                                                    value={address.country}
                                                                /> */}
                                                                <Field as='select' id={`addresses[${index}].country`} name={`addresses[${index}].country`}>
                                                                    {countries.map(option => {
                                                                        return (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.key}
                                                                            </option>
                                                                        )
                                                                    })}
                                                                </Field>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <label htmlFor={`addresses[${index}].state`}>State</label> <br />
                                                                <Field
                                                                    type='text'
                                                                    name={`addresses[${index}].state`}
                                                                    value={address.state}
                                                                />
                                                            </Col>
                                                            <Col lg={6}>
                                                                <label htmlFor={`addresses[${index}].city`}>City</label> <br />
                                                                <Field
                                                                    type='text'
                                                                    name={`addresses[${index}].city`}
                                                                    value={address.city}
                                                                />
                                                            </Col>
                                                            <Col lg={6}>
                                                                <label htmlFor={`addresses[${index}].pincode`}>Pincode</label> <br />
                                                                <Field
                                                                    type='number'
                                                                    name={`addresses[${index}].pincode`}
                                                                    value={address.pincode}
                                                                />
                                                            </Col>
                                                        </Row>

                                                    </Col>
                                                </Row>
                                            )
                                        }
                                    }
                                </FieldArray>
                                <Row>
                                    <Col>
                                        <label htmlFor='addressProof'>Address Proof</label> <br />
                                        <input
                                            type='file'
                                            id='addressProof'
                                            name='addressProof'
                                            onChange={e => selectedAddressProof(e)}
                                        />
                                    </Col>
                                    <Col>
                                        <label htmlFor='identityProof'>Identity Proof</label> <br />
                                        <input
                                            type='file'
                                            id='identityProof'
                                            name='identityProof'
                                            onChange={e => selectedIdProof(e)}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{ justifyContent: "center" }}>
                                    <Col>
                                        <button type='reset' className="resetButton">Reset</button>
                                    </Col>
                                    <Col>
                                        <button type='submit' className="submitButton">Submit</button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>

                </Formik>
            </Col>
        </Row>

    )
}

export default AddCustomer
