import { ClipLoader } from "react-spinners";

function Spinner() {
  return (
    <div className=" flex justify-center  ">
      <ClipLoader size={200} thickness={500} color="purple" />
    </div>
  );
}

export default Spinner;
