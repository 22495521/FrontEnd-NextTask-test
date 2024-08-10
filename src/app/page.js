"use client";

import { useRef, useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Table,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import axios from "axios";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function ModalComponent({ show, handleClose, type, task, editTask, getData }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (task?.name) {
      const obj = {
        ...task,
      };
      setFormData(obj);
    }
  }, [task, type]);

  const handleChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {formData?.name && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formTaskName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter task name"
                    disabled={type !== "edit"}
                  />
                </Form.Group>

                <Form.Group controlId="formTaskContent" className="mt-3">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.content}
                    name="content"
                    onChange={handleChange}
                    placeholder="Enter task content"
                    disabled={type !== "edit"}
                  />
                </Form.Group>

                <Form.Group controlId="formTaskRemarks" className="mt-3">
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData.remarks}
                    onChange={handleChange}
                    name="remarks"
                    placeholder="Enter remarks (optional)"
                    disabled={type !== "edit"}
                  />
                </Form.Group>

                <Form.Group controlId="formTaskTime" className="mt-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    disabled={type !== "edit"}
                    onChange={handleChange}
                    name="taskTime"
                    value={formData.taskTime}
                  />
                </Form.Group>

                <Form.Group controlId="formTaskDate" className="mt-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    disabled={type !== "edit"}
                    value={
                      formData.taskDate ? formatDate(formData.taskDate) : ""
                    }
                    onChange={handleChange}
                    name="taskDate"
                  />
                </Form.Group>

                <Form.Group controlId="formTaskLocation" className="mt-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    onChange={handleChange}
                    name="location"
                    value={formData.location}
                    disabled={type !== "edit"}
                  />
                </Form.Group>

                <Form.Group controlId="formTaskCreator" className="mt-3">
                  <Form.Label>Creator</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="creator"
                    value={formData.creator}
                    placeholder="Enter creator name"
                    disabled={type !== "edit"}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {type === "edit" && (
              <Button
                variant="primary"
                onClick={async () => {
                  const NewBody = {
                    ...formData,
                    taskDate: formatDate(formData.taskDate),
                  };

                  await editTask(NewBody);
                  await getData();
                  handleClose();
                }}
              >
                Save changes
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default function Home() {
  const [Tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //給Modal使用
  const ModalData = useRef(null);
  const ModalType = useRef(null);

  const [inputData, setInputData] = useState("");

  async function getData() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.get(`${apiUrl}/tasks`);
      setTasks(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function createTask() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      const body = {
        name: inputData,
        content: "",
        remarks: "",
        location: "",
        creator: "",
      };
      await axios.post(`${apiUrl}/task`, body);
    } catch (error) {
      console.error(error);
    }
  }

  async function delTask(id) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      await axios.delete(`${apiUrl}/task?id=${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  async function editTask(task) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      await axios.put(`${apiUrl}/task`, task);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <Container className="py-5 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Card className="rounded-3">
              <Card.Body className="p-4">
                <h4 className="text-center my-3 pb-3">To Do App</h4>
                <Form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                  <Col xs={12}>
                    <Form.Floating>
                      <Form.Control
                        type="text"
                        id="floatingInput"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                        placeholder="name@example.com"
                      />
                      <label htmlFor="floatingInput">請輸入名稱</label>
                    </Form.Floating>
                  </Col>

                  <Col xs={12}>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={async () => {
                        await createTask();
                        setInputData("");
                        await getData();
                      }}
                    >
                      新增
                    </Button>
                  </Col>
                </Form>
                <Table className="mb-4">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Creator</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Tasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.name}</td>
                        <td>{task.content}</td>
                        <td>
                          <Button
                            variant="primary"
                            className="me-1"
                            onClick={() => {
                              //use for Modal
                              ModalData.current = task;
                              ModalType.current = "check";
                              console.log(ModalData.current, ModalType.current);
                              handleShow();
                            }}
                          >
                            check
                          </Button>
                          <Button
                            variant="danger"
                            onClick={async () => {
                              await delTask(task.id);
                              await getData();
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="success"
                            className="ms-1"
                            onClick={() => {
                              //use for Modal
                              ModalData.current = task;
                              ModalType.current = "edit";
                              console.log(ModalData.current, ModalType.current);
                              handleShow();
                            }}
                          >
                            update
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </section>
      <ModalComponent
        show={show}
        handleClose={handleClose}
        task={ModalData.current}
        type={ModalType.current}
        editTask={editTask}
        getData={getData}
      />
    </>
  );
}
