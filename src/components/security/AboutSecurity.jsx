import React from "react";

const sectionStyle = {
  background: "#05070b",
  color: "#e6edf7",
  padding: "100px 20px",
};

const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "clamp(2rem,5vw,3.4rem)",
  marginBottom: "20px",
  color: "#fff",
};

const introStyle = {
  textAlign: "center",
  color: "#9caec7",
  lineHeight: 1.9,
  fontSize: "1.08rem",
  maxWidth: "900px",
  margin: "0 auto 80px",
};

const cardStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  padding: "35px",
  marginBottom: "35px",
  backdropFilter: "blur(8px)",
};

const headingStyle = {
  color: "#ffffff",
  fontSize: "1.5rem",
  marginBottom: "18px",
};

const textStyle = {
  color: "#b7c6d9",
  lineHeight: 2,
  fontSize: "1rem",
};

export default function AboutSecurity() {
  return (
    <section id="about" style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>About Orion Security</h2>

        <p style={introStyle}>
          Security is not a feature added after development—it is the
          foundation upon which Orion Trade Hub is designed. Every layer of our
          infrastructure, every authentication process, and every operational
          procedure is built around protecting client assets, preserving privacy,
          and maintaining the highest level of platform integrity.
        </p>

        <div style={cardStyle}>
          <h3 style={headingStyle}>1. Security Begins With Architecture</h3>

          <p style={textStyle}>
            Orion Trade Hub is designed with security at the center of every
            decision rather than as an afterthought. From the moment a user
            creates an account until every subsequent login, deposit request,
            withdrawal approval, and trading activity, multiple layers of
            protection work together to reduce risk and safeguard sensitive
            information. Instead of depending on a single barrier, the platform
            uses independent security mechanisms that complement one another.
            Even if one layer experiences abnormal activity, additional
            protection continues monitoring user sessions, authentication
            attempts, and account behavior. This layered architecture helps
            reduce exposure to common online threats while maintaining a smooth
            experience for legitimate users. Every component of Orion Trade Hub
            is developed with reliability, resilience, and operational stability
            in mind so clients can focus on investing while the platform
            continuously works to protect their information.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={headingStyle}>2. Enterprise Encryption</h3>

          <p style={textStyle}>
            Sensitive information deserves enterprise-grade protection. Orion
            Trade Hub uses encrypted communication channels designed to keep
            information protected whenever it travels between a visitor's device
            and our servers. Encryption helps prevent unauthorized interception
            of personal details, login credentials, and account activity while
            data is transmitted. Internally, access to sensitive systems is
            carefully restricted and monitored to minimize unnecessary exposure.
            Our objective is to create an environment where confidential
            information remains protected throughout its lifecycle rather than at
            only one stage of the process. Encryption is combined with secure
            authentication practices, infrastructure monitoring, and operational
            controls to provide multiple levels of defense that work together
            instead of relying on a single security mechanism.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={headingStyle}>3. Continuous Monitoring</h3>

          <p style={textStyle}>
            Cybersecurity is an ongoing responsibility rather than a one-time
            deployment. Orion Trade Hub continuously monitors platform activity
            for patterns that may indicate unauthorized access attempts,
            suspicious login behavior, unusual account activity, or abnormal
            transaction requests. Monitoring systems help identify irregular
            behavior quickly so that appropriate actions can be taken whenever
            necessary. Our approach combines automated monitoring with defined
            operational procedures that support rapid investigation and response.
            While no digital platform can promise absolute immunity from every
            emerging threat, continuous monitoring significantly strengthens our
            ability to identify, assess, and respond to suspicious events before
            they develop into larger security concerns.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={headingStyle}>4. Account Protection</h3>

          <p style={textStyle}>
            Every Orion Trade Hub account is protected through multiple identity
            verification mechanisms intended to reduce the likelihood of
            unauthorized access. Strong authentication requirements, password
            management practices, recovery procedures, and identity verification
            processes are designed to help ensure that only authorized users can
            access their accounts. During account recovery, additional
            verification measures help confirm ownership before sensitive changes
            are permitted. Security questions, password resets, and account
            verification work together to strengthen protection while maintaining
            accessibility for legitimate users. We encourage every client to use
            unique passwords and follow good security practices to further reduce
            personal risk.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={headingStyle}>5. Infrastructure Reliability</h3>

          <p style={textStyle}>
            Reliable infrastructure plays an essential role in protecting
            financial platforms. Orion Trade Hub is built with stability,
            redundancy, and operational resilience as primary objectives.
            Infrastructure components are selected to minimize downtime while
            supporting dependable platform availability. Reliable hosting,
            modern deployment practices, continuous maintenance, and operational
            monitoring help create an environment capable of supporting users
            across different regions and market conditions. Although no online
            system can guarantee uninterrupted availability under every
            circumstance, our goal is to maintain consistent performance while
            preparing for unexpected operational events through careful planning
            and resilient infrastructure design.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={headingStyle}>6. Compliance & Responsible Operations</h3>

          <p style={textStyle}>
            Orion Trade Hub believes that responsible financial services require
            transparency, accountability, and clearly defined operational
            standards. Security extends beyond technology and includes internal
            procedures, user verification, documentation, record keeping, and
            operational governance. We continually evaluate our internal
            processes to improve consistency while supporting responsible
            platform management. Compliance-oriented practices help establish
            trust between the platform and its users by ensuring important
            operational decisions are handled carefully and consistently. These
            practices are part of our broader commitment to maintaining a secure
            and dependable trading environment.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={headingStyle}>7. Protection Against Fraud</h3>

          <p style={textStyle}>
            Fraud prevention requires constant vigilance. Orion Trade Hub
            employs multiple verification procedures designed to identify
            suspicious requests before sensitive account actions are completed.
            Deposit reviews, withdrawal verification, unusual login detection,
            and abnormal behavioral analysis contribute to reducing fraudulent
            activity. Risk assessments are performed whenever activity appears
            inconsistent with normal account behavior. These safeguards are
            intended to protect both individual users and the wider platform
            ecosystem while minimizing disruption for legitimate clients.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={headingStyle}>8. Client Privacy</h3>

          <p style={textStyle}>
            Protecting client privacy is a core responsibility. Personal
            information is collected only when necessary to provide services,
            maintain account security, and support platform operations. Orion
            Trade Hub seeks to minimize unnecessary collection of sensitive
            information while implementing reasonable safeguards around the data
            that is required. Privacy protection includes controlled access,
            secure storage practices, and operational procedures designed to
            reduce unauthorized exposure. Respecting client privacy is essential
            to maintaining long-term trust and confidence.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={headingStyle}>9. Continuous Improvement</h3>

          <p style={textStyle}>
            The cybersecurity landscape evolves constantly, and so must our
            security strategy. Orion Trade Hub is committed to continuously
            reviewing, improving, and strengthening platform security as new
            technologies, industry practices, and emerging threats develop over
            time. Enhancements are introduced as part of our long-term roadmap
            to improve resilience while maintaining usability. Security is never
            considered finished—it is an ongoing process of assessment,
            refinement, and responsible innovation designed to support users well
            into the future.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={headingStyle}>10. Our Commitment</h3>

          <p style={textStyle}>
            Above every technology, process, or security tool stands a simple
            commitment: protecting the people who trust Orion Trade Hub with
            their investment journey. We recognize that confidence is earned
            through consistent performance, transparency, and responsible
            platform management. Every improvement we make is guided by the goal
            of creating a secure, reliable, and professional trading
            environment where users can focus on opportunities rather than
            worrying about the safety of their accounts. Security will continue
            to remain one of the defining principles of Orion Trade Hub as the
            platform grows, expands its services, and introduces future
            innovations.
          </p>
        </div>
      </div>
    </section>
  );
}