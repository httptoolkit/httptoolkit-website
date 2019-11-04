import * as React from 'react';

import { SupportedTools, SupportedTool } from "./supported-tools";

export const JSSupportedTools = () => <SupportedTools>
    <SupportedTool>Built-in 'http' module</SupportedTool>
    <SupportedTool>Built-in 'https' module</SupportedTool>
    <SupportedTool>Request</SupportedTool>
    <SupportedTool>Axios</SupportedTool>
    <SupportedTool>Superagent</SupportedTool>
    <SupportedTool>Fetch & Node-Fetch</SupportedTool>
    <SupportedTool>Reqwest</SupportedTool>
    <SupportedTool>Got</SupportedTool>
    <SupportedTool>Needle</SupportedTool>
    <SupportedTool>Bent</SupportedTool>
    <SupportedTool>Unirest</SupportedTool>
    <SupportedTool>npm</SupportedTool>
</SupportedTools>