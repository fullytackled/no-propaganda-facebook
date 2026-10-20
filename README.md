# No Propaganda on Facebook

**Pause the scroll. Check the claim. Look for the other side.**

A lightweight Chrome extension that adds one-click Google searches for counterevidence, fact checks, and context to Facebook feed posts. It treats posts as claims to examine, never as proof of what a person believes or intends.

![No Propaganda mark](assets/mark.svg)

## What it does

- Finds a likely sentence in each visible Facebook feed post.
- Builds searches that deliberately look for evidence against the claim, alongside fact checks and context.
- Keeps the search step in your hands. It does not call an AI service, make a truth verdict, or upload the post text to a backend.
- Includes an on/off switch in the extension popup.

## Install in Chrome

1. Download or clone this repository.
2. Visit `chrome://extensions`.
3. Enable **Developer mode**.
4. Select **Load unpacked** and choose the repository folder.
5. Open or refresh Facebook.

## Important limits

This is an early prototype. Facebook's page structure can change, and the sentence picker may choose the wrong text. Google results can be incomplete or misleading; ranking is not evidence quality. Check dates, original sources, and the full context before drawing conclusions. The extension does not assign a probability that content is propaganda or misinformation, and it does not infer a poster's intent.

## Privacy

The extension reads visible post text in the page to form a search phrase locally. It sends nothing until you click one of the search links; then Google receives the search phrase as part of the URL. The extension stores only whether it is enabled.

## Roadmap

A future evidence-summary mode should cite primary sources, show what supports and contradicts a claim, explain uncertainty, and avoid reducing complex or contested topics to a single score.

## License

MIT. See [LICENSE](LICENSE).
