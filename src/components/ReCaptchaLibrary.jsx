import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';

const ReCaptchaComponent = ({ onVerify, onExpire, resetKey = 0 }) => {
  const [recaptchaRef, setRecaptchaRef] = useState(null);

  const handleChange = (token) => {
    if (token) {
      console.log('reCAPTCHA verified:', token);
      onVerify(token);
    } else {
      console.log('reCAPTCHA expired');
      onExpire();
    }
  };

  const handleExpired = () => {
    console.log('reCAPTCHA expired');
    onExpire();
  };

  const handleError = () => {
    console.error('reCAPTCHA error occurred');
    onExpire();
  };

  return (
    <div className="flex justify-center my-4">
      <ReCAPTCHA
        ref={(ref) => setRecaptchaRef(ref)}
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        onChange={handleChange}
        onExpired={handleExpired}
        onErrored={handleError}
        theme="light"
        size="normal"
      />
    </div>
  );
};

export default ReCaptchaComponent;
