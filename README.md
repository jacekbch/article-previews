# Article previews

This application displays the list of article previews, provided by server data (from `server.js` file). It is built in React for rendering purposes and Sass (SCSS) for styling, based on Bootstrap. The application consists of a few basic components. Most of them are used only for presentation purposes. The main logic is included in `ArticlesList` component and that is getting and processing data from server.

Application should meet all the requested requirements, like displaying, filtering and sorting articles. Its UI resembles the guidelines provided with wireframes, both for mobile and desktop views. Application should run properly in all modern browsers (tested on Chrome, Firefox and Edge). All back-end responses should be handled properly, including errors that are returned in some cases.


## Possible ways to improve

 - Separate getting server data logic to some service
 - Close filtering and sorting controls in separate components
 - Implement images pre-loading (preventing blinks)
 - Add images placeholders (when no image is provided)
 - Improve dates parsing (use some i18n library)
 - Think of a way to truncate too long titles


## How to run 

Start server (it should start listening on port `6010`):
> `$ node server.js`

To run the development mode (on port `3000`):
> `npm run dev`

To build application in production mode:
> `npm run build`
