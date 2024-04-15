import { Form, Formik, Field, ErrorMessage } from "formik";
import { deleteEmployee } from "../../../supports/api/employee";
import { useState, useEffect } from "react";

export default function DeleteEmployee({ open, close, data }) {
  if (!open) return null;

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  const closeHandler = (e) => {
    if (e.target.id === "popup-bg") {
      close();
    }
    if (e.target.id === "close-btn") {
      close();
      window.location.reload();
    }
  };

  const submitHandler = async (values, { resetForm }) => {
    try {
      setMessage(await deleteEmployee(data.id, values));
      setDeleteSuccess(true); // Set Delete success to true
    } catch (error) {
      console.error(error);
      setDeleteSuccess(false); // Set Delete success to false if there's an error
    }
  };

  return (
    <>
      {deleteSuccess ? (
        <div
          id="popup-bg"
          onClick={closeHandler}
          className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center"
        >
          <div className="bg-white p-4 rounded w-[30%] h-[60%] p-12 flex flex-col gap-8">
            <div className="flex flex-col my-auto">
              <div className="mx-auto font-bold">{message}</div>
              <button
                id="close-btn"
                onClick={closeHandler}
                className="mt-8 rounded-lg border p-2 bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          id="popup-bg"
          onClick={closeHandler}
          className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center"
        >
          <div className="bg-white p-4 rounded w-[30%] h-[60%] p-12 flex flex-col gap-8">
            <div className="font-bold mx-auto">Delete Employee Data</div>
            <div className="mx-auto">{`Deleting data for ${data.name} (ID: ${data.id})`}</div>
            <div className="mx-auto text-center px-8">{`This action can not be undone. Once deleted, all data of the employee will be lost.`}</div>
            <Formik
              initialValues={{
                name: data.name,
                email: data.email,
                shiftId: data.shiftId.toString(),
                positionId: data.positionId.toString(),
              }}
              onSubmit={submitHandler}
            >
              {({ dirty }) => {
                return (
                  <Form>
                    <div className="flex flex-col gap-2">
                      <label>Write "Delete Employee" to proceed</label>
                      <Field
                        className="border p-2"
                        type="text"
                        id="confirm"
                        name="confirm"
                      />
                      <button
                        type="submit"
                        className="mt-8 rounded-lg border p-2 bg-slate-300"
                      >
                        Delete
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
