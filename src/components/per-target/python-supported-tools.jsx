import * as React from 'react';

import { SupportedTools, SupportedTool } from "./supported-tools";

export const PythonSupportedTools = () => <SupportedTools>
    <SupportedTool>urllib.request</SupportedTool>
    <SupportedTool>urllib2</SupportedTool>
    <SupportedTool>Requests</SupportedTool>
    <SupportedTool>Pip</SupportedTool>
    <SupportedTool>Python 2 & 3</SupportedTool>
    <SupportedTool>Urlfetch</SupportedTool>
    <SupportedTool>httplib2</SupportedTool>
    <SupportedTool>httpx</SupportedTool>
    <SupportedTool>grequests</SupportedTool>
    <SupportedTool>aiohttp</SupportedTool>
    <SupportedTool>Boto</SupportedTool>
</SupportedTools>