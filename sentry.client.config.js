import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://d431c8f4b38657362f1c2af5b6fa3262@o4509401749716992.ingest.de.sentry.io/4509401760399440",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});
