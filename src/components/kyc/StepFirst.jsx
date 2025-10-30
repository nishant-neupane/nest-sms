"use client";

import React, { use, useState } from "react";
import { Upload, ChevronDown, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
export default function MultiStepKYC() {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 states
  const [documentType, setDocumentType] = useState("Citizenship");
  const [documentNumber, setDocumentNumber] = useState("");
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errors, setErrors] = useState({});
const route = useRouter();
  // Step 2 states
  const [amount, setAmount] = useState("50000");
  const [paymentMethod, setPaymentMethod] = useState("eSewa");

  const handleFileUpload = (e, side) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [side]: "Please upload a valid image file (JPEG, PNG, or WebP)",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [side]: "File size must be less than 5MB",
        }));
        return;
      }

      if (side === "front") {
        setFrontFile(file);
        setErrors((prev) => ({ ...prev, front: null }));
      } else {
        setBackFile(file);
        setErrors((prev) => ({ ...prev, back: null }));
      }
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!documentType) {
      newErrors.documentType = "Please select a document type";
    }

    if (!documentNumber.trim()) {
      newErrors.documentNumber = "Please enter document number";
    }

    if (!frontFile) {
      newErrors.front = "Please upload front side of document";
    }

    if (!backFile) {
      newErrors.back = "Please upload back side of document";
    }

    if (!isConfirmed) {
      newErrors.confirmation = "Please confirm the information";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Continue = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      setErrors({});
    }
  };

  const validateStep2 = () => {
    const newErrors = {};
    const amountNum = parseFloat(amount);

    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = "Please enter a valid amount";
    } else if (amountNum < 1000) {
      newErrors.amount = "Minimum amount is Rs. 1,000";
    }

    if (!paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep2Start = () => {
    if (validateStep2()) {
      setCurrentStep(3);
      setErrors({});
    }
  };

  const handleExploreDashboard = () => {
  route.push("/dashboard"); 
  };

  // Progress Indicator Component
  const ProgressIndicator = ({ activeStep }) => (
    <div className="flex items-center justify-between mb-12 px-8">
      {[1, 2, 3].map((step, index) => (
        <div key={step} className="flex flex-col items-center relative flex-1">
          <div
            className={`text-base font-semibold mb-3 transition-colors ${
              activeStep >= step ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Step {step}
          </div>
          <div
            className={`w-3 h-3 rounded-full transition-colors ${
              activeStep >= step ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
          {index < 2 && (
            <div
              className={`absolute top-[41px] left-[50%] w-full h-0.5 transition-colors ${
                activeStep > step ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );

  // Error Message Component
  const ErrorMessage = ({ message }) =>
    message ? (
      <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>{message}</span>
      </div>
    ) : null;

  // Step 1: Document Upload
  const StepOne = () => (
    <div className="bg-white rounded-3xl shadow-2xl px-12 py-10 max-w-2xl w-full">
      <ProgressIndicator activeStep={1} />

      <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
        Upload a proof of your identity
      </h2>
      <p className="text-gray-500 text-center text-sm mb-10">
        Nest SMS requires a valid government issued ID (PAN, Citizenship No.)
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-gray-900 text-sm font-semibold mb-3">
            Document Type
          </label>
          <div className="relative">
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none text-gray-900 appearance-none cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="Citizenship">Citizenship</option>
              <option value="PAN">PAN</option>
              <option value="Company Registration">Company Registration</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          <ErrorMessage message={errors.documentType} />
        </div>

        <div>
          <label
            htmlFor="documentNumber"
            className="block text-gray-900 text-sm font-semibold mb-3"
          >
            Document Number
          </label>
          <input
            id="documentNumber"
            type="text"
            placeholder="Enter document number"
            value={documentNumber}
            onChange={(e) => {
              const value = e.target.value;
              setDocumentNumber(value);
              if (errors.documentNumber) {
                setErrors((prev) => ({ ...prev, documentNumber: null }));
              }
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 transition-all"
          />
          <ErrorMessage message={errors.documentNumber} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "front")}
              className="hidden"
            />
            <div
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center h-48 transition-all ${
                frontFile
                  ? "border-green-300 bg-green-50"
                  : errors.front
                  ? "border-red-300 bg-red-50"
                  : "border-blue-300 bg-blue-50 hover:border-blue-400"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  frontFile ? "bg-green-100" : "bg-blue-100"
                }`}
              >
                {frontFile ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <Upload className="w-6 h-6 text-blue-600" />
                )}
              </div>
              {frontFile ? (
                <div className="text-center">
                  <div className="text-sm text-green-600 font-medium mb-1 truncate max-w-[150px]">
                    {frontFile.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {(frontFile.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-sm text-gray-600 font-medium mb-2">
                    Frontside of Document
                  </div>
                  <div className="text-xs text-gray-500">Click to upload</div>
                </div>
              )}
              <button className="mt-3 px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors">
                {frontFile ? "Change File" : "Choose File"}
              </button>
            </div>
          </label>
          <ErrorMessage message={errors.front} />
        </div>

        <div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "back")}
              className="hidden"
            />
            <div
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center h-48 transition-all ${
                backFile
                  ? "border-green-300 bg-green-50"
                  : errors.back
                  ? "border-red-300 bg-red-50"
                  : "border-blue-300 bg-white hover:border-blue-400"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  backFile ? "bg-green-100" : "bg-blue-100"
                }`}
              >
                {backFile ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <Upload className="w-6 h-6 text-blue-600" />
                )}
              </div>
              {backFile ? (
                <div className="text-center">
                  <div className="text-sm text-green-600 font-medium mb-1 truncate max-w-[150px]">
                    {backFile.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {(backFile.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-sm text-gray-600 font-medium mb-2">
                    Backside of Document
                  </div>
                  <div className="text-xs text-gray-500">Click to upload</div>
                </div>
              )}
              <button className="mt-3 px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors">
                {backFile ? "Change File" : "Choose File"}
              </button>
            </div>
          </label>
          <ErrorMessage message={errors.back} />
        </div>
      </div>

      <div className="mb-8">
        <label className="flex items-start cursor-pointer group">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          />
          <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
            I confirm that all the information provided is true. The information
            that I provided contains my picture, signature and photo.
          </span>
        </label>
        <ErrorMessage message={errors.confirmation} />
      </div>

      <button
        onClick={handleStep1Continue}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Continue to Payment
      </button>
    </div>
  );

  // Step 2: Payment/Top-up
  const StepTwo = () => (
    <div className="bg-white rounded-3xl shadow-2xl px-12 py-10 max-w-2xl w-full">
      <ProgressIndicator activeStep={2} />

      <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
        Got your Document, Woohoo! <span className="text-green-500">✓</span>
      </h2>
      <p className="text-gray-500 text-center text-sm mb-10">
        SMS sending requires credits — your assigned rate is Rs. 0.9 per
        message.
      </p>

      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 mb-8 shadow-lg">
        <div className="text-white text-4xl font-bold mb-2">
          {parseFloat(amount || 0).toLocaleString("en-NP", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          <span className="text-xl font-normal">NPR</span>
        </div>
        <div className="text-blue-100 text-sm mb-6">Current Balance</div>

        <div className="bg-white rounded-xl p-6">
          <label className="block text-gray-700 text-sm font-semibold mb-3">
            Enter Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 mb-2"
          />
          <ErrorMessage message={errors.amount} />

          <div className="flex gap-2 mb-6 mt-4">
            <button
              onClick={() => setAmount("10000")}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              Rs. 10,000
            </button>
            <button
              onClick={() => setAmount("50000")}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              Rs. 50,000
            </button>
            <button
              onClick={() => setAmount("100000")}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              Rs. 100,000
            </button>
          </div>

          <label className="block text-gray-700 text-sm font-semibold mb-3">
            Choose Payment Method
          </label>
          <div className="relative">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none text-gray-900 appearance-none cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="eSewa">eSewa</option>
              <option value="Khalti">Khalti</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          <ErrorMessage message={errors.paymentMethod} />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setCurrentStep(1)}
          className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition-all text-base"
        >
          Back
        </button>
        <button
          onClick={handleStep2Start}
          className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Top-up and Start
        </button>
      </div>
    </div>
  );

  // Step 3: Success
  const StepThree = () => (
    <div className="bg-white rounded-3xl shadow-2xl px-12 py-10 max-w-2xl w-full">
      <ProgressIndicator activeStep={3} />

      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          All Set! You're Ready to Go
        </h2>
        <p className="text-gray-500 text-base">
          Your account has been verified and your credits have been added
          successfully.
        </p>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-blue-100">
          <span className="text-gray-700 font-medium">Document Verified</span>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-blue-100">
          <span className="text-gray-700 font-medium">Credits Added</span>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Account Balance</span>
          <span className="text-blue-600 font-bold text-lg">
            {parseFloat(amount || 0).toLocaleString("en-NP", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            NPR
          </span>
        </div>
      </div>

      <button
        onClick={handleExploreDashboard}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Explore Dashboard
      </button>
    </div>
  );



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex items-center justify-center p-4">
      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <StepThree />}
      {currentStep === 4 && <Dashboard />}
    </div>
  );
}
