const PaymentSuccess = ({ data }) => {
  return (
    <div className="flex items-center justify-center mt-[60px] mb-[130px] px-7">
      <div className="w-[683px] md:w-[896px] px-[60px] py-[80px] md:py-[135px] text-center rounded-xl shadow-[0px_0px_25px_rgba(0,0,0,0.19)]">
        <div className="flex items-center justify-center gap-4 flex-col sm:flex-row">
          <img
            src="/images/approve.png"
            alt="approve"
            style={{ width: "50px" }}
          />
          <h3 className="font-roboto text-lg md:text-3xl font-bold text-[#161616]">
            Payment successful
          </h3>
        </div>
        <div className="flex flex-col gap-6 max-lg:text-center">
          <div className="flex flex-col gap-4">
            <p className="font-normal text-[#4B4B4B] mt-2.5 text-md md:text-xl">
              Thank you for your payment ${data.paid_amount} USD has been
              received.
            </p>
            <p className="mt-10 font-bold text-[#444444]">
              Order number: #<span className="uppercase">{data.order_id}</span>
            </p>
            <div className="flex flex-col gap-2">
              {/* <p className=" text-[#4b4b4b]">Phone No: 2547899665</p> */}
              <p className=" text-[#4b4b4b]">Contact Us : <a href="mailto:support@matchmytees.com">support@matchmytees.com</a></p>
            </div>
            <p className="font-normal  md:w-[627px] mx-auto mt-12.5 text-[#4b4b4b]">
              A confirmation mail has been sent to your email. You can find the
              products & payment details there. If you have any confusion
              regarding on this order please contact us on the above mention
              phone number or email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
