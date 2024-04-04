'use client';

import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';

import {
  ContentTypeQuestion,
  MethodQuestion,
  MixedContentResult,
  NotCorsResult,
  PreflightRequest,
  PreflightResponseQuestion,
  RequestExtrasQuestion,
  ServerAllowsCorsRequest,
  ServerAllowsPreflightRequest,
  ServerRejectsCorsRequest,
  ServerRejectsPreflightRequest,
  ServerResponseQuestion,
  ShowCode,
  SimpleCorsRequest,
  SourceUrlQuestion,
  TargetUrlQuestion,
} from './components';
import type { WillItCorsSteps } from '../../data';
import { WillItCorsStore } from '../../store';
import { deleteHeader, setHeader } from '../../utils';

const steps = new WillItCorsStore();

export const Steps = observer(({ currentStep }: { currentStep: WillItCorsSteps }) => {
  const router = useRouter();

  switch (currentStep) {
    case 'source-url':
      return (
        <SourceUrlQuestion
          value={steps.sourceUrl}
          onChange={newValue => {
            steps.setSourceUrl(newValue);
          }}
          onNext={() => router.push('./target-url')}
        />
      );

    case 'target-url':
      return (
        <TargetUrlQuestion
          value={steps.targetUrl}
          onChange={newValue => {
            steps.setTargetUrl(newValue);
          }}
          onNext={() => {
            if (!steps.isCorsRequest) {
              router.push('./not-cors');
            } else if (steps.isMixedContentRequest) {
              router.push('./mixed-content');
            } else {
              router.push('./method');
            }
          }}
        />
      );

    case 'not-cors':
      return <NotCorsResult origin={steps.sourceOrigin ?? 'https://'} />;

    case 'mixed-content':
      return (
        <MixedContentResult
          sourceOrigin={steps.sourceOrigin ?? 'https://'}
          targetOrigin={steps.targetOrigin ?? 'http://'}
        />
      );

    case 'method':
      return (
        <MethodQuestion
          value={steps.method}
          onChange={newValue => {
            steps.setMethod(newValue);
          }}
          onNext={() => router.push('./request-extras')}
          sourceOrigin={steps.sourceOrigin ?? 'https://'}
          targetOrigin={steps.targetOrigin ?? 'http://'}
        />
      );

    case 'request-extras':
      return (
        <RequestExtrasQuestion
          sendCredentials={steps.sendCredentials}
          onSendCredentials={newValue => {
            steps.setCredentials(newValue);
          }}
          useStreaming={steps.useStreaming}
          onUseStreaming={newValue => {
            steps.setUseStreaming(newValue);
          }}
          headers={steps.requestHeaders}
          onChangeHeaders={newValue => {
            steps.setRequestHeaders(newValue);
          }}
          onNext={() => {
            if (steps.method === 'POST' && steps.contentType === undefined) {
              router.push('./content-type');
            } else if (steps.isSimpleCorsRequest) {
              router.push('./simple-cors');
            } else {
              router.push('./preflight');
            }
          }}
        />
      );

    case 'content-type':
      return (
        <ContentTypeQuestion
          value={steps.contentType}
          onChange={newValue => {
            if (newValue) {
              setHeader(steps.requestHeaders, 'Content-Type', newValue);
            } else {
              deleteHeader(steps.requestHeaders, 'Content-Type');
            }
          }}
          onNext={() => {
            if (steps.isSimpleCorsRequest) {
              router.push('./simple-cors');
            } else {
              router.push('./preflight');
            }
          }}
        />
      );

    case 'simple-cors':
      return <SimpleCorsRequest onNext={() => router.push('./server-response')} />;

    case 'server-response':
      return (
        <ServerResponseQuestion
          sourceOrigin={steps.sourceOrigin}
          targetUrl={steps.targetUrl}
          method={steps.method}
          unsafeHeaders={steps.unsafeHeaders}
          sendCredentials={steps.sendCredentials}
          isServerResponseReadable={steps.isServerResponseReadable}
          value={steps.serverResponseHeaders}
          onChange={newValue => {
            steps.setServerResponseHeaders(newValue);
          }}
          onNext={() => {
            if (steps.isServerResponseReadable) {
              router.push('./request-success');
            } else {
              router.push('./request-failure');
            }
          }}
        />
      );

    case 'request-failure':
      return (
        <ServerRejectsCorsRequest
          sourceOrigin={steps.sourceOrigin ?? 'https://'}
          sendCredentials={steps.sendCredentials}
          serverResponseHeaders={steps.serverResponseHeaders}
        />
      );

    case 'request-success':
      return (
        <ServerAllowsCorsRequest
          sourceOrigin={steps.sourceOrigin ?? 'https://'}
          responseHeaders={steps.serverResponseHeaders}
          sendCredentials={steps.sendCredentials}
          onNext={() => router.push('./show-code')}
        />
      );

    case 'show-code':
      return <ShowCode code={steps.exampleCode} />;

    case 'preflight':
      return <PreflightRequest onNext={() => router.push('./preflight-response')} />;

    case 'preflight-success':
      return <ServerAllowsPreflightRequest onNext={() => router.push('./server-response')} />;

    case 'preflight-response':
      return (
        <PreflightResponseQuestion
          sourceOrigin={steps.sourceOrigin}
          targetUrl={steps.targetUrl}
          method={steps.method}
          unsafeHeaders={steps.unsafeHeaders}
          sendCredentials={steps.sendCredentials}
          isPreflightSuccessful={steps.isPreflightSuccessful}
          value={steps.preflightResponseHeaders}
          onChange={newValue => {
            steps.setPreflightResponseHeaders(newValue);
          }}
          onNext={() => {
            if (steps.isPreflightSuccessful) {
              router.push('./preflight-success');
            } else {
              router.push('./preflight-failure');
            }
          }}
        />
      );

    case 'preflight-failure':
      return (
        <ServerRejectsPreflightRequest
          sourceOrigin={steps.sourceOrigin}
          method={steps.method}
          sendCredentials={steps.sendCredentials}
          unsafeHeaders={steps.unsafeHeaders}
          preflightResponseHeaders={steps.preflightResponseHeaders}
          originAllowed={steps.doesPreflightResponseAllowOrigin}
          methodAllowed={steps.doesPreflightResponseAllowMethod}
          headersAllowed={steps.doesPreflightResponseAllowHeaders}
          credentialsAllowed={steps.doesPreflightResponseAllowCredentials}
        />
      );

    default:
      return null;
  }
});
