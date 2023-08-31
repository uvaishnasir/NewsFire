import loading from "./Fountain.gif";

const Spinner = () => {
  return (
    <div className="text-center my-3">
      <img src={loading} alt="Loading..." />
    </div>
  );
};
export default Spinner;
