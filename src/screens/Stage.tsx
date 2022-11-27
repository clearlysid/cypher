import Webcam from "react-webcam";

function Stage() {
  return (
    <div className="container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      rowGap: 10
    }}>
      <Webcam muted playsInline autoPlay={true} controls={false} style={{
        width: 300,
        height: 300,
        objectFit: "cover",
        borderRadius: '50%'
      }}
        data-tauri-drag-region
      />
    </div>
  );
}

export default Stage;
