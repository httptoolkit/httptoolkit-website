HTTP Toolkit Site [![Build Status](https://github.com/httptoolkit/httptoolkit-website/workflows/CI/badge.svg)](https://github.com/httptoolkit/httptoolkit-website/actions)
===================

This repo contains the full source for [httptoolkit.com](https://httptoolkit.com) - the main website of HTTP Toolkit.

If you're looking for the website source, either to suggest a change or because you're just curious, you're in the right place.

Looking to file bugs, request features or send feedback? File an issue or vote on existing ones at [github.com/httptoolkit/httptoolkit](https://github.com/httptoolkit/httptoolkit).

## Table of Contents

- [Project Details](#project-details)
  - [Stack](#stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Contribution Guidelines](#contribution-guidelines)
  - [How Can You Contribute?](#how-can-you-contribute)
  - [Getting Started](#getting-started-1)
- [Project Conventions](#project-conventions)
  - [Git commit messages](#git-commit-messages)
  - [Styles](#styles)
    - [Formatting and Validation](#formatting-and-validation)

## Project Details

### Stack

The website is built with Next.js and use MDX as a content management. The rendering approach is SSG.

- Next.js App directory
- React 18
- Typescript
- Styled Components
- MDX
- Algolia DocSearch
- Posthog
- Radix UI for primitives components
- [next-image-export-optimizer](https://github.com/Niels-IO/next-image-export-optimizer) For image optimization at built time.

## Getting Started

### Prerequisites

Use any modern Node version, and just run:

```bash
npm install
```

### Run Next.js in development mode

Launch the local dev site with:

```bash
npm run dev
```

and then open it at [localhost:3000](https://localhost:3000)

## Contribution Guidelines

Thank you for considering contributing to httptoolkit-website! We welcome contributions from everyone.

### How Can You Contribute?

There are several ways you can contribute to httptoolkit-website:

1. **Reporting Bugs**: If you find a bug, please ensure it hasn't been reported already in the Issues section, and then open a new issue with a detailed description of the problem.

2. **Submitting Feature Requests**: Have an idea for a new feature? Feel free to open an issue and describe your feature request.

3. **Improving Documentation**: Documentation can always be improved. If you find something unclear or missing, feel free to submit a pull request with your improvements.

4. **Fixing Issues**: Browse through the open issues. If you find one you can tackle, feel free to submit a pull request with your fix.

5. **Adding New Posts**: Have a post you want to add? Please open an issue first to discuss it, and then submit a pull request with your content.

### Getting Started

To get started with contributing to httptoolkit-website, follow these steps:

1. **Fork the Repository**: Click on the "Fork" button at the top right corner of the repository page to create your own fork.
2. **Clone the Repository**: Clone your forked repository to your local machine using the following command:

    ``` bash
    git clone https://github.com/your-username/httptoolkit-website.git
    ```

3. **Install Dependencies**: Navigate to the project directory and install the required dependencies:

    ```bash
    cd httptoolkit-website
    npm install
    ```
4. **Make Changes**: Make your desired changes to the codebase.
5. **Test Your Changes**: Before submitting a pull request, ensure that your changes work as expected and do not introduce any new issues.
6. **Commit Your Changes**: Once you're happy with your changes, commit them to your forked repository.
7. **Push Changes**: Push your changes to your forked repository.
8. **Submit a Pull Request**: Finally, go to the original repository and click on the "New Pull Request" button to submit your changes for review.

## Project Conventions

Please ensure that your code adheres to the existing code style and conventions used in the project.

### Placement of the images:

In order to get the benefits of the image optimization, these images should stored inside the public folder like `public/images/posts/..` or `public/images/docs/..` (except for the statically imported images and remote images). Then these images can be referenced in the src attribute of the `<Image />` element.

### Styles

This project uses Styled Components for styling.
