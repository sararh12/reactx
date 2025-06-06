import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CoursePayment, GetCourseWithId, PaymentImage } from "@/services/api/course/courseService";
import OnSetFormData from "@/utils/form-data";
import { useToast } from "@/hooks/use-toast";
import { BsUpload } from "react-icons/bs";

const PaymentModal = ({ setisModalShow, InitialValue }) => {
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  console.log(InitialValue);


  async function handlePaymentImage(values) {
    setStep(2);
    console.log(values);

     const newValue = {
       
     };

    const formData=OnSetFormData(newValue)

    const callApi = await PaymentImage(formData)

    console.log(callApi);
    
  }



  async function handleSubmit(values) {
    console.log(values);

    const newValue = {
      ...values,
      CourseId: InitialValue.courseId,
    };
    console.log(newValue);
     const formData = OnSetFormData(newValue);

      const callApi = await CoursePayment(formData);

       console.log(callApi);
  }

  return (
    <div className="bg-[#222222B2] w-[916px] h-[524px] absolute backdrop-blur rounded-[15px] shadow-[0_2px_4px_0_#00000040]	">
      <button className="p-3" onClick={() => setisModalShow(false)}>
        <IoIosCloseCircleOutline className="size-7" />
      </button>
      <div className="text-[#FFFFFF] flex justify-center flex-col items-center font-[700] mb-8">
        <h1 className=" text-[28px] mb-2">فرم ثبت اطلاعات پرداختی</h1>
        <span className="text-sm"> (دوره جامع آموزش js)</span>
      </div>
      <div className="mb-8">
        <div className="flex justify-center items-center ">
          <div
            className={`w-12 h-12 rounded-[10px] flex items-center justify-center ${
              step >= 1
                ? "bg-[#E48900] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            ۱
          </div>
          <div
            className={`h-1 w-24 ${step >= 2 ? "bg-[#E48900]" : "bg-gray-200"}`}
          ></div>
          <div
            className={`w-12 h-12 rounded-[10px] flex items-center justify-center ${
              step >= 2
                ? "bg-[#E48900] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            ۲
          </div>
          <div
            className={`h-1 w-24 ${step >= 3 ? "bg-[#E48900]" : "bg-gray-200"}`}
          ></div>
          <div
            className={`w-12 h-12 rounded-[10px] flex items-center justify-center ${
              step >= 3
                ? "bg-[#E48900] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            <AiOutlineCheckCircle className="size-9" />
          </div>
        </div>
      </div>
      {step === 1 && (
        <div>
          <Formik
            initialValues={{
              Paid: InitialValue.payment,
              PaymentInvoiceNumber: "",
              PeymentDate: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
              setStep(2);
            }}
          >
            <Form className="max-w-md mx-auto space-y-4 text-right">
              <div>
                <label className="block mb-1 text-gray-700">
                  شناسه پرداختی
                </label>
                <Field
                  name="PaymentInvoiceNumber"
                  className="w-[290px] bg-[#D9D9D940] rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-[#E48900]"
                />
                <ErrorMessage
                  name="PaymentInvoiceNumber"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">تاریخ پرداخت</label>
                <Field
                  type="date"
                  name="PeymentDate"
                  className="w-[290px] bg-[#D9D9D940] rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-[#E48900]"
                />
                <ErrorMessage
                  name="PeymentDate"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  مبلغ پرداختی (به تومان)
                </label>
                <Field
                  type="text"
                  name="Paid"
                  className="w-[290px] bg-[#D9D9D940] rounded-[8px] p-2 focus:outline-none focus:ring-2 focus:ring-[#E48900]"
                />
                <ErrorMessage
                  name="Paid"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-300 text-white rounded-lg p-2 mt-4 hover:bg-gray-400"
              >
                ثبت اطلاعات
              </button>
            </Form>
          </Formik>
        </div>
      )}

      {step === 2 && (
        <div className="flex justify-around items-center mt-8">

          <div className="flex flex-col items-center space-y-4 text-white">
            <p>فایل مورد نظر را انتخاب کنید</p>
            <label
              htmlFor="fileUpload"
              className="bg-[#D9D9D940] hover:bg-gray-400 rounded-[8px] p-4 cursor-pointer"
            >
              <BsUpload className="text-xl" />
            </label>

            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedFile(file);
                  setPreviewURL(URL.createObjectURL(file));
                }
              }}
            />

            <button className="bg-[#C2C2C2] text-white rounded-[8px] p-2 w-48 hover:bg-gray-400"
            onClick={(values) => {
              handlePaymentImage(values);}}
            >
              ثبت اطلاعات
            </button>
          </div>
          <div className="border-dashed border-2 border-gray-400 rounded-lg w-72 h-72 flex flex-col items-center justify-center cursor-pointer text-white hover:border-[#E48900] overflow-hidden">
            {previewURL ? (
              <img
                src={previewURL}
                alt="فیش پرداختی"
                className="object-contain max-w-full max-h-full"
              />
            ) : (
              <>
                <span className="text-lg mb-2">فیش پرداختی</span>
                <span className="text-4xl">+</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default PaymentModal;
