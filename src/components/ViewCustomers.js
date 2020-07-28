import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Table, Button, Row, Col, Card, Modal } from 'react-bootstrap';
import '../assets/customers.json'
import { Formik, FieldArray, Form, Field, ErrorMessage } from 'formik'
import './UpdateCustomer.css'
import Pagination from './Pagination';

let fileNames = new Array();
let selectedAddressProofFile;
let selectedIdProofFile;
let selectedAddressProofName;
let selectedIdProofName;
let errr;
let errors = new Array();
let customerToBeUpdated;

function ViewCustomers() {
    const [customers, setCustomers] = useState([])
    const [isCustomerSearched, setIsCustomerSearched] = useState(false)
    const [searchedCustomer, setSearchedCustomer] = useState()
    const [show, setShow] = useState(false);
    const [error, setError] = useState()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [postsPerPage] = useState(7)
    const [currentPage, setCurrentPage] = useState(1)

    const handleClose = () => {
        setShow(false);} 
    const handleShow = () => {
        setIsSubmitted(false)
        setShow(true)
    };
    // function handleClose () {
    //     setShow(false);
    // } 
    // function handleShow () {
    //     setShow(false);
    // } 
    let fname;
    let dob;
    let customerSearched = isCustomerSearched;
    useEffect(() => {
        // setCustomers(customersList)
        Axios.get('http://localhost:8080/getCustomers')
            .then(response => {
                console.log(response.data.customers);
                setCustomers(response.data.customers);
            })
            .catch(error => {
                console.log(error);
            })
    }
        , [isCustomerSearched]
    )

    function closeSearchedCustomer() {
        document.getElementById('fname').value = null;
        document.getElementById('dob').value = null;
        setIsCustomerSearched(false)
    }

    function deleteCustomer(customerId) {
        Axios.delete(`http://localhost:8080/deleteCustomer/${customerId}`).then(
            response => {
                console.log(response.data);
            }
        )
            .catch(error => {
                console.log(error);
            })
    }
    function searchCustomer() {
        fname = document.getElementById('fname').value;
        dob = document.getElementById('dob').value;
        if (fname && dob) {
            console.log(fname, dob);
            customers.filter(customer => {
                if (fname === customer.firstName && dob === customer.dateOfBirth) {
                    setSearchedCustomer(customer)
                    setIsCustomerSearched(true)
                }
            })

        }
    }

    function callUpdate(customer) {
        customerToBeUpdated = customer
        console.log(customer)
        handleShow()
    }

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
        Axios.put('http://localhost:8080/updateCustomer', formData)
            .then(response => {
                console.log(response.data)
                setIsSubmitted(true)
            })
            .catch(
                (err) => {
                    if (err.response.data) {
                        errr = err.response.data
                        if (errr.errors) {
                            errors = errr.errors
                        }
                        setError(errr)
                    }
                    console.log(error)
                }
            )
    }

    const paginate = pageNum => {
        setCurrentPage(pageNum)
    }

    const countries = [
        { key: 'Select an option', value: '' },
        { key: 'India', value: 'India' },
        { key: 'Pakistan', value: 'Pakistan' },
        { key: 'Nepal', value: 'Nepal' },
        { key: 'Bangladesh', value: 'Bangladesh' },
        { key: 'Afghanistan', value: "Afghanistan" }
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

    const indexOfLastPage = currentPage * postsPerPage
    const indexOfFirstPage = indexOfLastPage - postsPerPage
    const currentCustomers = customers.slice(indexOfFirstPage, indexOfLastPage)
    const nextPage = () => setCurrentPage(currentPage + 1)
    const previousPage = () => setCurrentPage(currentPage - 1)

    return (
        <>
            <Row className="mt-3 ml-5">
                <Col md={12}>
                    <h2>Search Customer</h2>
                    <Row>
                        <Col md={3} sm={3}>
                            FirstName: <input type='text' name='fname' id='fname' />
                        </Col>
                        <Col md={3} sm={3}>
                            Date of Birth:  <input type='date' name='dob' id='dob' />
                        </Col>
                        <Col md={2} md={2}>
                            <Button variant="primary" style={{ marginTop: "20px" }} onClick={() => searchCustomer()}>Search</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {
                customerSearched ?
                    <>
                        <h2>Customer Details</h2>
                        <Row>
                            <Col>
                                <Button variant="outline-danger" style={{ float: "right" }} onClick={() => {
                                    closeSearchedCustomer()
                                }}>X</Button>{' '}
                                <Table striped bordered hover className="mt-3" >
                                    <thead >
                                        <tr variant="dark">
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Date of birth</th>
                                            <th>Address Proof</th>
                                            <th>Identity Proof</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td>{searchedCustomer.firstName}</td>
                                            <td>{searchedCustomer.lastName}</td>
                                            <td>{searchedCustomer.dateOfBirth}</td>
                                            <td>{searchedCustomer.documents.addressProofFileName}</td>
                                            <td>{searchedCustomer.documents.identityProofFileName}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </>
                    :
                    <Row className="ml-2 mr-2 mt-2">
                        <h2>Customer Details</h2>
                        <Table striped bordered hover className="mt-3" >
                            <thead >
                                <tr variant="dark">
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Date of birth</th>
                                    <th>Address Proof</th>
                                    <th>Identity Proof</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentCustomers.map(customer =>
                                        <tr key={customer.customerId}>
                                            <td><a onClick={() => callUpdate(customer)}>{customer.firstName}</a></td>
                                            <td>{customer.lastName}</td>
                                            <td>{customer.dateOfBirth}</td>
                                            <td>{customer.documents.addressProofFileName}</td>
                                            <td>{customer.documents.identityProofFileName}</td>
                                            <td><Button variant="primary" onClick={() => deleteCustomer(customer.customerId)}>Delete</Button>{' '}</td>
                                        </tr>)
                                }
                            </tbody>
                        </Table>
                        <Pagination postsPerPage={postsPerPage} totalPosts={customers.length} paginate={paginate} nextPage={nextPage} previousPage={previousPage} />
                    </Row>
            }
            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Body>

                    {
                        isSubmitted ? <Row>
                            <Col>
                                <Row  style={{ justifyContent: "center" }}>
                                    <h2 className="text-center">Submitted Successfuly</h2>
                                </Row>
                                <Row  style={{ justifyContent: "center" }}>
                                    <Button variant="primary" onClick={handleClose}>
                                        Ok
                            </Button>
                                </Row>
                            </Col>
                        </Row> :
                            <Row className="UpdateCustomer">
                                <Col className='mt-3'>
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
                                        initialValues={customerToBeUpdated}
                                        onSubmit={onSubmit}
                                        enableReinitialize
                                    >
                                        <Card md={{ span: 4, offset: 4 }}>
                                            <Card.Body  >
                                                <h2 className="text-center">Update Customer</h2>
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
                                                                                    value={emails[index].email}
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
                                                                                    value={mobileNumber.mobileNumber}
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
                    }

                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>

                </Modal.Footer> */}
            </Modal>
        </>
    )
}

export default ViewCustomers

