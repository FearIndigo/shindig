const { Stack, aws_certificatemanager } = require("aws-cdk-lib");

class CertificateStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props, customProps) {
    super(scope, id, props);

    // Create ssl certificate. (NOTE: DNS records must be manually added.)
    this.certificate = new aws_certificatemanager.Certificate(
      this,
      "Shindig_Certificate",
      {
        domainName: customProps.domainName,
        validation: aws_certificatemanager.CertificateValidation.fromDns(),
      }
    );
  }
}

module.exports = { CertificateStack };
