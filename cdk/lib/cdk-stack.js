const { Stack, RemovalPolicy, Duration } = require("aws-cdk-lib");
const {
  Bucket,
  BlockPublicAccess,
  BucketAccessControl,
} = require("aws-cdk-lib/aws-s3");
const {
  OriginAccessIdentity,
  Distribution,
  ViewerProtocolPolicy,
} = require("aws-cdk-lib/aws-cloudfront");
const {
  BucketDeployment,
  Source,
  CacheControl,
} = require("aws-cdk-lib/aws-s3-deployment");
const path = require("path");
const { S3Origin } = require("aws-cdk-lib/aws-cloudfront-origins");

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

    // Create private s3 bucket to store static frontend files (website and images).
    const bucket = new Bucket(this, "Shindig_Bucket", {
      enforceSSL: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      accessControl: BucketAccessControl.PRIVATE,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Create origin access identity to allow cloudfront distribution to access s3 bucket.
    const originAccessIdentity = new OriginAccessIdentity(
      this,
      "Shindig_OriginAccessIdentity"
    );

    // Grant bucket read access to the origin access identity used by cloudfront.
    bucket.grantRead(originAccessIdentity);

    // Create cloudfront distribution. (NOTE: DNS records must be updated to route your custom domain to this cloudfront distribution.)
    const distribution = new Distribution(this, "Shindig_Distribution", {
      certificate,
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new S3Origin(bucket, { originAccessIdentity }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      additionalBehaviors: [new EC2Ori()],
      domainNames: [customProps.domainName],
    });

    // Deploy frontent to s3 bucket. (NOTE: frontend files need to be generated first.)
    const bucketDeployment = new BucketDeployment(
      this,
      "Shindig_BucketDeployment",
      {
        destinationBucket: bucket,
        sources: [Source.asset(path.resolve(__dirname, "../../frontend/dist"))],
        distribution,
        cacheControl: [CacheControl.maxAge(Duration.days(365))],
      }
    );
  }
}

module.exports = { CdkStack };
