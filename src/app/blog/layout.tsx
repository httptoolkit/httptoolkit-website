import { Layout } from '@/components/layout';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <Layout withoutNewsletter>{children}</Layout>;
}
