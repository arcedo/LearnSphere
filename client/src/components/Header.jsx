import Logo from '../assets/img/logo.svg';
import Menu from '../assets/img/menu.svg';
import Settings from '../assets/img/settings.svg';

function Header() {
  return (
    <header className="w-screen h-20 bg-black flex justify-between items-center py-3 px-5">
      <div className='w-fit flex justify-center items-center gap-4'>
        <img className="w-10 h-15" src={Menu} alt="menu" />
        <img className="w-10 h-15" src={Logo} alt="logo" />
        <h2 className=" w-10 h-5 text-white">Header</h2>
      </div>
      <div>

      </div>
    </header>
  );
}

export default Header;