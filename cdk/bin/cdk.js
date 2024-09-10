#!/usr/bin/env node

const { App } = require("aws-cdk-lib");
const { CertificateStack } = require("../lib/certificate-stack");
const { CdkStack } = require("../lib/cdk-stack");

const app = new App();

// SSL certificates for cloudfront must be in us-east-1 region, but the website is possibly hosted in a different region.
const crossRegionReferences = process.env.CDK_DEFAULT_REGION !== "us-east-1";

// Create certificate stack
const certificateStack = new CertificateStack(app, "CertificateStack", {
  // Specialize this stack for the AWS Account implied by the current CLI configuration, but enforce the us-east-1 region.
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-1",
  },

  // SSL certificates for cloudfront must be in us-east-1 region, but the website is possibly hosted in a different region.
  crossRegionReferences,
});

// Create cdk stack
const cdkStack = new CdkStack(
  app,
  "CdkStack",
  {
    // Specialize this stack for the AWS Account and Region that are implied by the current CLI configuration.
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },

    // SSL certificates for cloudfront must be in us-east-1 region, but the website is possibly hosted in a different region.
    crossRegionReferences,
  },
  {
    // Provide the ssl certificate.
    certificate: certificateStack.certificate,
  }
);

// Cdk stack depends on ssl certificate created in the certificate stack.
cdkStack.addDependency(certificateStack);
