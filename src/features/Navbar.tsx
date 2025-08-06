import tomatoLogo from '../assets/tomato.svg'

export function Navbar() {

  return (
    <>
      <nav className="sticky top-0 z-55 backdrop-blur-sm transition-colors duration-500 my-0 ">
        <div className="flex flex-wrap place-items-center overflow-hidden my-0">
          <section className="relative">
            <nav className="flex justify-between text-midnight dark:text-eggshell w-screen">
              <div className="p-5 pt-0 flex w-full items-center">
                <img src={tomatoLogo} className="h-25 w-25" alt="Vite logo" />
                <ul className="md:flex px-4 mx-auto font-semibold font-heading space-x-12"></ul>
                <ul className="xl:flex my-0  space-x-3 align-top pt-0">
                   <p className='font-russo text-5xl text-whiteish align-top pt-0'>POMO</p>
                </ul>
              </div>


            </nav>
          </section>
        </div>
      </nav>
    </>
  );
}
