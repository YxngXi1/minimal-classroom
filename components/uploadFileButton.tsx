import React, { useRef } from 'react';

const FileUploadButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // Handle file upload here
      console.log(event.target.files);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={handleButtonClick} 
        className="px-4 py-6 bg-[#d9d9d9] rounded w-full"
      >
        Attach Your Work Here
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUploadButton;