import Link from 'next/link';
import type { ReactNode } from 'react';

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-lg">
      <header className="border-b border-gray-300">
        <div className="flex justify-between">
          <nav>
            <ul className="flex flex-wrap text-xl">
              <li className="mr-6">
                <Link
                  href="/form/"
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  Form
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="content py-5 text-xl">{props.children}</main>

      <footer className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()}
      </footer>
    </div>
  </div>
);

export { Main };
