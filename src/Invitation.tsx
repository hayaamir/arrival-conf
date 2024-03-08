// import Circle from "../public/circle";

export default function Invitation() {
  return (
    <div
      className="bg-cover min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url('./background.png')` }}
    >
      {/* <Circle /> */}
      <img
        src="public/Invitation.png"
        alt="Invitation"
        className="object-fill w-2/4 drop-shadow-xl"
      ></img>
    </div>
  );
}
