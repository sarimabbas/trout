import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface WaitlistOffboardEmailProps {}

export const WaitlistOffboardEmail = (props: WaitlistOffboardEmailProps) => (
  <Html>
    <Head />
    <Preview>Your invitation to Trout</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto font-sans bg-white">
        <Container>
          <Heading>Your invitation to 🐟 Trout</Heading>
          <Text>
            Thank you so much for signing up for Trout! We are ready for you.
          </Text>
          <Link href="https://web.trout.run" target="_blank">
            Click here to sign up and start using Trout.
          </Link>
          <Text>
            As a reminder, Trout helps developers like you streamline webhook
            integration. We hope to simplify the process of routing events and
            ease the pain of local development.
          </Text>
          <Text>
            Once you have created an account, head over to the docs to{" "}
            <Link href="https://docs.trout.run" target="_blank">
              learn how to get started
            </Link>
            .
          </Text>
          <Text>
            We appreciate your feedback! If something isn&apos;t working, or you
            have a feature request,{" "}
            <Link href="https://trout.canny.io/" target="_blank">
              please leave your feedback here.
            </Link>
          </Text>
          <Text>
            As an early adopter, we hope you will help us shape the future of
            Trout. You can follow us on Twitter/X at{" "}
            <Link href="https://x.com/get_trout" target="_blank">
              @get_trout
            </Link>
            , and email us anytime at{" "}
            <Link href="mailto:hi@trout.run" target="_blank">
              hi@trout.run
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default WaitlistOffboardEmail;
