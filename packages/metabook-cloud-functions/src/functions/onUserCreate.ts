import functions from "firebase-functions";
import getMailjetService from "../email";
import { EmailSpec } from "../email/types";
import { defaultLoggingService } from "../logging";

// TODO: we'll need to send a different welcome email if they sign up outside the context of a reading
const welcomeEmailSpec: EmailSpec = {
  subject: "Welcome to Orbit",
  text: `Just a quick email to confirm: you're all set up to bring ideas into your orbit.
  
Most people quickly forget much of what they read. So in a few days, we'll invite you to your first Orbit session. By quickly repeating the prompts you've collected so far, you'll reinforce your memory of the material and keep yourself in contact with those ideas. Each time you remember the answer to a prompt, its orbit expands: you'll next see it after a two-week break, then a month, then two months, and so on. If you forget an answer, the orbit contracts to help you reinforce that idea.  These occasional sessions will take a few minutes--but in exchange, you'll internalize what you read, deeply and for the long-term.

Incidentally, Orbit itself is a work in progress by Andy Matuschak (hello!). If you have any comments or questions while you experiment with this unusual new system, you can reply to any email from Orbit to reach me. Or contact me directly at contact@withorbit.com.`,
};

const onUserCreate = functions.auth.user().onCreate(async (user, context) => {
  if (!user.email) {
    throw new Error(`New user has no email address: ${user.uid}`);
  }

  await defaultLoggingService.logUserEvent({
    userID: user.uid,
    timestamp: Date.parse(context.timestamp),
    eventName: "registration",
    emailAddress: user.email,
  });
  await getMailjetService().sendEmail(user.email, welcomeEmailSpec);
});

export default onUserCreate;