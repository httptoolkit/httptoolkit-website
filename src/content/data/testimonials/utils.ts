export const sanitizeTweet = (tweet: string) => {
  let tweetText = tweet;

  // Remove lines of only hashtags
  tweetText = tweetText.replace(/^(?:#\S+\s*)+$/m, '');

  return tweetText;
};

export const sanitizeContent = (content: string): string => {
  let formattedContent = content;

  // Strip emoji
  formattedContent = formattedContent.replace(/\p{Extended_Pictographic}|\p{Emoji_Presentation}/gu, '');

  // Update URL references
  formattedContent = formattedContent.replace(/https:\/\/httptoolkit\.tech/gi, 'httptoolkit.com');

  // Update product direct references
  formattedContent = formattedContent.replace(/@httptoolkit/gi, 'HTTP Toolkit');
  formattedContent = formattedContent.replace(/#?Httptoolkit /gi, 'HTTP Toolkit ');

  // Highlight all the best bits
  for (const highlightString of HIGHLIGHT_STRINGS) {
    formattedContent = formattedContent.replace(highlightString, `<strong>${highlightString}</strong>`);
  }

  return formattedContent;
};

export const HIGHLIGHT_STRINGS = [
  'you should definitely be adding HTTP Toolkit to your developer toolbox!',
  'I switched from AdvancedRestCient and mitmproxy to HTTP Toolkit and my life has just changed',
  'Less than 5 minutes to make my Ubuntu intercept https traffic from my smartphone.',
  'a must-have for every single developer tool box',
  'Works like a charm!',
  'nice looking and intuitive',
  'the tool working best out of the box',
  '#@!%*€& amazing',
  'Great code in HTTP toolkit',
  'You made my day with httptoolkit.tech',
  'Very handy and neatly done',
  'one of the most useful debugging tools EVER!',
  'just submitted a software request to my company!',
  'always impressed at the thought that went into it',
  'Awesome tool!',
  'what an awesome tool!!',
  'amazed how it just worked to trace HTTP from any Terminal.app sub-process!',
  'automatically targeted interception',
  'HTTP Toolkit just worked immediately',
  'avoids capturing irrelevant traffic or disrupting other applications',
  'I really like your tool',
  'Great tool for debugging and mocking HTTP requests',
  'confirmed by HTTP Toolkit (which is ace BTW!)',
  'Super simple to setup, and just works',
  'Excellent open-source HTTP debugging!',
  'Very impressed with it, good UI and the automatic certificate setup with emulator is great',
  'Editing requests on the go without doing any extra work is just amazing.',
  'super helpful',
  'Saved me a lot of time, a very neat tool',
  "I love @pimterry's HTTP Toolkit so damn much",
  "I'm just stunned, fantastic work",
  'today I found an awesome tool HTTP Toolkit',
  "I like HTTP Toolkit's integration with @OpenApiSpec",
  'Acabo de descubrir HTTP Toolkit y me flipa',
  'Y además es de código abierto',
  "I use HTTP Toolkit, it's really nice",
  'love how you can intercept an individual browser window',
  'Recently I came across this amazing tool named HTTPtoolkit',
  "one of the best development tools I've seen in a while",
  'No need to mess with proxy settings or self-signed certificates',
  'Works like a charm',
  "HTTP Toolkit's Github is so delightful",
  'Must have tool',
  'I highly recommend HTTP Toolkit',
  'really good experience with Http Toolkit',
  'QA loves it for Android',
  'You made my day with httptoolkit.com',
  'I have no idea how I built web apps before HTTP Toolkit',
  'amazing tool named HTTP Toolkit for reverse engineering one of my Android App',
  'HTTP Toolkit is a valuable tool to have around',
  'multiple options to collect HTTP traffic',
  'dead-simple',
  'HTTP Toolkit is a must-have for developers and security enthusiasts!',
  'HTTP Toolkit is your best friend',
  'a powerful tool for examining HTTP traffic',
  'ideal for monitoring traffic and prototyping new endpoints or services',
  'amazing open source tool',
  'this tool is really amazing',
  'One click copy-paste into your terminal',
  'really really like HTTP Toolkit',
  'The setup is a breeze',
  'you will definitely love the simplicity',
  'the first thing I install',
  'debug connections issues within a LIVE Docker container',
  'minutes instead of days',
  'very quick to install and use',
  'Incredibly convenient',
  'I have found httptoolkit.com to be amazing',
  'HTTP Toolkit is amazing',
  'just click and inspect network traffic',
  'I cannot imagine tackling any future http-related problem without it',
  'an ideal tool for anyone looking to gain deeper insights into their web traffic',
  'the best thing I have ever found'
];
