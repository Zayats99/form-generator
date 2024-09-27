import { unstable_setRequestLocale } from 'next-intl/server';

// export async function generateMetadata(props: { params: { locale: string } }) {
export async function generateMetadata() {
  // const t = await getTranslations({
  //   locale: props.params.locale,
  //   namespace: 'About',
  // });

  return {
    title: '',
    description: '',
  };
}

export default function About(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      About page
    </>
  );
}
