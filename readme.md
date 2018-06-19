# wfh

`wfh` makes email checking great. All I need to know is if I'm going into the office. Tell me, is anyone working from home today? And who? This guides my decision on if I'm working from home. It's not quite _while the cat's away_, it's more like _while the cat is breaking its own rule of always be at the office, so too may the mice break it_.

## Installation
`npm i @dillonchr/wfh`

## Usage
`wfh(IMAP_SERVER_URL, IMAP_PORT, EMAIL_ADDRESS, EMAIL_PASSWORD, <err, result>CALLBACK)`

The callback will either have an error present in the first argument or will have a simple response in the second argument. That response is as follows:

```javascript
{wfh: 0|1, who: []<string>}
```

## Configuration
Outside of the first 4 arguments for `wfh` there's not a lot that can be configured. I expect most organizations that necessitate this type of plugin use Office365 like mine. In that case I can fill in the first two args for you!

> IMAP_SERVER_URL=outlook.office365.com

> IMAP_PORT=993

Already, this plugin is configured for `secureConnection ` which is what O365 uses. So just plug in your email and password and you're good to go!

## Why?
I don't like going into the office. At all. So any missed opportunities to work remotely, really sting me. I developed this feature as part of my funhouse api which I'm planning to incrementally publish. Starting with this module because it was the latest addition to the funhouse team.
