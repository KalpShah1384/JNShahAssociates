import { useState } from 'react';

const ReCaptcha = ({ onVerify, onExpire }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = () => {
    setIsLoading(true);
    
    // Simulate verification delay like real reCAPTCHA
    setTimeout(() => {
      const token = `security-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setIsVerified(true);
      setIsLoading(false);
      onVerify(token);
      console.log('Security verification completed');
    }, 800);
  };

  const handleReset = () => {
    setIsVerified(false);
    onExpire();
  };

  if (isVerified) {
    return (
      <div className="flex justify-center my-4">
        <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div>
            <span className="text-green-700 font-medium">Security verification completed</span>
            <p className="text-xs text-green-600">You can now submit the form</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-4">
      <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm min-w-[280px]">
        <div className="flex items-center space-x-3">
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <input
              type="checkbox"
              id="security-verify"
              onChange={(e) => {
                if (e.target.checked) {
                  handleVerify();
                } else {
                  handleReset();
                }
              }}
              className="w-6 h-6 cursor-pointer accent-blue-600"
            />
          )}
          <label htmlFor="security-verify" className="text-gray-700 font-medium cursor-pointer select-none flex-1">
            {isLoading ? 'Verifying...' : "I'm not a robot"}
          </label>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </div>
          <span className="text-xs text-gray-400">Protected by Security Check</span>
        </div>
      </div>
    </div>
  );
};

export default ReCaptcha;
