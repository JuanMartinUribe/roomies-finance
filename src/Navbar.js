import { BiHome, BiUser } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
function Navbar() {
  return (
    <>
      <div className="navbar">
        <a href="/roomies" className="roomies-icon">
          <BiUser size={50} />
        </a>
        <a href="/debts">
          <BsCashCoin size={50} />
        </a>
      </div>
    </>
  );
}

export default Navbar;
