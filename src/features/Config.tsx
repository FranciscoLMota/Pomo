import { IoMdSettings } from "react-icons/io";
import { useState } from 'react';

type configProps = {
  configuredTime: number;
  setConfiguredTime: (value: number) => void;
  configuredRelaxTime: number;
  setConfiguredRelaxTime: (value: number) => void;
};

export function Config({ configuredTime, setConfiguredTime, configuredRelaxTime, setConfiguredRelaxTime }: configProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue)) return;

    newValue = Math.max(1, Math.min(99, newValue));
    e.target.value = String(newValue)

    setConfiguredTime(newValue * 60);
  };

  const handleBreakChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue)) return;

    newValue = Math.max(1, Math.min(99, newValue));
    e.target.value = String(newValue)

    setConfiguredRelaxTime(newValue * 60);
  };

  return (
    <>
      <div className="absolute right-0 bottom-0 size-16 text-4xl" onClick={() => setIsMenuOpen(!isMenuOpen)}><IoMdSettings /></div>
      <div className={`fixed top-30 left-0 w-full z-50 border-4 transform ${isMenuOpen ? "translate-x-1/2 md:translate-x-3/4" : "translate-x-full"} transition-transform duration-300 ease-in-out p-5 z-40 bg-onyx`}>
        <ul className="space-y-5 text-sm ">
          <li className="text-whiteish text-left">FOCUS TIME</li>
          <li className="text-whiteish text-left"><input onChange={handleChange} className="shadow appearance-none border border-2 w-[150px] md:w-[200px] py-2 px-3 text-whiteish leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" max="99" min="1" defaultValue={configuredTime / 60} /></li>
          <li className="text-whiteish text-left">BREAK TIME</li>
          <li className="text-whiteish text-left"><input onChange={handleBreakChange} className="shadow appearance-none border border-2 w-[150px] md:w-[200px] py-2 px-3 text-whiteish leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" max="99" min="1" defaultValue={configuredRelaxTime / 60} /></li>
        </ul>
      </div>
    </>
  );
}
