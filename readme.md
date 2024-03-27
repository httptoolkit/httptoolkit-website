# HTTP Toolkit Site
HTTP Toolkit website is an opensource documentation build with Next.js and use MDX as a content managament. The rendering aproach is SSG.

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

### Stack

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

- You need to have Node.js installed on your machine and we uses NPM as a package manager.

After completing the token setup, you can proceed to install all the project dependencies using pnpm:

```bash
 npm install && npm run prepare;
```

### Run Next.js in development mode

```bash
npm run dev
```

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

In order to get the benefis of the image optimization, these images should stored inside the public folder like `public/images/posts/..` or `public/images/docs/..` (except for the statically imported images and remote images). Then these images can be referenced in the src attribute of the `<Image />` element.


### Git commit messages

This project uses a simplified version of [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Commit message should se the present tense

> _"Adds this..", not "Added this..."_

List of available commit types:

```
  feat      >> "add a new feature",
  chore     >> "tool, configuration changes, linters",
  fix:      >> "bug fix",
  docs:     >> "documentation update",
  posts:    >> "post update",
  refactor: >> "code changes, no new features added",
```

### Styles

This project uses Styled Components for styling.

#### Formatting and Validation

The code will be format automatically with `prettier` in every commit to keep the consistency in base the rules inside `.prettierrc` file. t
