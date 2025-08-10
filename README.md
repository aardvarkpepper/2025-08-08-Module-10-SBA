![Image of a list of jokes related to acronyms, texting, and programming](image.png)

Source:  https://tech.forums.softwareag.com/t/the-ultimate-developer-jokes-thread/265019/42

## Reflection

What challenge there was, was typically implementing things I hadn't implemented before, or implementing things in different ways, in absence of a template to follow.

For example, I knew useFetch worked to retrieve data (confirmed with console.log), but I hadn't integrated it into a component before.  When data didn't render, I initially thought it might be a React state issue, so I put in async functionality, but then I realized useFetch itself passed state and used async.  Provided there's an initial state, even in useFetch, that doesn't trigger a rendering error, first the initial state should show, then the data is retrieved async, then state updates, so the component using useFetch should update as well.  (Confirmed through testing; though the state change isn't visible as it happens too fast.)  So I broke down the non-rendering issue through console.logs (the process being made faster by use of Gemini AI, though I think not much), and eventually used data?.categories, which fixed the issue.

Thinking about explaining design decisions I made, I conclude I don't make design decisions, so much as conform to instructions, best practices, and provided examples.  For example, it's not a design decision for me to use AbortController; it's more a matter of 'sure, why not let's use this'.

After looking up documentation on AbortController, it appears it can be used to send an abort signal to an API (though that API may not accept or understand the signal).  As I understand it, if accepted, this aborts the sent data which saves on server cost, as well as any cost of data usage on the user side.  So why not use it?

On the other hand, there's a limit to practicality.  If I'm concerned over how readable the code is and think it might be unclear that state works through useFetch much the same way as if the local component had used useState, still, putting in comprehensive comments to that effect would take time, but not really change the fact whoever read the code would need to understand the control flow and how async worked, if they really wanted to change functionality.  Or, I simply used state and useNavigate in App to send a user to a searched recipe, rather than putting the functionality into a separate component.

## Resources

Used code I'd written in Module 10 Lab 2 and Lab 4 as templates.
Used Module 10 Lesson 4 and Lesson 7 code as a template.
Assistant Instructor Bryan Santos suggested using 'as const' to fix 'This expression is not callable.' in FavoritesProvider working through useLocalStorage.
https://www.themealdb.com/api.php
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html
https://www.geeksforgeeks.org/typescript/typescript-object-readonly-tuple-types/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

When useFetch successfully retrieved data but did not render (per console.log), used Gemini AI to suggest debug; used optional chaining in process of rendering data without errors.

https://www.w3schools.com/html/html_youtube.asp
https://forum.freecodecamp.org/t/youtube-refused-to-connect/245262