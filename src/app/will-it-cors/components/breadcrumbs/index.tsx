import { Breadcrumb } from './breadcrumb';
import { StyledBreadcrumbContainer } from './breadcrumbs.styles';

interface BreadcrumbsProps {
  currentStep: string;
}

const SafeToSend = () => <Breadcrumb state="tbc">Is it safe to send?</Breadcrumb>;
const Readable = () => <Breadcrumb state="tbc">Can the response be read?</Breadcrumb>;
const IsCors = () => <Breadcrumb state="yes">Sending a CORS request</Breadcrumb>;
const IsSafeToSend = () => <Breadcrumb state="yes">Safe to send</Breadcrumb>;

export const Breadcrumbs = ({ currentStep }: BreadcrumbsProps) => {
  if (['source-url', 'target-url'].includes(currentStep)) {
    return (
      <StyledBreadcrumbContainer>
        <Breadcrumb state="maybe">Are you sending a CORS request? </Breadcrumb>
        <SafeToSend />
        <Readable />
      </StyledBreadcrumbContainer>
    );
  }

  if (['mixed-content', 'not-cors'].includes(currentStep)) {
    return (
      <StyledBreadcrumbContainer>
        <Breadcrumb state="no">Not a CORS request</Breadcrumb>
        <Breadcrumb state="nvm">Is it safe to send?</Breadcrumb>
        <Breadcrumb state="nvm">Can the response be read?</Breadcrumb>
      </StyledBreadcrumbContainer>
    );
  }

  if (['method', 'request-extras', 'content-type'].includes(currentStep)) {
    return (
      <StyledBreadcrumbContainer>
        <IsCors />
        <Breadcrumb state="maybe">Is it safe to send?</Breadcrumb>
        <Readable />
      </StyledBreadcrumbContainer>
    );
  }

  if (['preflight', 'preflight-response'].includes(currentStep)) {
    return (
      <StyledBreadcrumbContainer>
        <IsCors />
        <Breadcrumb state="maybe"> Does the preflight say it&apos;s safe to send?</Breadcrumb>
        <Readable />
      </StyledBreadcrumbContainer>
    );
  }

  if (currentStep === 'preflight-failure') {
    return (
      <StyledBreadcrumbContainer>
        <IsCors />
        <Breadcrumb state="no">Not safe to send</Breadcrumb>
        <Breadcrumb state="nvm">Can the response be read?</Breadcrumb>
      </StyledBreadcrumbContainer>
    );
  }

  if (['simple-cors', 'server-response', 'preflight-success'].includes(currentStep))
    return (
      <StyledBreadcrumbContainer>
        <IsCors />
        <IsSafeToSend />
        <Breadcrumb state="maybe">Can the response be read?</Breadcrumb>
      </StyledBreadcrumbContainer>
    );

  if (['request-success', 'show-code'].includes(currentStep))
    return (
      <StyledBreadcrumbContainer>
        <IsCors />
        <IsSafeToSend />
        <Breadcrumb state="yes">Allowed to read the response</Breadcrumb>
      </StyledBreadcrumbContainer>
    );

  if (currentStep === 'request-failure')
    return (
      <StyledBreadcrumbContainer>
        <IsCors />
        <IsSafeToSend />
        <Breadcrumb state="no">Not allowed to read the response</Breadcrumb>
      </StyledBreadcrumbContainer>
    );

  return null;
};
