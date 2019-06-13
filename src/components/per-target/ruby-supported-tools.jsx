import * as React from 'react';

import { SupportedTools, SupportedTool } from "./supported-tools";

export const RubySupportedTools = () => <SupportedTools>
    <SupportedTool>net::http</SupportedTool>
    <SupportedTool>Faraday</SupportedTool>
    <SupportedTool>REST Client</SupportedTool>
    <SupportedTool>Mechanize</SupportedTool>
    <SupportedTool>Bundler</SupportedTool>
    <SupportedTool>HTTParty</SupportedTool>
    <SupportedTool>Excon</SupportedTool>
    <SupportedTool>open-uri</SupportedTool>
    <SupportedTool><code>gem install</code></SupportedTool>
</SupportedTools>