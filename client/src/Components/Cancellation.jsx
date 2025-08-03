import React from 'react';

function CancellationPolicy() {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Cancellation Policy</h2>
      <p className="text-gray-700 leading-relaxed text-justify">
        We understand that travel plans can change, which is why we’ve designed a flexible cancellation policy to
        accommodate your needs. Guests may cancel their reservation free of charge up to 48 hours before the scheduled
        check-in time. Cancellations made within 48 hours of check-in will incur a charge equivalent to the first
        night's stay. No-shows without prior notice will be charged the full reservation amount.
        <br /><br />
        For bookings made through third-party platforms, please refer to the respective platform’s cancellation terms, as
        they may vary slightly. Refunds, where applicable, will be processed within 5–7 business days to the original
        method of payment.
        <br /><br />
        In case of unavoidable circumstances such as natural disasters, medical emergencies, or travel restrictions,
        please reach out to our customer support team with proper documentation. We strive to be as accommodating as
        possible under such situations and will evaluate each request on a case-by-case basis.
        <br /><br />
        For group bookings or long-term stays, custom cancellation terms may apply and will be shared at the time of
        confirmation. We recommend guests review these details carefully before confirming their stay.
        <br /><br />
        Your comfort and peace of mind are important to us. If you have any questions about your reservation or need
        further assistance with cancellations or modifications, feel free to contact our support team anytime.
      </p>
    </div>
  );
}

export default CancellationPolicy;
