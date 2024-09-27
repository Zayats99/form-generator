export default function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // unstable_setRequestLocale(props.params.locale);
  // const t = useTranslations('RootLayout');

  return (
  // <BaseTemplate
  //   leftNav={(
  //     <>
  //       <li>
  //         <Link
  //           href="/"
  //           className="border-none text-gray-700 hover:text-gray-900"
  //         >
  //           {t('home_link')}
  //         </Link>
  //       </li>
  //       <li>
  //         <Link
  //           href="/about/"
  //           className="border-none text-gray-700 hover:text-gray-900"
  //         >
  //           {t('about_link')}
  //         </Link>
  //       </li>

    //     </>
    //   )}
    //   rightNav={(
    //     <li>
    //       <LocaleSwitcher />
    //     </li>
    //   )}
    // >
    <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
  );
}
