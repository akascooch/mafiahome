import Head from 'next/head';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site';

export default function Home() {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
      </Head>
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <section className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-16">
          <Hero title={SITE_TITLE} subtitle="Welcome to" />
          <p className="text-lg text-slate-300 sm:text-xl">{SITE_DESCRIPTION}</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-amber-400">Upcoming Matches</h2>
              <p className="mt-2 text-sm text-slate-300">
                View the updated schedule and sign up for the next live Mafia sessions.
              </p>
              <Link
                href="#schedule"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200"
              >
                Explore schedule
              </Link>
            </article>
            <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-amber-400">Community Handbook</h2>
              <p className="mt-2 text-sm text-slate-300">
                Brush up on our house rules, etiquette, and tips for newcomers before diving in.
              </p>
              <Link
                href="#handbook"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200"
              >
                Read the guide
              </Link>
            </article>
          </div>
          <footer className="text-sm text-slate-500">
            Built with Next.js 13, Tailwind CSS, and a fully automated deployment workflow.
          </footer>
        </section>
      </main>
    </>
  );
}
