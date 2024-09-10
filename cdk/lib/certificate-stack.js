const { Stack } = require("aws-cdk-lib");
const {
  Certificate,
  CertificateValidation,
} = require("aws-cdk-lib/aws-certificatemanager");

class CertificateStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // Get domain name from environment variables.
    const domainName = process.env.DOMAIN_NAME;

    // Create ssl certificate. (NOTE: DNS records must be manually added.)
    this.certificate = new Certificate(this, "Shindig_Certificate", {
      domainName,
      validation: CertificateValidation.fromDns(),
    });
  }
}

module.exports = { CertificateStack };
