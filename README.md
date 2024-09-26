# Shindig

An event management app.

Technology used:

- **Backend:** [Express.js](https://expressjs.com/) [(RxDB Server)](https://rxdb.info/rx-server.html), [MongoDB](https://www.mongodb.com/), [Passport.js](https://www.passportjs.org/), [Keycloak](https://www.keycloak.org/)
- **Frontend:** [Nuxt.js](https://nuxt.com/) [(Vue.js)](https://vuejs.org/), [RxDB](https://rxdb.info/) [(with replication)](https://rxdb.info/replication.html), [Typescript](https://www.typescriptlang.org/), [Vuetify](https://vuetifyjs.com/en/)
- **Deployment:** [AWS CDK](https://aws.amazon.com/cdk/), [ACM](https://aws.amazon.com/certificate-manager/), [S3](https://aws.amazon.com/s3/), [CloudFront](https://aws.amazon.com/cloudfront/), [Docker](https://www.docker.com/)

## Backend

### Keycloak

First you need to setup a Keycloak realm and client.

```bash
# Navigate to keycloak folder from the repo root directiory.
cd ./backend/keycloak

# Copy env files (NOTE: values need to be manually entered in .env.auth where applicable).
cp .env.auth.example .env.auth

# Build and run docker container
docker compose up
```

Wait until the container is up and running (may take a minute or two).

Use these steps to create the **shindig** realm:

1. Open the [Keycloak Admin Console](http://localhost:8080).
2. Use the default admin username and password `admin`. (These can be changed in the **.env.auth** file created above).
3. Open the dropdown menu in the top left, then click **Create realm**.
4. Enter `shindig` in the **Realm name** field.
5. Click **Create**.

After you have created the realm you will need to create a client in this realm:

1. Ensure you have the **shindig** realm selected from the dropdown menu in the top left.
2. Click **Clients**.
3. Click **Create client**.
4. Fill in the form with the following values:
   - **Client type:** `OpenID Connect`
   - **Client ID:** `shindig-client`
5. Click **Next**.
6. Fill in the form with _ONLY_ the following values:
   - **Client authentication:** `On`
   - **Authentication flow:** `Standard flow`
7. Click **Next**.
8. Fill out the form:
   - **Valid redirect URIs:** `http://localhost:443/auth/callback/keycloak`
9. Click **Save**.

You should now be on the **shindig-client** settings page.

Next you will need to retrieve the **Client Secret**:

1. Selected the **Credentials** tab.
2. Take note of the **Client Secret** as you will need to paste it's value into the express.js app envs in the next section.

### Express.js + MongoDB

```bash
# Navigate to backend folder from the repo root directiory.
cd ./backend

# Copy env files (NOTE: values need to be manually entered in .env where applicable).
cp .env.example .env
cp .env.db.example .env.db
```

Set the value of `AUTH_KEYCLOAK_SECRET` in **.env** to the shindig-client **Client Secret** retieved from the previous section.

```bash
# Generate high entropy random string for Auth.js.
npx auth secret

# Build and run docker containers for Express.js and MongoDB.
docker compose up
```

## Frontend

```bash
# Navigate to frontend folder from the repo root directiory.
cd ./frontend

# Copy env files (NOTE: values need to be manually entered in .env where applicable).
cp .env.example .env

# Install dependencies.
npm install

# (optional) Start frontent development server locally.
npm run dev

# Generate files to be deployed.
npm run generate

# (optional) preview generated files locally.
npm run preview
```

## Deploy / AWS CDK

> [!NOTE]
> Due to time constraints the backend server, database and authentication provider are not deployed as part of the cdk stack. Instead they can be run locally as described in the **Backend** section above.

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

# Copy env files.
cp .env.example .env

# Deploy CDK Toolkit stack.
cdk bootstrap

# Deploy all cdk stacks to your default AWS account/region.
# (NOTE: DNS records will need to be manually added for your domain).
cdk deploy --all

# (optional) When you are finished make sure to destroy your deployed AWS resources.
cdk destroy --all
```
