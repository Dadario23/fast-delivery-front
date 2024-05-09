// components/CookieConsentPopup.tsx

import { useState } from "react";

const CookieConsentPopup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleAccept = () => {
    // Configurar la cookie para aceptar cookies de terceros
    document.cookie = "cookieConsent=accepted; SameSite=None; Secure";
    setShowPopup(false);
  };

  const handleReject = () => {
    // Aquí puedes agregar la lógica para rechazar las cookies de terceros
    // o redirigir al usuario a una página con más información sobre las cookies
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Cookie Consent</h2>
            <p className="mb-4">
              This website uses cookies to ensure you get the best experience on
              our website.
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleAccept}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mr-4 rounded"
              >
                Accept
              </button>
              <button
                onClick={handleReject}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentPopup;
