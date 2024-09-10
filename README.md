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

# Copy env files. (NOTE: values need to be manually entered in .env where applicable.)
cp .env.example .env
cp .env.db.example .env.db

# Generate high entropy random string for Auth.js.
npx auth secret

# Build and run docker containers.
docker compose up
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

## Deploy

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

# Copy env files (NOTE: values need to be manually entered in .env where applicable.)
cp .env.example .env

# Deploy CDK Toolkit stack.
cdk bootstrap

# Deploy all cdk stacks to your default AWS account/region.
# (NOTE: required DNS records will need to be manually added.)
cdk deploy --all

# (optional) When you are finished make sure to destroy your deployed cdk resources.
cdk destroy --all
```

Due to time constraints the backend server, database and authentication provider is not deployed as part of the cdk stack. Instead they can be run locally as per the `Backend` instructions above.
