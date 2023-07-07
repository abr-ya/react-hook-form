import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Link } from "react-router-dom";

type HeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  return (
    <header className={className} {...props}>
      <Link to="/">Home</Link>
      <Link to="/product">Food</Link>
      <Link to="/search">Search</Link>
    </header>
  );
};

export default Header;
