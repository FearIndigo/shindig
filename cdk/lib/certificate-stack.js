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
  constructor(scope, id, props, customProps) {
    super(scope, id, props);

    // Create ssl certificate. (NOTE: DNS records must be manually added.)
    this.certificate = new Certificate(this, "Shindig_Certificate", {
      domainName: customProps.domainName,
      validation: CertificateValidation.fromDns(),
    });
  }
}

module.exports = { CertificateStack };
