export default function Cattle() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <iframe
        className="w-full min-h-screen"
        src={process.env.GOOGLE_SHEETS_CATTLE}
      ></iframe>
    </div>
  );
}
