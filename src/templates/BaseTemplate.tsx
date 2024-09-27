const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full text-gray-700 antialiased">
      <div className="mx-auto max-w-[1100px]">
        <header className="border-b border-gray-300">

          <div className="flex justify-between py-4">
            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.leftNav}
              </ul>
            </nav>

            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.rightNav}
              </ul>
            </nav>
          </div>
        </header>

        <main>{props.children}</main>

        <footer className="border-t border-gray-300 py-8 text-center text-sm">

        </footer>
      </div>
    </div>
  );
};

export { BaseTemplate };
