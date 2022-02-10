import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, accept, preview }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });
  return preview ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={URL.createObjectURL(preview)}
        alt={preview.name}
        style={{ maxWidth: "inherit", height: "inherit", maxHeight: "inherit" }}
      />
    </div>
  ) : (
    <div {...getRootProps()} className="upload">
      <input className="dropzone-input" {...getInputProps()} />
      <div div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Release here to drop the image</p>
        ) : (
          <p className="dropzone-content">Drag an image here</p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
