import { ContentWithTable } from '@/components/sections/content-with-table';
import { HeroPoints } from '@/components/sections/hero-points';
import { getPageContent } from '@/lib/mdx/page';

export default async function TermsOfService() {
  const { content, pageTocLinks } = await getPageContent('src/app/(legal)/terms-of-service/content.mdx');

  return (
    <>
      <HeroPoints
        title="Terms Of Service"
        text={`There's some legal text below which formally defines how you're allowed to use HTTP Toolkit, this website, and your HTTP Toolkit user account. It looks serious, but it's all fairly standard boilerplate.\n\nThe rules here apply if you're using the hosted services (e.g. httptoolkit.com and app.httptoolkit.tech) and user accounts, or the published application binaries. This does not limit your open-source freedoms, and if you're building HTTP Toolkit yourself on your own infrastructure then only the open-source licenses apply.\n\nNote that the binaries specifically are dual-licensed: they're available under either the [AGPL v3](https://github.com/httptoolkit/httptoolkit-desktop/blob/master/LICENSE), guaranteeing open-source freedoms within the constraints of AGPL, or under the [Creative Commons BY-ND license](https://creativecommons.org/licenses/by-nd/4.0/), allowing unencumbered licensing for simple unmodified use.`}
      />
      <ContentWithTable parsedContent={content} links={pageTocLinks} />
    </>
  );
}
