export interface NewsletterProps extends StyledNewsletterProps {
  title: string;
  text: string;
  supportText?: string;
  buttonText?: string;
  action?: string;
}

export interface StyledNewsletterProps {
  $variant?: 'default' | 'blog-short' | 'with-gradient';
}
