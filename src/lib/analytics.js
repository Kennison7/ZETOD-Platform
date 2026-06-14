import posthog from 'posthog-js'

const POSTHOG_TOKEN = 'phc_CXCcSstnAnT4py4oLc94moN5E6rSkUDoESfkzafeskLK'

export function initAnalytics() {
  posthog.init(import.meta.env.VITE_POSTHOG_TOKEN || POSTHOG_TOKEN, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
  })
}
