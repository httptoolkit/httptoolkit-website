import { ContentWithTable } from '@/components/sections/content-with-table';
import { HeroPoints } from '@/components/sections/hero-points';
import { getPageContent } from '@/lib/mdx/page';

export default async function PrivacyPolicy() {
  const { content, pageTocLinks } = await getPageContent('src/app/(legal)/privacy-policy/content.mdx');

  return (
    <>
      <HeroPoints
        title="Privacy Policy"
        text={`**The text below formally defines what data HTTP Toolkit collects, how HTTP Toolkit uses your data, and why.** \n\n **HTTP Toolkit does its best to avoid collecting data about you wherever possible. The content of your HTTP(S) requests & responses is never collected, and this is stored only locally on your machine. Users of HTTP Toolkit are typically completely anonymous, except for users who explicitly log into HTTP Toolkit accounts, and HTTP Toolkit takes efforts to preserve the anonymity of collected data wherever possible.** \n\n **If you have suggestions for ways to improve user privacy, let us know at github.com/httptoolkit/httptoolkit. If you'd like to see exactly what data HTTP Toolkit collects up close, feel free to take a look at the source for yourself.**`}
      />
      <ContentWithTable parsedContent={content} links={pageTocLinks} withIntroHeading={false} />
    </>
  );
}
