# Circuit Studio sharing site

This folder is ready to upload to a GitHub Pages repository. It includes:

- The current Circuit Studio HTML app.
- A home page with a password entry screen.
- Six guided studies that open built-in Circuit Studio examples.
- The original narrated Quick Guide video (1 minute 43 seconds).
- The existing updated student study guide in Word format.

## Publish

1. Extract this ZIP on your computer.
2. Upload the **contents** of the `circuit-studio-site` folder to your repository. Keep `index.html`, `studio.html`, `site-config.js`, and `Circuit_StudioV15_Updated.html` together. Upload the `assets`, `videos`, and `guides` folders too.
3. In GitHub, open **Settings → Pages**.
4. Select **Deploy from a branch**, choose **main**, and choose **/(root)**. Save.
5. Open the website URL GitHub provides after deployment finishes. Use the class password supplied separately by your instructor.

For a repository that already hosts a course website, put this entire folder in a new subfolder instead of replacing its existing home page. Open that subfolder’s `index.html` through the existing GitHub Pages URL.

All links use relative paths, so the site works under a repository or subfolder URL. No npm installation, build command, or API key is needed for the website. Optional AI features inside Circuit Studio have their own setup.

GitHub reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Access behavior

The requested class password is configured as a SHA-256 hash in `site-config.js`. The home page and workspace launcher check it and remember access in session storage for the current tab. **Lock site** clears that access.

This is a convenience gate for a static website, not secure authentication. A visitor can bypass browser-side code, and raw app, video, and guide files remain accessible by their URLs or through a public repository. Do not place private student records, answer keys, or API keys in this repository. For server-enforced access, host the site behind an authentication service rather than relying on this gate.

The website does not collect student submissions. Circuit Studio’s existing local save and progress features remain part of the app.

## Updating Circuit Studio

Replace `Circuit_StudioV15_Updated.html` with the new version using the same filename. If you use another filename, change `studioFile` in `site-config.js`.

The study links use the app’s built-in `#problem=family/topic/start` routes. The study sidebar invokes its existing visual-aid, Simulation, and Breadboard APIs. If a future version changes those APIs, the sidebar displays a fallback message; the tools inside the app remain the way to continue.

## Updating the video and guide

Replace `videos/Circuit_Studio_Quick_Guide.mp4` or `guides/Circuit_Studio_Student_Study_Guide.docx` with newer files using the same filenames, or change their paths in `site-config.js`.

The bundled video is the original student guide and shows an earlier interface. The six studies were prepared against the current bundled app.

## Local preview

For a reliable local preview, serve this folder on localhost rather than opening separate files with `file://` URLs. For example, if Python is installed, run `python -m http.server 8000` from this folder and visit `http://localhost:8000`. GitHub Pages serves the published site over HTTPS. Password verification requires a secure browser context and enabled session storage.

## Validation

The package is checked for missing local links, JavaScript syntax, correct/incorrect password handling, safe post-login routing, study routes, and required tool APIs. The bundled video was checked for video and audio streams. Full browser layout and interaction testing was unavailable in the build environment.
