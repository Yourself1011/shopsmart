import React, { FC } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

import { BsShop } from "react-icons/bs";
import { BsGithub } from 'react-icons/bs'

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

    <div className="github-logo">
      <a href="https://github.com/Yourself1011/shopsmart" target="_blank" rel="noreferrer">
        <BsGithub/>
      </a>
    </div>
  </div>
);

export default Navbar;
