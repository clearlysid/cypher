import Webcam from "react-webcam";

function Camera() {
  return (
    <div className="container" style={{
      height: '100%',
      display: 'flex',
      borderRadius: '50%',
      color: 'lightsalmon',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'currentColor',
      border: '10px solid currentColor',
    }}>
      <Webcam
        muted
        playsInline
        autoPlay={true}
        controls={false}
        className="webcam"
        data-tauri-drag-region
        style={{
          width: '100%',
          height: '100%',
          objectFit: "cover",
          borderRadius: '50%',
          backgroundColor: 'red',
          cursor: 'grab',
          mixBlendMode: 'multiply',
          margin: 0,
          padding: 0,
          filter: 'contrast(1.2) saturate(0) brightness(1.4)',
        }}
      />
    </div>
  );
}

export default Camera;
