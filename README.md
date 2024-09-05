# Shindig

## Backend

```bash
# Navigate to backend folder.
cd ./backend

# Install dependencies.
npm install

# Copy local dev environment file.
cp .env.example .env

# Generate auth.js secret string.
npx auth secret

# Start backend development server locally.
npm run dev
```

## Frontend

```bash
# Navigate to frontend folder.
cd ./frontend

# Install dependencies.
npm install

# Start frontent development server locally.
npm run dev
```

## AWS CDK - Deploy to AWS

Before you can deploy this app to AWS, you will need the following:

- An AWS account: https://signin.aws.amazon.com/signup?request_type=register
- Credentials setup: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-configure-quickstart-creds
- Installed aws-cdk globally: `npm install -g aws-cdk`

See the [Getting started with the AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) guide for more details.

```bash
# Navigate to cdk folder.
cd ./cdk

# Install dependencies.
npm install

# Deploy CDK Toolkit stack.
cdk bootstrap

# Deploy this stack to your default AWS account/region.
cdk deploy

# When you are finished make sure to destroy your deployed cdk resources
cdk destroy
```
