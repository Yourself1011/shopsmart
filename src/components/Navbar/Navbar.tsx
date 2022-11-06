import React, { FC } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

import { BsShop } from "react-icons/bs";

interface NavbarProps {}
let pages: { path: string; name: string }[] = [
  { path: "/", name: "Home" },
  { path: "create", name: "Create" },
];

const Navbar: FC<NavbarProps> = () => (
  <div className="Navbar" data-testid="Navbar">
    <BsShop />
    {pages.map((x) => (
      <div key={x.name}>
        <Link key={x.name} to={x.path}>{x.name}</Link>
      </div>
    ))}
  </div>
);

export default Navbar;
