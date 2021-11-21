[![wakatime](https://wakatime.com/badge/github/supminn/neoG_socialMedia.svg)](https://wakatime.com/badge/github/supminn/neoG_socialMedia)

# SupSocial

SupSocial is a social media application that creates a community for jump ropers around the world! Follow each other's progress and collaborate.

## Technology Stack

- React - Redux-Toolkit
- Styling using [TailwindCSS](https://tailwindcss.com/)
- React Router v6 (beta) for routes
- Cloudinary for image upload
- Express & Node for API [Repo Link](https://github.com/supminn/neoG_Backend/)
- MongoDB using mongoose for data storage
- User authentication using JWT

## Functionalities

- View user feeds
- Compose posts
- Like posts
- Add multiple comments on one post
- Delete posts or comments created by logged in user.
- View user profile, posts, list of followers and following users
- Follow/Unfollow individual user
- View and update details such as - picture, name, bio, website links.
- Search for users within SupSocial
- List of users who have liked a post
- Notifications on user activity

## Enhancements

- Show posts of only those people whom the current user follows

## Live link and demo

[Deployed link](https://deploy-preview-1--supsocial.netlify.app/)

https://user-images.githubusercontent.com/30731236/122636766-96825700-d108-11eb-9ab5-f8ddb04c076a.mp4

## Instructions on using SupSocial locally

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

This starter kit could be installed in 2 ways.

1. Clone this repository and start working on the development.
2. Using [degit](https://github.com/Rich-Harris/degit).

### Instructions while using degit

degit installation:

```bash
yarn install -g degit
```

Follow the below instructions to use this starter kit:

```
degit supminn/neoG_socialMedia my-app-name
cd my-app-name

yarn install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
