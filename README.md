# Shindig

An event management app.

Technology used:

- **Backend:** [Express.js](https://expressjs.com/) [(RxDB Server)](https://rxdb.info/rx-server.html), [MongoDB](https://www.mongodb.com/), [Auth.js](https://authjs.dev/)
- **Frontend:** [Nuxt.js](https://nuxt.com/) [(Vue.js)](https://vuejs.org/), [RxDB](https://rxdb.info/) [(with replication)](https://rxdb.info/replication.html), [Typescript](https://www.typescriptlang.org/)
- **Deployment:** [AWS CDK](https://aws.amazon.com/cdk/), [ACM](https://aws.amazon.com/certificate-manager/), [S3](https://aws.amazon.com/s3/), [CloudFront](https://aws.amazon.com/cloudfront/)

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

# (optional) Start backend development server locally.
npm run dev
```

## Frontend

```bash
# Navigate to frontend folder.
cd ./frontend

# Install dependencies.
npm install

# (optional) Start frontent development server locally.
npm run dev

# Generate files to be deployed.
npm run generate
```

## AWS CDK - Deploy to AWS

Before you can deploy this app to AWS, you will need the following:

- An AWS account: https://signin.aws.amazon.com/signup?request_type=register
- Credentials setup: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-configure-quickstart-creds
- Installed aws-cdk globally: `npm install -g aws-cdk`

See the [Getting started with the AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) guide for more details.

You will also need to setup the DNS records for SSL DNS validation [(guide)](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html), and routing traffic to the Amazon CloudFront distribution by using your domain name [(guide)](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html).

```bash
# Navigate to cdk folder.
cd ./cdk

# Install dependencies.
npm install

# Deploy CDK Toolkit stack.
cdk bootstrap

# Deploy all cdk stacks to your default AWS account/region.
# (NOTE: required DNS records will need to be manually added.)
cdk deploy --all

# (optional) When you are finished make sure to destroy your deployed cdk resources.
cdk destroy --all
```
