import * as React from 'react';

import { SupportedTools, SupportedTool } from "./supported-tools";

export const DockerSupportedTools = () => <SupportedTools>
    <SupportedTool>Docker</SupportedTool>
    <SupportedTool>Docker Compose</SupportedTool>
    <SupportedTool>Docker for Mac</SupportedTool>
    <SupportedTool>Docker for Windows</SupportedTool>
    <SupportedTool>Curl, Wget, Httpie, and<br/>other Bash clients</SupportedTool>
    <SupportedTool>Java containers</SupportedTool>
    <SupportedTool>Node.js containers</SupportedTool>
    <SupportedTool>Golang containers</SupportedTool>
    <SupportedTool>Apt-Get, Apk, Npm, and<br/>other build tools</SupportedTool>
    <SupportedTool>PHP+Apache containers</SupportedTool>
    <SupportedTool>Ruby containers</SupportedTool>
    <SupportedTool>Rust containers</SupportedTool>
    <SupportedTool>Python containers</SupportedTool>
</SupportedTools>