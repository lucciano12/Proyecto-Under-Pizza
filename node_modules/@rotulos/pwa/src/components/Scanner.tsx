import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { useNavigate } from 'react-router-dom';

export const Scanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const controlsRef = useRef<any>(null);
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const startScan = async () => {
      if (scanning && videoRef.current) {
        try {
          const controls = await codeReader.current.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
            if (result) {
              setScanning(false);
              controlsRef.current?.stop();
              navigate(`/product/${result.getText()}`);
            }
          });
          controlsRef.current = controls;
        } catch (err) {
          console.error(err);
        }
      }
    };
    startScan();

    return () => {
      controlsRef.current?.stop();
    };
  }, [scanning, navigate]);

  return (
    <div className="scanner-container">
      <h2 className="title" style={{ color: 'white' }}>Scan QR Code</h2>
      <video ref={videoRef} className="video-view" />
      {!scanning && <button onClick={() => setScanning(true)} className="btn-resume">Resume</button>}
    </div>
  );
};
