const {
  Stack,
  RemovalPolicy,
  aws_s3,
  aws_s3_deployment,
  aws_cloudfront,
} = require("aws-cdk-lib");
const { S3Origin } = require("aws-cdk-lib/aws-cloudfront-origins");
const { ViewerProtocolPolicy } = require("aws-cdk-lib/aws-cloudfront");
const { Source } = require("aws-cdk-lib/aws-s3-deployment");
const path = require("path");

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props, customProps) {
    super(scope, id, props);

    // Retrieve ssl certificate from custom props.
    const certificate = customProps.certificate;

    // Create s3 bucket to store static frontend files (website and images).
    const bucket = new aws_s3.Bucket(this, "Shindig_Bucket", {
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Create cloudfront distribution. (NOTE: DNS records must be updated to point your custom domain to this cloudfront distribution.)
    const distribution = new aws_cloudfront.Distribution(
      this,
      "Shindig_Distribution",
      {
        certificate,
        defaultRootObject: "index.html",
        defaultBehavior: {
          origin: new S3Origin(bucket),
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        domainNames: [customProps.domainName],
      }
    );

    // Deploy frontent to s3 bucket. (NOTE: frontend files need to be generated first.)
    const bucketDeployment = new aws_s3_deployment.BucketDeployment(
      this,
      "Shindig_BucketDeployment",
      {
        destinationBucket: bucket,
        sources: [Source.asset(path.resolve(__dirname, "../../frontend/dist"))],
        distribution,
      }
    );
  }
}

module.exports = { CdkStack };
