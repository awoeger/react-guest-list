import GuestifyFont from './images/GuestifyFont.PNG';
import Logosmall from './images/Logosmall.PNG';

export default function Header() {
  return (
    <div className="header">
      <div className="headerDivLeft">
        <img className="logosmall" src={Logosmall} alt="Logo" />
        <img src={GuestifyFont} alt="Guestify" />
      </div>
      <div className="headerDivRight">
        {/* <p>Handle your events</p> */}
        <div className="typing-demo">Handle your events...and your guests</div>
      </div>
    </div>
  );
}
