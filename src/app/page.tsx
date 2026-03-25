'use client';
import LoginForm from "./Login/page";
import SignupForm from "./Signup/page";
import MainMenu from "./MainMenu/page";
import { useState } from "react";



// Main Contents Object
const views = {
  a: <LoginForm />,
  b: <SignupForm />,
  c: <MainMenu />,
};


export default function Home() {
  const [view, setView] = useState<keyof typeof views>('a');
  const SelectedComponent = views[view];
  
  function handleViewChange(e: React.FormEvent<HTMLFormElement>) {
    const { value } = e.target as HTMLSelectElement;
    e.preventDefault();
    if (value === 'a' || value === 'b' || value === 'c') {
      setView(value as keyof typeof views);
    } else {
      console.error("Invalid view value");
      return;
    }
  }
  return (
    <div>
      {SelectedComponent}
    </div>
  );
}
