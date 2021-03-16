import * as React from 'react';

import { SupportedTools, SupportedTool } from "./supported-tools";

export const JavaSupportedTools = () => <SupportedTools>
    <SupportedTool>Java's HttpURLConnection</SupportedTool>
    <SupportedTool>Java 11's HttpClient</SupportedTool>
    <SupportedTool>Apache HttpClient</SupportedTool>
    <SupportedTool>Apache HttpAsyncClient</SupportedTool>
    <SupportedTool>OkHttp</SupportedTool>
    <SupportedTool>Retrofit</SupportedTool>
    <SupportedTool>Ktor-Client</SupportedTool>
    <SupportedTool>Jetty-Client</SupportedTool>
    <SupportedTool>AsyncHttpClient</SupportedTool>
    <SupportedTool>Reactor-Netty</SupportedTool>
    <SupportedTool>Spring WebClient</SupportedTool>
    <SupportedTool>Akka-HTTP</SupportedTool>
</SupportedTools>